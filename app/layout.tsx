import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import { brittanySignature } from './fonts/brittany'

const defaultOgImage = {
  url: '/og?title=Rohith%20Singh',
  width: 1200,
  height: 630,
  alt: 'Rohith Singh',
}

const DESCRIPTION =
  'Rohith Singh (@rohittcodes) — AI-native engineer building full-stack web apps and AI-powered products. Writing about TypeScript, React, Next.js, Rust, and AI engineering.'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Rohith Singh — AI-native Engineer',
    template: '%s | Rohith Singh',
  },
  description: DESCRIPTION,
  keywords: [
    'Rohith Singh',
    'rohittcodes',
    'AI native engineer',
    'AI engineer',
    'full stack engineer',
    'AI-powered products',
    'TypeScript developer',
    'Next.js developer',
    'React developer',
    'Rust developer',
    'software engineer India',
  ],
  authors: [{ name: 'Rohith Singh', url: 'https://rohitt.codes' }],
  creator: 'Rohith Singh',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Rohith Singh — AI-native Engineer',
    description: DESCRIPTION,
    url: baseUrl,
    siteName: 'Rohith Singh',
    locale: 'en_US',
    type: 'website',
    images: [defaultOgImage],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@rohittcodes',
    creator: '@rohittcodes',
    title: 'Rohith Singh — AI-native Engineer',
    description: DESCRIPTION,
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

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Rohith Singh',
  alternateName: 'rohittcodes',
  url: baseUrl,
  sameAs: [
    'https://github.com/rohittcodes',
    'https://x.com/rohittcodes',
    'https://rohitt.codes',
  ],
  jobTitle: 'AI-native Engineer',
  description: DESCRIPTION,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(GeistSans.variable, GeistMono.variable, brittanySignature.variable)}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
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
