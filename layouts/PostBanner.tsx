import { ReactNode } from 'react'
import Image from '@/components/Image'
import Bleed from 'pliny/ui/Bleed'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Post } from 'contentlayer/generated'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import { CopyPostButton } from '@/components/CopyPostButton'

interface LayoutProps {
  content: CoreContent<Post>
  post: Post
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export default function PostMinimal({ content, post, next, prev, children }: LayoutProps) {
  const { slug, title, images, path, summary } = content
  const displayImage =
    images && images.length > 0 ? images[0] : 'https://picsum.photos/seed/picsum/800/400'
  const siteBaseUrl = siteMetadata.siteUrl.replace(/\/$/, '')
  const canonicalUrl = `${siteBaseUrl}/${path}`
  const postContent = post.body.raw ?? ''

  return (
    <SectionContainer>
      <article className="mt-10">
        <div>
          <div className="space-y-4 pb-10 text-center">
            <div className="w-full">
              <Bleed>
                <div className="relative aspect-[2/1] w-full">
                  <Image src={displayImage} alt={title} fill className="object-cover" />
                </div>
              </Bleed>
            </div>
            <div className="relative pt-10">
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <PageTitle>{title}</PageTitle>
                <CopyPostButton
                  postTitle={title}
                  postUrl={canonicalUrl}
                  postContent={postContent}
                  postSummary={summary}
                />
              </div>
            </div>
          </div>
          <div className="prose max-w-none py-4 dark:prose-invert">{children}</div>
          <footer>
            <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
              {prev && prev.path && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${prev.path}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Previous post: ${prev.title}`}
                  >
                    &larr; {prev.title}
                  </Link>
                </div>
              )}
              {next && next.path && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${next.path}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Next post: ${next.title}`}
                  >
                    {next.title} &rarr;
                  </Link>
                </div>
              )}
            </div>
          </footer>
        </div>
      </article>
    </SectionContainer>
  )
}
