'use client'

import { useLayoutEffect, useRef, useState } from 'react'

export function LineClamp({
  text,
  lines,
  className,
}: {
  text: string
  lines: number
  className?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [display, setDisplay] = useState(text)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const suffix = ' ...'

    const fits = (value: string) => {
      el.textContent = value
      return el.scrollHeight <= el.clientHeight + 1
    }

    el.textContent = text
    if (fits(text)) {
      setDisplay(text)
      return
    }

    let low = 0
    let high = text.length

    while (low < high) {
      const mid = Math.ceil((low + high) / 2)
      const candidate = `${text.slice(0, mid).trimEnd()}${suffix}`
      if (fits(candidate)) low = mid
      else high = mid - 1
    }

    setDisplay(
      low < text.length ? `${text.slice(0, low).trimEnd()}${suffix}` : text
    )
  }, [text, lines])

  return (
    <p
      ref={ref}
      className={className}
      style={{
        display: '-webkit-box',
        WebkitLineClamp: lines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}
    >
      {display}
    </p>
  )
}
