'use client'
import { useState } from 'react'

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      onClick={handleCopy}
      className="link-muted text-[11px] cursor-pointer"
      style={{ color: copied ? 'var(--foreground)' : 'var(--muted-foreground)' }}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}
