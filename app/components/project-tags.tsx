'use client'

import { useLayoutEffect, useRef, useState } from 'react'

function TagBadge({ label }: { label: string }) {
  return (
    <span className="tag-badge has-tip" data-tip={label}>
      {label}
    </span>
  )
}

export function ProjectTags({ tags }: { tags: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const moreMeasureRef = useRef<HTMLSpanElement>(null)
  const [visibleCount, setVisibleCount] = useState(tags.length)

  useLayoutEffect(() => {
    const container = containerRef.current
    const measure = measureRef.current
    const moreMeasure = moreMeasureRef.current
    if (!container || !measure || !moreMeasure) return

    const update = () => {
      const badges = Array.from(measure.children) as HTMLElement[]
      if (!badges.length) {
        setVisibleCount(0)
        return
      }

      const maxWidth = container.clientWidth
      const gap = 6

      const moreWidth = (hidden: number) => {
        if (hidden <= 0) return 0
        moreMeasure.textContent = `+${hidden} more`
        return moreMeasure.offsetWidth
      }

      const rowWidth = (count: number) => {
        let width = 0
        for (let i = 0; i < count; i++) {
          width += badges[i].offsetWidth
          if (i > 0) width += gap
        }
        const hidden = tags.length - count
        if (hidden > 0) width += gap + moreWidth(hidden)
        return width
      }

      let count = tags.length
      while (count > 0 && rowWidth(count) > maxWidth) count--
      setVisibleCount(count > 0 ? count : Math.min(1, tags.length))
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(container)
    return () => observer.disconnect()
  }, [tags])

  const hiddenCount = Math.max(0, tags.length - visibleCount)

  if (!tags.length) return null

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="flex items-center gap-1.5 overflow-hidden">
        {tags.slice(0, visibleCount).map((tag) => (
          <TagBadge key={tag} label={tag} />
        ))}
        {hiddenCount > 0 ? (
          <span
            className="has-tip shrink-0 text-xs whitespace-nowrap text-[var(--muted-foreground)]"
            data-tip={tags.slice(visibleCount).join(', ')}
          >
            +{hiddenCount} more
          </span>
        ) : null}
      </div>
      <div
        ref={measureRef}
        className="pointer-events-none invisible absolute top-0 left-0 flex gap-1.5"
        aria-hidden="true"
      >
        {tags.map((tag) => (
          <TagBadge key={tag} label={tag} />
        ))}
      </div>
      <span
        ref={moreMeasureRef}
        className="pointer-events-none invisible absolute top-0 left-0 text-xs whitespace-nowrap"
        aria-hidden="true"
      />
    </div>
  )
}
