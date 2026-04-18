import type { LucideIcon } from 'lucide-react'
import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ICON_STROKE } from '../lib/lucideDefaults'
import { premiumSpring } from '../lib/motionPresets'

type ServiceCardProps = {
  title: string
  description: string
  icon: LucideIcon
  className?: string
}

export function ServiceCard({
  title,
  description,
  icon: Icon,
  className = '',
}: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const springX = useSpring(px, { stiffness: 100, damping: 22 })
  const springY = useSpring(py, { stiffness: 100, damping: 22 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [6.5, -6.5])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6.5, 6.5])

  const handlePointerMove = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }

  const handlePointerLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <div
      className="h-full [transform-style:preserve-3d]"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        ref={ref}
        className={`glass-panel group relative flex h-full flex-col overflow-hidden rounded-3xl p-10 transition-shadow duration-300 ease-in-out hover:shadow-[0_0_64px_-12px_rgb(255_255_255_/_0.14),0_0_1px_0_rgb(255_255_255_/_0.08)] ${className}`}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        transition={premiumSpring}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className="relative z-[1] flex min-h-0 flex-1 flex-col items-start transition-all duration-300 ease-in-out">
          <div className="mb-6 inline-flex rounded-2xl bg-foreground/[0.06] p-3.5 text-champagne ring-1 ring-inset ring-white/[0.06] transition-all duration-300 ease-in-out group-hover:text-champagne-bright group-hover:ring-white/[0.1]">
            <Icon
              className="size-8 transition-colors duration-300 ease-in-out"
              strokeWidth={ICON_STROKE}
              aria-hidden
            />
          </div>
          <h3 className="font-serif text-xl font-semibold tracking-tight text-foreground md:text-2xl">
            {title}
          </h3>
          <p className="mt-4 max-w-prose text-pretty text-sm leading-relaxed text-body-soft/90 md:text-[15px] md:leading-[1.65]">
            {description}
          </p>
        </div>
        <div
          className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-white/[0.03] opacity-0 blur-3xl transition-opacity duration-300 ease-in-out group-hover:opacity-100"
          aria-hidden
        />
      </motion.div>
    </div>
  )
}
