import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'

const navItems = {
  '/': { name: 'home' },
  '/projects': { name: 'projects' },
  '/blog': { name: 'blog' },
  'https://github.com/rohittcodes': { name: 'github' },
}

export function Navbar() {
  return (
    <header
      className="w-full border-b"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'var(--background)',
        borderColor: 'var(--border)',
      }}
    >
      <nav className="column-sides mx-auto flex max-w-2xl flex-row items-center justify-between px-6 py-3">
        <div className="flex flex-row gap-1">
          {Object.entries(navItems).map(([path, { name }]) => (
            <Link
              key={path}
              href={path}
              className="text-xs font-medium transition-colors px-2.5 py-1.5 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]"
            >
              {name}
            </Link>
          ))}
        </div>
        <ThemeToggle />
      </nav>
    </header>
  )
}
