import { Suspense } from 'react'
import { auth } from 'app/auth'
import SignIn from './sign-in.button'
import SignOut from './sign-out.button'
import Form from './form'
import Messages from './message-list'

export const metadata = {
  title: 'Guestbook',
  description: 'Sign the guestbook',
}

export default async function Guestbook() {
  const session = await auth()

  return (
    <section>
      <h1 className="mb-8 text-3xl font-bold tracking-tighter">✍️ Sign my Guestbook</h1>
      <Suspense>
        {session?.user ? (
          <>
            <p className="mb-2 mt-2 text-sm text-neutral-700 dark:text-neutral-300">
              Logged in as {session.user.email}
            </p>
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
