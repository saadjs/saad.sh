import DevIcon from '@/components/DevIcon'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { Post } from 'contentlayer/generated'
import { formatDate } from 'pliny/utils/formatDate'

export default function Home({ posts }) {
  return (
    <div className="space-y-12">
      <header className="space-y-3 pb-4 pt-6 sm:space-y-4 md:pb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl md:text-5xl">
          Latest
        </h1>
        <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400">
          {siteMetadata.description}
        </p>
      </header>

      <ul className="grid list-none gap-6 sm:gap-8 md:grid-cols-2">
        {posts.map((post: Post) => {
          const { slug, date, title, summary, tags, icon } = post

          return (
            <li key={slug} className="h-full">
              <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-primary-400/60 hover:shadow-md dark:border-slate-800/70 dark:bg-slate-900/70 dark:hover:border-primary-500/50">
                <Link
                  href={`/posts/${slug}`}
                  aria-label={`Read "${title}"`}
                  className="absolute inset-0 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500"
                >
                  <span className="sr-only">Read {title}</span>
                </Link>

                <div className="pointer-events-none relative z-10 flex h-full flex-col justify-between gap-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-3">
                      <dl className="space-y-1 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        <dt className="sr-only">Published on</dt>
                        <dd>
                          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        </dd>
                      </dl>
                      <h2 className="text-xl font-semibold leading-snug tracking-tight text-slate-900 dark:text-slate-100">
                        {title}
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
    </div>
  )
}
