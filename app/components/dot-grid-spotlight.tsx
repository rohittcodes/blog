'use client'

import { useEffect, useRef } from 'react'

export function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -1000, y: -1000, isActive: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const spacing = 20
    const baseRadius = 1
    const activeRadius = 2.5
    const interactionRadius = 140

    let width = 0
    let height = 0
    let frameId: number | null = null

    function getDotColors() {
      const isDark = document.documentElement.classList.contains('dark')
      return {
        dot: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)',
        active: isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.18)',
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height)
      const { dot, active } = getDotColors()
      const ox = (width % spacing) / 2
      const oy = (height % spacing) / 2
      const mx = mouse.current.x
      const my = mouse.current.y
      const isActive = mouse.current.isActive

      for (let x = ox; x <= width; x += spacing) {
        for (let y = oy; y <= height; y += spacing) {
          const dx = x - mx
          const dy = y - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          let r = baseRadius
          let color = dot
          let alpha = 1

          if (isActive && dist < interactionRadius) {
            const f = 1 - dist / interactionRadius
            r = baseRadius + (activeRadius - baseRadius) * f
            color = active
            alpha = 0.5 + 0.5 * f
          }

          ctx!.globalAlpha = alpha
          ctx!.beginPath()
          ctx!.arc(x, y, r, 0, Math.PI * 2)
          ctx!.fillStyle = color
          ctx!.fill()
        }
      }
      ctx!.globalAlpha = 1
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1
      width = window.innerWidth
      height = window.innerHeight
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      ctx!.scale(dpr, dpr)
      draw()
    }

    function onMouseMove(e: MouseEvent) {
      mouse.current = { x: e.clientX, y: e.clientY, isActive: true }
      if (frameId === null) {
        frameId = requestAnimationFrame(() => { draw(); frameId = null })
      }
    }

    function onMouseLeave() {
      mouse.current.isActive = false
      if (frameId === null) {
        frameId = requestAnimationFrame(() => { draw(); frameId = null })
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', resize)

    // Re-draw when theme changes (MutationObserver on html class)
    const observer = new MutationObserver(() => draw())
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    resize()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', resize)
      observer.disconnect()
      if (frameId !== null) cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
