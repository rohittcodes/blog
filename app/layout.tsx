import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'

const defaultOgImage = {
  url: '/og?title=Rohith%20Singh',
  width: 1200,
  height: 630,
  alt: 'Rohith Singh',
}

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Rohith Singh',
    template: '%s | Rohith Singh',
  },
  description: 'Personal blog by Rohith Singh (@rohittcodes).',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Rohith Singh',
    description: 'Personal blog by Rohith Singh (@rohittcodes).',
    url: baseUrl,
    siteName: 'Rohith Singh',
    locale: 'en_US',
    type: 'website',
    images: [defaultOgImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rohith Singh',
    description: 'Personal blog by Rohith Singh (@rohittcodes).',
    images: [defaultOgImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

const themeScript = `
try {
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
  }
} catch(_) {}
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(GeistSans.variable, GeistMono.variable)}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <div
          className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col"
          style={{ backgroundColor: 'var(--background)' }}
        >
          <main className="flex min-h-0 flex-1 flex-col">
            {children}
            <Analytics />
            <SpeedInsights />
          </main>
        </div>
        <Footer />
      </body>
    </html>
  )
}
