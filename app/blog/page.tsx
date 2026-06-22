import { BlogPosts } from 'app/components/posts'
import { PageBleed, Panel } from 'app/components/panel'
import { baseUrl } from 'app/sitemap'

const ogImage = {
  url: '/og?title=Blog',
  width: 1200,
  height: 630,
  alt: 'Blog',
}

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog',
    description: 'Read my blog.',
    url: `${baseUrl}/blog`,
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog',
    description: 'Read my blog.',
    images: [ogImage.url],
  },
}

export default function Page() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <PageBleed>
        <h1 className="text-page-title tracking-tight text-[var(--foreground)]">
          Blog
        </h1>
        <p className="text-sm mt-1.5 text-[var(--muted-foreground)]">
          Thoughts on building for the web.
        </p>
      </PageBleed>

      <Panel title="All posts" grow>
        <BlogPosts />
      </Panel>
    </div>
  )
}
