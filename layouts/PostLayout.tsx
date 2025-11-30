import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Post, Authors } from 'contentlayer/generated'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { CopyPostButton } from '@/components/CopyPostButton'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Post>
  post: Post
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({
  content,
  post,
  authorDetails,
  next,
  prev,
  children,
}: LayoutProps) {
  const { filePath, path, date, title, tags, summary } = content
  const basePath = path.split('/')[0]
  const siteBaseUrl = siteMetadata.siteUrl.replace(/\/$/, '')
  const canonicalUrl = `${siteBaseUrl}/${path}`
  const postContent = post.body?.raw ?? ''

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article className="ui-panel space-y-4 p-6 sm:p-7 lg:p-9">
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <dl className="space-y-10 sm:flex-1">
                  <div>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>
                        {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                      </time>
                    </dd>
                  </div>
                </dl>
                <CopyPostButton
                  postTitle={title}
                  postUrl={canonicalUrl}
                  postContent={postContent}
                  postSummary={summary}
                  variant="subtle"
                  className="sm:flex-shrink-0"
                />
              </div>
              <PageTitle>{title}</PageTitle>
              {authorDetails.length > 0 && (
                <dl className="sr-only">
                  <dt>Authors</dt>
                  <dd>
                    {authorDetails
                      .map((author) => author.name)
                      .filter(Boolean)
                      .join(', ')}
                  </dd>
                </dl>
              )}
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:col-start-2 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">{children}</div>
              <div className="flex justify-end pb-6 pt-6 text-sm text-gray-700 dark:text-gray-300">
                <Link
                  href={editUrl(filePath)}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  View on GitHub
                </Link>
              </div>
            </div>
            <footer className="xl:col-start-1 xl:row-span-2">
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && prev.path && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Previous Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${prev.path}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && next.path && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Next Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${next.path}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href={`/${basePath}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label="Back to posts"
                >
                  &larr; Back to posts
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
