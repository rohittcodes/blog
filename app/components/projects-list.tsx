import Image from 'next/image'
import Link from 'next/link'
import { getProjects } from 'app/projects/utils'
import { ProjectTags } from 'app/components/project-tags'
import { LineClamp } from 'app/components/line-clamp'
import { ArrowUpRight, ICON_STROKE } from 'app/components/icons'

type Project = ReturnType<typeof getProjects>[number]

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="link-card group block h-full">
      {project.metadata.image ? (
        <div
          className="link-card-media relative mb-3 aspect-[16/9] w-full rounded-md border"
          style={{ borderColor: 'var(--border)' }}
        >
          <Image
            src={project.metadata.image}
            alt={project.metadata.title}
            fill
            sizes="(max-width: 640px) 50vw, 320px"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="link-card-title mb-1 line-clamp-1 text-sm font-medium text-[var(--foreground)]">
            {project.metadata.title}
          </p>
          <LineClamp
            text={project.metadata.summary}
            lines={2}
            className="mb-2.5 text-xs leading-relaxed text-[var(--muted-foreground)]"
          />
          <ProjectTags tags={project.tech} />
        </div>
        <ArrowUpRight
          className="link-card-icon mt-0.5 h-3.5 w-3.5 shrink-0"
          strokeWidth={ICON_STROKE}
          aria-hidden
        />
      </div>
    </Link>
  )
}

export function ProjectsList({ limit }: { limit?: number }) {
  const projects = getProjects()
  const items = limit ? projects.slice(0, limit) : projects

  return (
    <div className="grid grid-cols-1 min-[520px]:grid-cols-2 gap-x-5 gap-y-6">
      {items.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  )
}
