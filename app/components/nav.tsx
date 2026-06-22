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
      <div className="h-3" aria-hidden="true" />
      <div className="column-sides mx-auto max-w-2xl">
        <div
          className="full-bleed border-t"
          style={{ borderColor: 'var(--border)' }}
          aria-hidden="true"
        />
        <nav className="flex flex-row items-center justify-between px-6 py-2.5">
          <Link
            href="/"
            className="font-signature text-logo shrink-0 text-[var(--foreground)] transition-opacity hover:opacity-80"
            aria-label="Home"
          >
            Rohith Singh
          </Link>
          <div className="flex flex-row items-center gap-1">
            {Object.entries(navItems).map(([path, { name }]) => (
              <Link
                key={path}
                href={path}
                className="link-control text-xs font-medium px-2.5 py-1.5 rounded-md"
              >
                {name}
              </Link>
            ))}
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}
