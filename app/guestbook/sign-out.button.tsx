import { signOut } from 'app/auth'

export default function SignOut() {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <button
        type="submit"
        className="mb-6 mt-2 rounded-md border border-red-700 px-2 py-1 text-xs text-red-700 hover:bg-red-700 hover:text-white dark:border-red-300 dark:text-red-300 dark:hover:bg-red-300 dark:hover:text-black"
      >
        Sign Out
      </button>
    </form>
  )
}
