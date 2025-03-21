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

  const sql = neon(process.env.DATABASE_URL)

  await new Promise((resolve) => setTimeout(resolve, 1000))

  await sql`
  INSERT INTO guestbook (email, message, created_by)
  VALUES (${email}, ${message.slice(0, 500)}, ${email})`

  revalidatePath('/guestbook')
}
