import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { PageBleed, Panel } from 'app/components/panel'
import { getProjects } from 'app/projects/utils'
import { baseUrl } from 'app/sitemap'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  let projects = getProjects()

  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  let project = getProjects().find((project) => project.slug === slug)
  if (!project) {
    return
  }

  let { title, summary: description, image } = project.metadata
  let ogImage = image || `/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${baseUrl}/projects/${project.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  let project = getProjects().find((project) => project.slug === slug)

  if (!project) {
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
            '@type': 'CreativeWork',
            name: project.metadata.title,
            description: project.metadata.summary,
            image: project.metadata.image,
            url: `${baseUrl}/projects/${project.slug}`,
            author: {
              '@type': 'Person',
              name: 'Rohith Singh',
              url: 'https://rohitt.codes',
            },
          }),
        }}
      />

      <PageBleed>
        <h1 className="title text-page-title tracking-tight text-[var(--foreground)]">
          {project.metadata.title}
        </h1>
        {project.metadata.summary ? (
          <p className="text-sm mt-3 leading-relaxed text-[var(--muted-foreground)]">
            {project.metadata.summary}
          </p>
        ) : null}
        {project.metadata.image && (
          <div
            className="relative w-full aspect-[16/9] rounded-md overflow-hidden mt-5 border"
            style={{ borderColor: 'var(--border)' }}
          >
            <Image
              src={project.metadata.image}
              alt={project.metadata.title}
              fill
              sizes="(max-width: 672px) 100vw, 672px"
              className="object-cover"
              priority
            />
          </div>
        )}
        {project.metadata.href && (
          <a
            href={project.metadata.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-muted inline-block text-xs mt-4 underline underline-offset-2"
          >
            View live →
          </a>
        )}
      </PageBleed>

      <Panel
        title="Case Study"
        grow
        action={
          <Link
            href="/projects"
            className="link-muted text-xs"
          >
            ← All projects
          </Link>
        }
      >
        <article className="prose">
          <CustomMDX source={project.content} />
        </article>
      </Panel>
    </div>
  )
}
