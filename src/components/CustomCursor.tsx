import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const SPRING = { stiffness: 500, damping: 35, mass: 0.4 }

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [mode, setMode] = useState<'default' | 'image' | 'project'>('default')

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, SPRING)
  const sy = useSpring(y, SPRING)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const apply = () => {
      const ok = mq.matches
      setEnabled(ok)
      document.body.classList.toggle('custom-cursor-active', ok)
    }
    apply()
    mq.addEventListener('change', apply)
    return () => {
      mq.removeEventListener('change', apply)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [])

  useEffect(() => {
    if (!enabled) return

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)

      const el = document.elementFromPoint(e.clientX, e.clientY)
      const project = el?.closest('[data-cursor-project="true"], [data-cursor-project]')
      const image = el?.closest('[data-cursor-image="true"], [data-cursor-image]')

      if (project) setMode('project')
      else if (image) setMode('image')
      else setMode('default')
    }

    const onLeave = () => setMode('default')

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  if (mode === 'project') {
    return (
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-100 mix-blend-normal"
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          layout
          className="rounded-full border border-white/18 bg-[rgb(12_12_14_/0.72)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground shadow-[0_16px_48px_-12px_rgb(0_0_0/0.88)] backdrop-blur-xl"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        >
          View Project
        </motion.div>
      </motion.div>
    )
  }

  const size = mode === 'image' ? 56 : 22

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-100 mix-blend-difference"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        className="overflow-visible"
        animate={{ width: size, height: size }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        <circle
          cx="32"
          cy="32"
          r="30"
          fill={mode === 'image' ? '#ffffff' : 'none'}
          stroke="#ffffff"
          strokeWidth="2"
          className="transition-colors duration-200"
        />
        {mode === 'image' && (
          <circle cx="32" cy="32" r="8" fill="#050505" stroke="none" />
        )}
      </motion.svg>
    </motion.div>
  )
}
