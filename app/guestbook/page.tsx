import { Suspense } from 'react'
import { auth } from 'app/auth'
import SignIn from './sign-in.button'
import SignOut from './sign-out.button'
import Form from './form'
import Messages from './message-list'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Guestbook', description: 'Sign my guestbook' })

export default async function Guestbook() {
  const session = await auth()

  return (
    <section>
      <h1 className="mb-8 text-3xl font-bold tracking-tighter">✍️ Sign my Guestbook</h1>
      <Suspense fallback={<Loading />}>
        {session?.user ? (
          <>
            <UserInfo name={session.user.name} email={session.user.email} />
            <Form />
            <SignOut />
          </>
        ) : (
          <SignIn />
        )}
        <Messages />
      </Suspense>
    </section>
  )
}

function UserInfo(user: { name: string; email: string }) {
  return (
    <p className="mb-2 mt-2 text-sm text-neutral-700 dark:text-neutral-300">
      Logged in as <span className="font-bold">{user.name}</span> (
      <span className="italic">{user.email}</span>)
    </p>
  )
}

function Loading() {
  return (
    <div className="animate-pulse">
      <div className="mb-8 h-10 w-64 rounded-md bg-gray-200 dark:bg-gray-700" />

      <div className="mb-4 max-w-md">
        <div className="h-12 rounded-md bg-gray-200 dark:bg-gray-700" />
      </div>

      <div className="mt-8 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex space-x-3">
            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
