import ListLayoutWithTags from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allPosts } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Posts' })

export default function PostsPage() {
  const posts = allCoreContent(sortPosts(allPosts))

  return <ListLayoutWithTags posts={posts} title="All Posts" />
}
