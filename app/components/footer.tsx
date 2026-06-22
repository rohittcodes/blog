import { ArrowUpRight, ICON_STROKE } from 'app/components/icons'

export default function Footer() {
  return (
    <footer
      className="w-full border-t"
      style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
    >
      <div className="column-sides mx-auto max-w-2xl px-6 py-5">
        <ul className="flex flex-row gap-4 text-sm text-[var(--muted-foreground)] mb-4">
          <li>
            <a className="link-muted flex items-center gap-1.5" rel="noopener noreferrer" target="_blank" href="/rss">
              <ArrowUpRight size={12} strokeWidth={ICON_STROKE} aria-hidden />rss
            </a>
          </li>
          <li>
            <a className="link-muted flex items-center gap-1.5" rel="noopener noreferrer" target="_blank" href="https://github.com/rohittcodes">
              <ArrowUpRight size={12} strokeWidth={ICON_STROKE} aria-hidden />github
            </a>
          </li>
          <li>
            <a className="link-muted flex items-center gap-1.5" rel="noopener noreferrer" target="_blank" href="https://rohitt.codes">
              <ArrowUpRight size={12} strokeWidth={ICON_STROKE} aria-hidden />rohitt.codes
            </a>
          </li>
        </ul>
        <p className="text-xs text-[var(--muted-foreground)]">© {new Date().getFullYear()} Rohith Singh</p>
      </div>
    </footer>
  )
}
