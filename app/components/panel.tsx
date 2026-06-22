import React from 'react'

export function Panel({
  title,
  action,
  grow,
  bodyClassName,
  children,
}: {
  title?: string
  action?: React.ReactNode
  grow?: boolean
  bodyClassName?: string
  children: React.ReactNode
}) {
  return (
    <section className={grow ? 'panel-grow' : undefined}>
      {title ? (
        <div className="full-bleed panel-header-bleed">
          <div className="panel-hatch-header w-full h-10" aria-hidden="true">
            <div className="column-sides max-w-2xl mx-auto h-full" />
          </div>
          <div className="panel-header-title w-full">
            <div className="column-sides max-w-2xl mx-auto px-4 flex items-center justify-between">
              <span className="panel-heading">{title}</span>
              {action}
            </div>
          </div>
        </div>
      ) : null}
      <div className="full-bleed panel-body-bleed">
        <div className="panel-hatch w-full">
          <div
            className={
              bodyClassName ??
              'column-sides max-w-2xl mx-auto px-4 py-5'
            }
            style={{ backgroundColor: 'var(--background)' }}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

function HatchDivider({ borderless }: { borderless?: boolean }) {
  return (
    <div
      className={borderless ? 'full-bleed' : 'full-bleed border-t'}
      style={{
        backgroundColor: 'var(--background)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="panel-hatch-header w-full h-10" aria-hidden="true">
        <div className="column-sides max-w-2xl mx-auto h-full" />
      </div>
    </div>
  )
}

export function PageBleed({
  children,
  sectionClassName,
  bleedX,
  topBorder,
  topDivider,
  topDividerBorderless,
  bottomDivider,
}: {
  children: React.ReactNode
  sectionClassName?: string
  bleedX?: boolean
  topBorder?: boolean
  topDivider?: boolean
  topDividerBorderless?: boolean
  bottomDivider?: boolean
}) {
  return (
    <div className="full-bleed panel-body-bleed">
      <div className="panel-hatch w-full">
        {topDivider ? <HatchDivider borderless={topDividerBorderless} /> : null}
        <div className="column-sides mx-auto max-w-2xl">
          {topBorder ? (
            <div
              className="full-bleed border-t"
              style={{ borderColor: 'var(--border)' }}
              aria-hidden="true"
            />
          ) : null}
          <section
            className={`${bleedX ? '' : 'px-4'} ${sectionClassName ?? 'py-8'}`.trim()}
            style={{ backgroundColor: 'var(--background)' }}
          >
            {children}
          </section>
        </div>
        {bottomDivider ? <HatchDivider /> : null}
      </div>
    </div>
  )
}
