import { ImageResponse } from 'next/og'
import siteMetadata from '@/data/siteMetadata'

export const alt = siteMetadata.title
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              border: '1px solid rgba(249,115,22,0.4)',
              backgroundColor: 'rgba(249,115,22,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f97316',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            SB
          </div>
          <span
            style={{
              color: '#f5f5f5',
              fontSize: 22,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
            }}
          >
            Latest Notes
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                fontSize: 64,
                fontWeight: 700,
                color: '#f97316',
              }}
            >
              {'<'}
            </span>
            <span
              style={{
                fontSize: 64,
                fontWeight: 700,
                color: '#f5f5f5',
              }}
            >
              {siteMetadata.author}
            </span>
            <span
              style={{
                fontSize: 64,
                fontWeight: 700,
                color: '#f97316',
              }}
            >
              {' />'}
            </span>
          </div>

          <div
            style={{
              fontSize: 28,
              color: '#9ca3af',
            }}
          >
            {siteMetadata.description}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: '#f97316',
            }}
          >
            Dev Notes & Snippets
          </div>
          <div
            style={{
              fontSize: 20,
              color: '#6b7280',
            }}
          >
            saad.sh
          </div>
        </div>
      </div>
    </div>,
    { ...size }
  )
}
