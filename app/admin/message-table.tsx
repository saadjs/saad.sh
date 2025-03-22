'use client'

import { useState } from 'react'
import { deleteMessages } from '../actions'

type Message = {
  id: number
  email: string
  message: string
  created_at: string
  updated_at: string | null
  avatar_url: string | null
}

export default function MessageTable({ messages }: { messages: Message[] }) {
  const [selectedMessages, setSelectedMessages] = useState<number[]>([])

  const toggleSelectAll = () => {
    if (selectedMessages.length === messages.length) {
      setSelectedMessages([])
    } else {
      setSelectedMessages(messages.map((message) => message.id))
    }
  }

  const toggleSelect = (id: number) => {
    if (selectedMessages.includes(id)) {
      setSelectedMessages(selectedMessages.filter((messageId) => messageId !== id))
    } else {
      setSelectedMessages([...selectedMessages, id])
    }
  }

  return (
    <div className="mt-4">
      <form action={deleteMessages}>
        <div className="mb-4 flex justify-between">
          <h2 className="text-lg font-semibold">Guestbook Messages ({messages.length})</h2>
          <button
            type="submit"
            className="rounded bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600 disabled:opacity-50 dark:bg-red-600 dark:hover:bg-red-700"
            disabled={selectedMessages.length === 0}
          >
            Delete Selected
          </button>
        </div>

        <div className="overflow-x-auto ">
          <table className="min-w-full border-collapse overflow-hidden rounded-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="border border-gray-200 p-2 dark:border-gray-600">
                  <input
                    type="checkbox"
                    checked={selectedMessages.length === messages.length && messages.length > 0}
                    onChange={toggleSelectAll}
                    className="h-4 w-4"
                  />
                </th>
                <th className="border border-gray-200 p-2 text-left dark:border-gray-600 dark:text-gray-200">
                  Email
                </th>
                <th className="border border-gray-200 p-2 text-left dark:border-gray-600 dark:text-gray-200">
                  Message
                </th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="border border-gray-200 p-2 text-center dark:border-gray-600">
                    <input
                      type="checkbox"
                      name="selectedMessages"
                      value={message.id}
                      checked={selectedMessages.includes(message.id)}
                      onChange={() => toggleSelect(message.id)}
                      className="h-4 w-4"
                    />
                  </td>
                  <td className="border border-gray-200 p-2 dark:border-gray-600 dark:text-gray-200">
                    {message.email}
                  </td>
                  <td className="border border-gray-200 p-2 text-sm dark:border-gray-600 dark:text-gray-200">
                    <div className="max-w-md">{message.message}</div>
                  </td>
                </tr>
              ))}
              {messages.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-500 dark:text-gray-400">
                    No messages found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  )
}
