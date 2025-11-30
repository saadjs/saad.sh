/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Post } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import DevIcon from '@/components/DevIcon'

interface ListLayoutProps {
  posts: CoreContent<Post>[]
  title: string
  initialDisplayPosts?: CoreContent<Post>[]
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  const tagSlugFromPath = pathname.startsWith('/tags/')
    ? decodeURI(pathname.split('/tags/')[1] ?? '')
    : ''
  const activeTagLabel = tagSlugFromPath
    ? (sortedTags.find((tag) => slug(tag) === tagSlugFromPath) ?? tagSlugFromPath)
    : null

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <div className="space-y-12 pt-10">
      <header className="ui-panel space-y-3 p-6 sm:space-y-4 sm:p-7 md:p-8">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {activeTagLabel ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Posts tagged with{' '}
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              #{activeTagLabel}
            </span>
            {displayPosts.length > 0
              ? ` · ${displayPosts.length} post${displayPosts.length > 1 ? 's' : ''}`
              : null}
          </p>
        ) : (
          <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400">
            {siteMetadata.description}
          </p>
        )}
      </header>

      <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
        <aside className="ui-panel hidden w-full max-w-xs flex-shrink-0 p-6 sm:p-7 lg:block">
          <div className="space-y-4">
            {pathname.startsWith('/posts') ? (
              <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-500">
                All Posts
              </h3>
            ) : (
              <Link
                href={`/posts`}
                className="text-sm font-semibold uppercase tracking-wide text-slate-600 transition-colors duration-200 hover:text-primary-500 dark:text-slate-300 dark:hover:text-primary-400"
              >
                All Posts
              </Link>
            )}
            <ul className="space-y-2 text-sm">
              {sortedTags.map((t) => {
                const isActive = tagSlugFromPath === slug(t)

                return (
                  <li key={t}>
                    {isActive ? (
                      <span className="inline-flex w-full items-center justify-between rounded-lg bg-primary-500/10 px-3 py-2 font-medium uppercase text-primary-600 dark:text-primary-400">
                        {t}
                        <span className="text-xs text-primary-500 dark:text-primary-300">
                          {tagCounts[t]}
                        </span>
                      </span>
                    ) : (
                      <Link
                        href={`/tags/${slug(t)}`}
                        className="inline-flex w-full items-center justify-between rounded-lg px-3 py-2 font-medium uppercase text-slate-500 transition-colors duration-200 hover:bg-slate-100 hover:text-primary-500 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-primary-400"
                        aria-label={`View posts tagged ${t}`}
                      >
                        {t}
                        <span className="text-xs text-slate-400 transition-colors duration-200 group-hover:text-primary-400">
                          {tagCounts[t]}
                        </span>
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </aside>

        <section className="flex-1">
          {displayPosts.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">No posts found.</p>
          ) : (
            <ul className="flex list-none flex-col gap-6 sm:gap-8">
              {displayPosts.map((post: Post) => {
                const { path, date, title: postTitle, summary, tags, icon } = post

                return (
                  <li key={path}>
                    <article className="ui-panel group relative flex flex-col justify-between overflow-hidden p-6 sm:p-7">
                      <Link
                        href={`/${path}`}
                        aria-label={`Read "${postTitle}"`}
                        className="ui-panel-overlay absolute inset-0 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500"
                      >
                        <span className="sr-only">Read {postTitle}</span>
                      </Link>

                      <div className="pointer-events-none relative z-10 flex flex-col justify-between gap-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="space-y-3">
                            <dl className="space-y-1 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                              <dt className="sr-only">Published on</dt>
                              <dd>
                                <time dateTime={date} suppressHydrationWarning>
                                  {formatDate(date, siteMetadata.locale)}
                                </time>
                              </dd>
                            </dl>
                            <h2 className="text-xl font-semibold leading-snug tracking-tight text-slate-900 dark:text-slate-100">
                              {postTitle}
                            </h2>
                          </div>
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/80 shadow-inner dark:bg-slate-900/70">
                            <DevIcon icon={icon} />
                          </div>
                        </div>

                        <p className="line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                          {summary}
                        </p>

                        {tags?.length ? (
                          <div className="pointer-events-auto flex flex-wrap gap-2">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        ) : null}

                        <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors duration-200 group-hover:text-primary-500 dark:text-slate-400 dark:group-hover:text-primary-300">
                          <span className="inline-flex items-center gap-2">
                            Read More
                            <span
                              aria-hidden="true"
                              className="transition-transform duration-200 group-hover:translate-x-1"
                            >
                              &rarr;
                            </span>
                          </span>
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
