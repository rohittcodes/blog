const ICON_SLUGS: Record<string, string> = {
  TypeScript: 'typescript',
  JavaScript: 'javascript',
  Python: 'python',
  React: 'react',
  'Next.js': 'nextdotjs',
  'Tailwind CSS': 'tailwindcss',
  'Node.js': 'nodedotjs',
  PostgreSQL: 'postgresql',
  Git: 'git',
  Docker: 'docker',
  Vercel: 'vercel',
}

function StackBadge({ name }: { name: string }) {
  const slug = ICON_SLUGS[name]
  const initials = name.replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase()

  return (
    <span className="stack-badge has-tip" data-tip={name}>
      {slug ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://cdn.simpleicons.org/${slug}`}
          alt=""
          width={14}
          height={14}
          className="stack-badge-icon"
          loading="lazy"
        />
      ) : (
        <span className="stack-badge-fallback" aria-hidden="true">
          {initials}
        </span>
      )}
      {name}
    </span>
  )
}

export function StackResume({
  categories,
}: {
  categories: { label: string; items: string[] }[]
}) {
  return (
    <div className="stack-resume">
      {categories.map((category, index) => (
        <div key={category.label} className="stack-row">
          <div className="stack-category">
            <span className="stack-category-num">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span>{category.label}</span>
          </div>
          <div className="stack-items">
            {category.items.map((item) => (
              <StackBadge key={item} name={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
