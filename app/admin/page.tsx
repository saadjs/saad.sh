import { getMessages } from '../actions'
import { auth } from '../auth'
import { redirect } from 'next/navigation'
import MessageTable from './message-table'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Admin' })

export default async function Admin() {
  const session = await auth()

  if (!session || session.user.email !== 'saadbash08@gmail.com') {
    redirect('/')
  }

  const messages = await getMessages()

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold">Admin</h1>
      <div className="space-y-4">
        <MessageTable messages={messages} />
      </div>
    </section>
  )
}
