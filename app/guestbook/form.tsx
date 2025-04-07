'use client'

import { useRef, useState, type JSX } from 'react'
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
      <span className="flex w-10 items-center justify-center">
        {pending ? (
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="stroke-current opacity-25"
              cx="12"
              cy="12"
              r="10"
              strokeWidth="4"
            ></circle>
            <path
              className="fill-current opacity-75"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        ) : (
          'Sign'
        )}
      </span>
    </button>
  )
}

export default function GuestbookForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [error, setError] = useState<string | JSX.Element | null>(null)

  return (
    <div>
      {error && (
        <div className="mb-4 text-sm text-red-500" role="alert">
          {error}
        </div>
      )}
      <form
        ref={formRef}
        className="relative max-w-md"
        action={async (formData) => {
          try {
            setError(null)
            await saveGuestbookEntry(formData)
            formRef.current?.reset()
          } catch (e) {
            setError(
              e instanceof Error && e.message === 'too many requests'
                ? `You have already signed the guestbook. Please wait 24 hours before signing again.`
                : 'Something went wrong'
            )
          }
        }}
      >
        <div className="relative">
          <input
            aria-label="Your message"
            placeholder="Your message"
            name="message"
            type="text"
            required
            className="w-full rounded-md border border-gray-200 px-4 py-3 pr-32 transition-all focus:outline-none focus:ring-1 focus:ring-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-gray-500"
            onChange={(e) => {
              const count = e.target.value.length
              const countElement = document.getElementById('char-count')
              if (countElement) countElement.innerText = `${count}/500`
            }}
            maxLength={500}
            minLength={10}
          />
          <div className="absolute bottom-1 right-20 flex items-center space-x-2 text-xs text-gray-400">
            <span id="char-count">0/500</span>
          </div>
        </div>
        <SubmitButton />
      </form>
    </div>
  )
}
