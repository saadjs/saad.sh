import Image from 'next/image'
import { getMessages } from 'app/actions'

export default async function Messages() {
  const messages = await getMessages()

  if (!messages || messages.length === 0) {
    return null
  }

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        📜 Previous Messages
      </h2>
      {messages.map((msg, index) => (
        <div
          key={msg.id}
          className={`py-4 ${
            index !== messages.length - 1 ? 'border-b border-gray-200 dark:border-gray-800' : ''
          }`}
        >
          <div className="flex items-start space-x-3">
            <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
              <Image
                src={msg.avatar_url}
                alt={`${msg.email}'s avatar`}
                className="h-full w-full object-cover"
                width={32}
                height={32}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="break-words text-sm text-gray-700 dark:text-gray-300">{msg.message}</p>
              <p>
                <span className="break-words text-xs text-gray-500 dark:text-gray-400">
                  By {msg.email}
                </span>
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {new Date(msg.created_at).toLocaleString()} EST
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
