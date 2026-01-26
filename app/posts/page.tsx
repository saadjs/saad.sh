import ListLayoutWithTags from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allPosts } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import siteMetadata from '@/data/siteMetadata'

export const metadata = genPageMetadata({
  title: 'Posts',
  canonical: `${siteMetadata.siteUrl}/posts`,
})

export default function PostsPage() {
  const posts = allCoreContent(sortPosts(allPosts))

  return <ListLayoutWithTags posts={posts} title="All Posts" />
}
