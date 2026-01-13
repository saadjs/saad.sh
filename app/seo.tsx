import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export function genPageMetadata({ title, description, image, ...rest }: PageSEOProps): Metadata {
  const resolvedImage = image || siteMetadata.socialBanner
  return {
    title,
    description: description || siteMetadata.description,
    openGraph: {
      title: `${title} | ${siteMetadata.title}`,
      description: description || siteMetadata.description,
      url: './',
      siteName: siteMetadata.title,
      images: [resolvedImage],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteMetadata.title}`,
      description: description || siteMetadata.description,
      images: [resolvedImage],
    },
    ...rest,
  }
}
