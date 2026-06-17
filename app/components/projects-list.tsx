import Image from 'next/image'
import Link from 'next/link'
import { getProjects } from 'app/projects/utils'

export function ProjectsList() {
  let allProjects = getProjects()

  return (
    <div className="space-y-6">
      {allProjects.map((project) => (
        <Link key={project.slug} href={`/projects/${project.slug}`} className="group block">
          {project.metadata.image && (
            <div
              className="relative w-full aspect-[16/9] rounded-md overflow-hidden mb-3 border"
              style={{ borderColor: 'var(--border)' }}
            >
              <Image
                src={project.metadata.image}
                alt={project.metadata.title}
                fill
                sizes="(max-width: 640px) 100vw, 640px"
                className="object-cover"
              />
            </div>
          )}
          <p className="text-sm font-medium mb-1 text-[var(--foreground)] group-hover:underline underline-offset-2">
            {project.metadata.title}
          </p>
          <p className="text-xs leading-relaxed mb-2.5 text-[var(--muted-foreground)]">
            {project.metadata.summary}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-0.5 rounded bg-[var(--muted)] text-[var(--muted-foreground)]"
              >
                {t}
              </span>
            ))}
          </div>
        </Link>
      ))}
    </div>
  )
}
