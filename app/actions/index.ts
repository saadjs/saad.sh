'use server'

import { neon } from '@neondatabase/serverless'
import { auth } from 'app/auth'
import { revalidatePath } from 'next/cache'

export async function saveGuestbookEntry(formData: FormData) {
  const session = await auth()

  if (!session || !session.user) {
    throw new Error('Not authenticated')
  }

  const email = session.user.email as string
  const message = formData.get('message')?.toString() as string

  // Check for recent entries
  const hasRecent = await hasRecentEntry(email)
  if (hasRecent) {
    throw new Error('too many requests')
  }

  const sql = neon(process.env.DATABASE_URL)

  await new Promise((resolve) => setTimeout(resolve, 1000))

  await sql`
  INSERT INTO guestbook (email, message, avatar_url, created_by, created_at)
  VALUES (${email}, ${message.slice(0, 500)}, ${session.user.image}, ${email}, NOW())`

  revalidatePath('/guestbook')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'update@updates.saad.sh',
      to: 'saadbashdev@gmail.com',
      subject: 'New Guestbook Entry on saad.sh',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Guestbook Entry</h2>
          <p style="color: #666;"><strong>From:</strong> ${email}</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
            <p style="margin: 0; color: #333;">${message}</p>
          </div>
        </div>
      `,
    }),
  })

  if (!res.ok) {
    console.error('Failed to send email', await res.text())
  }

  if (res.ok) {
    const data = await res.json()
    console.log('Email sent', data)
  }
}

export async function hasRecentEntry(email: string): Promise<boolean> {
  const sql = neon(process.env.DATABASE_URL)

  const result = await sql`
    SELECT COUNT(*) as count 
    FROM guestbook 
    WHERE email = ${email} 
    AND created_at > NOW() - INTERVAL '1 day'`

  return (result[0] as { count: number }).count > 0
}

type Message = {
  id: number
  email: string
  message: string
  created_by: string
  created_at: string
  updated_at: string | null
  avatar_url: string | null
}

export async function getMessages(): Promise<Message[]> {
  const sql = neon(process.env.DATABASE_URL)

  const messages = (await sql`
    SELECT id, email, message, created_by, avatar_url, created_at AT TIME ZONE 'UTC' AT TIME ZONE 'America/New_York' AS created_at 
    FROM guestbook 
    ORDER BY created_at DESC`) as Message[]

  return messages
}
