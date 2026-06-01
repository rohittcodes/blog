function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer
      className="w-full border-t"
      style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
    >
      <div className="column-sides mx-auto max-w-2xl px-6 py-5">
        <ul className="flex flex-row gap-4 text-sm text-[var(--muted-foreground)] mb-4">
          <li>
            <a className="flex items-center gap-1.5 transition-colors hover:text-[var(--foreground)]" rel="noopener noreferrer" target="_blank" href="/rss">
              <ArrowIcon />rss
            </a>
          </li>
          <li>
            <a className="flex items-center gap-1.5 transition-colors hover:text-[var(--foreground)]" rel="noopener noreferrer" target="_blank" href="https://github.com/rohittcodes">
              <ArrowIcon />github
            </a>
          </li>
          <li>
            <a className="flex items-center gap-1.5 transition-colors hover:text-[var(--foreground)]" rel="noopener noreferrer" target="_blank" href="https://rohitt.codes">
              <ArrowIcon />rohitt.codes
            </a>
          </li>
        </ul>
        <p className="text-xs text-[var(--muted-foreground)]">© {new Date().getFullYear()} Rohith Singh</p>
      </div>
    </footer>
  )
}
