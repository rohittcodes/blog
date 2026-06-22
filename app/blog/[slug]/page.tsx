import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { PageBleed, Panel } from 'app/components/panel'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  let post = getBlogPosts().find((post) => post.slug === slug)
  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  let ogImage = image
    ? image.startsWith('http')
      ? image
      : `${baseUrl}${image}`
    : `/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Blog({ params }: PageProps) {
  const { slug } = await params
  let post = getBlogPosts().find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Rohith Singh',
              url: 'https://rohitt.codes',
              sameAs: [
                'https://github.com/rohittcodes',
                'https://x.com/rohittcodes',
              ],
            },
          }),
        }}
      />

      <PageBleed>
        <h1 className="title text-page-title tracking-tight text-[var(--foreground)]">
          {post.metadata.title}
        </h1>
        <p className="text-sm mt-2 tabular-nums text-[var(--muted-foreground)]">
          {formatDate(post.metadata.publishedAt)}
        </p>
        {post.metadata.summary ? (
          <p className="text-sm mt-3 leading-relaxed text-[var(--muted-foreground)]">
            {post.metadata.summary}
          </p>
        ) : null}
      </PageBleed>

      <Panel
        title="Article"
        grow
        action={
          <Link
            href="/blog"
            className="link-muted text-xs"
          >
            ← All posts
          </Link>
        }
      >
        <article className="prose">
          <CustomMDX source={post.content} />
        </article>
      </Panel>
    </div>
  )
}
