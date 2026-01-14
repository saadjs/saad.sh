import { ImageResponse } from 'next/og'
import { allPosts } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export const alt = 'Blog Post'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const dynamicParams = false

export function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: Buffer.from(post.slug, 'utf8').toString('base64url'),
  }))
}

const iconColors: Record<string, string> = {
  Flutter: '#02569B',
  Chrome: '#4285F4',
  Python: '#3776AB',
  Typescript: '#3178C6',
  Javascript: '#F7DF1E',
  Git: '#F05032',
  GitHub: '#ffffff',
  Jest: '#C21325',
  Next: '#ffffff',
  Nest: '#E0234E',
  Shell: '#4EAA25',
  Docker: '#2496ED',
  AI: '#f97316',
  Dart: '#0175C2',
  Flask: '#000000',
  Postgres: '#4169E1',
  React: '#61DAFB',
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const postSlug = Buffer.from(slug, 'base64url').toString('utf8')
  const post = allPosts.find((p) => p.slug === postSlug)

  const title = post?.title || 'Blog Post'
  const icon = post?.icon || 'AI'
  const iconColor = iconColors[icon] || '#f97316'

  // Adjust font size based on title length
  const titleFontSize = title.length > 60 ? 42 : title.length > 40 ? 52 : 64

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        backgroundColor: '#000000',
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23202530'/%3E%3C/svg%3E\")",
        backgroundSize: '18px 18px',
        backgroundRepeat: 'repeat',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 30,
          opacity: 0.55,
          display: 'flex',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 32,
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        />
      </div>
      <div
        style={{
          height: '100%',
          width: '100%',
          borderRadius: 22,
          border: '1px solid rgba(255,255,255,0.08)',
          backgroundColor: '#000103',
          boxShadow: '0 20px 45px rgba(15, 23, 42, 0.08)',
          padding: 56,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 64,
                height: 64,
                backgroundColor: iconColor,
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 12px 30px ${iconColor}33`,
              }}
            >
              <span
                style={{
                  color: iconColor === '#F7DF1E' || iconColor === '#ffffff' ? '#000' : '#fff',
                  fontSize: 32,
                  fontWeight: 700,
                }}
              >
                {icon.charAt(0)}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span
                style={{
                  fontSize: 14,
                  color: '#9ca3af',
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                }}
              >
                Category
              </span>
              <span
                style={{
                  fontSize: 26,
                  color: iconColor,
                  textTransform: 'uppercase',
                  letterSpacing: 2,
                }}
              >
                {icon}
              </span>
            </div>
          </div>
          <div
            style={{
              padding: '8px 16px',
              borderRadius: 999,
              border: '1px solid rgba(249,115,22,0.35)',
              color: '#f97316',
              fontSize: 14,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            Post
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1
            style={{
              fontSize: titleFontSize,
              fontWeight: 700,
              color: '#f5f5f5',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {title}
          </h1>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                fontSize: 24,
                color: '#f97316',
              }}
            >
              {'<'}
            </span>
            <span
              style={{
                fontSize: 24,
                color: '#f5f5f5',
              }}
            >
              {siteMetadata.author}
            </span>
            <span
              style={{
                fontSize: 24,
                color: '#f97316',
              }}
            >
              {' />'}
            </span>
          </div>
          <span
            style={{
              fontSize: 20,
              color: '#6b7280',
            }}
          >
            {siteMetadata.siteUrl}
          </span>
        </div>
      </div>
    </div>,
    { ...size }
  )
}
