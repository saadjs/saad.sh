'use client'

import { useRef } from 'react'
import { saveGuestbookEntry } from 'app/actions'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md border border-green-700 px-2 py-1 text-xs text-green-700 hover:bg-green-700 hover:text-white disabled:opacity-50 dark:border-green-300 dark:text-green-300 dark:hover:bg-green-300 dark:hover:text-black"
      aria-live="polite"
    >
      {pending ? 'Signing...' : 'Sign'}
    </button>
  )
}

export default function GuestbookForm() {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form
      ref={formRef}
      className="relative  max-w-md"
      action={async (formData) => {
        await saveGuestbookEntry(formData)
        formRef.current?.reset()
      }}
    >
      <input
        aria-label="Your message"
        placeholder="Leave a message..."
        name="entry"
        type="text"
        required
        className="w-full rounded-md border border-gray-200 px-4 py-3 pr-20 transition-all focus:outline-none focus:ring-1 focus:ring-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-gray-500"
      />
      <SubmitButton />
    </form>
  )
}
