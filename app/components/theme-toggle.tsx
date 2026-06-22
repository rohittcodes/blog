'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun, ICON_STROKE } from 'app/components/icons'

export function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="link-control has-tip flex items-center justify-center w-7 h-7 rounded-md"
      data-tip={dark ? 'Light mode' : 'Dark mode'}
    >
      {dark ? (
        <Sun size={14} strokeWidth={ICON_STROKE} aria-hidden />
      ) : (
        <Moon size={14} strokeWidth={ICON_STROKE} aria-hidden />
      )}
    </button>
  )
}
