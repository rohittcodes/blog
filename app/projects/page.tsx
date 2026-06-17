import { ProjectsList } from 'app/components/projects-list'
import { PageBleed, Panel } from 'app/components/panel'
import { baseUrl } from 'app/sitemap'

const ogImage = {
  url: '/og?title=Projects',
  width: 1200,
  height: 630,
  alt: 'Projects',
}

export const metadata = {
  title: 'Projects',
  description: 'Case studies of things I have built.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Projects',
    description: 'Case studies of things I have built.',
    url: `${baseUrl}/projects`,
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects',
    description: 'Case studies of things I have built.',
    images: [ogImage.url],
  },
}

export default function Page() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <PageBleed>
        <h1 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">
          Projects
        </h1>
        <p className="text-sm mt-1.5 text-[var(--muted-foreground)]">
          Case studies of things I have built — client work and open source.
        </p>
      </PageBleed>

      <Panel title="All projects" grow>
        <ProjectsList />
      </Panel>
    </div>
  )
}
