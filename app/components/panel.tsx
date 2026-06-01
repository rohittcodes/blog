import React from 'react'

export function Panel({
  title,
  action,
  grow,
  children,
}: {
  title?: string
  action?: React.ReactNode
  grow?: boolean
  children: React.ReactNode
}) {
  return (
    <section className={grow ? 'panel-grow' : undefined}>
      {title ? (
        <div className="full-bleed panel-header-bleed">
          <div
            className="panel-hatch column-sides max-w-2xl mx-auto"
            style={{
              borderTop: '1px solid var(--line)',
              borderBottom: '1px solid var(--line)',
            }}
          >
            <div className="px-6 py-2.5 flex items-center justify-between">
              <span
                className="text-xs font-medium uppercase tracking-widest"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {title}
              </span>
              {action}
            </div>
          </div>
        </div>
      ) : null}
      <div className="full-bleed panel-body-bleed">
        <div className="panel-hatch w-full">
          <div
            className="column-sides max-w-2xl mx-auto px-6 py-5"
            style={{ backgroundColor: 'var(--background)' }}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

export function PageBleed({ children }: { children: React.ReactNode }) {
  return (
    <div className="full-bleed panel-body-bleed">
      <div className="panel-hatch w-full">
        <section
          className="column-sides mx-auto max-w-2xl px-6 py-8"
          style={{
            backgroundColor: 'var(--background)',
            borderBottom: '1px solid var(--line)',
          }}
        >
          {children}
        </section>
      </div>
    </div>
  )
}
