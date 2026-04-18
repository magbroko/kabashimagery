import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { ICON_STROKE } from '../lib/lucideDefaults'
import { premiumSpring } from '../lib/motionPresets'

const navLinks = [
  { to: '/#work', label: 'Work' },
  { to: '/#services', label: 'Services' },
  { to: '/#process', label: 'Process' },
  { to: '/#contact', label: 'Contact' },
] as const

const navRevealContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.065, delayChildren: 0.08 },
  },
} as const

const navRevealItem = {
  hidden: { opacity: 0, y: -14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const

function MagneticBookCta({
  className,
  style,
  to,
  children,
  onClick,
}: {
  className: string
  style?: React.CSSProperties
  to: string
  children: React.ReactNode
  onClick?: () => void
}) {
  const wrapRef = useRef<HTMLSpanElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 120, damping: 22 })
  const sy = useSpring(y, { stiffness: 120, damping: 22 })

  const onMove = (e: React.MouseEvent) => {
    const el = wrapRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    x.set((e.clientX - cx) * 0.13)
    y.set((e.clientY - cy) * 0.13)
  }

  return (
    <motion.span
      ref={wrapRef}
      className="relative hidden sm:inline-flex"
      style={{ perspective: 900 }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      <motion.span
        style={{
          x: sx,
          y: sy,
          display: 'inline-block',
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ rotateX: 5, z: 8 }}
        transition={premiumSpring}
      >
        <Link to={to} className={className} style={style} onClick={onClick}>
          {children}
        </Link>
      </motion.span>
    </motion.span>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 md:px-8">
      <nav
        className="glass-panel mx-auto max-w-7xl rounded-2xl px-5 py-3.5 md:px-8"
        aria-label="Primary"
      >
        <motion.div
          className="flex items-center justify-between gap-4"
          variants={navRevealContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={navRevealItem}>
            <Link
              to="/"
              className="font-serif text-lg tracking-tight text-foreground md:text-xl"
            >
              Kabash Imagery
            </Link>
          </motion.div>

          <motion.ul
            className="hidden items-center gap-8 md:flex"
            variants={navRevealContainer}
          >
            {navLinks.map((link) => (
              <motion.li key={link.to} variants={navRevealItem}>
                <Link
                  to={link.to}
                  className="font-sans text-sm font-medium text-foreground/78 transition-colors hover:text-champagne-bright"
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </motion.ul>

          <div className="flex items-center gap-3">
            <motion.div variants={navRevealItem} className="hidden sm:block">
              <MagneticBookCta
                to="/#contact"
                className="relative rounded-full px-5 py-2.5 font-sans text-[13px] font-medium tracking-wide text-foreground/95 transition-colors hover:text-champagne-bright sm:inline-flex"
                style={{
                  background:
                    'linear-gradient(160deg, rgb(255 255 255 / 0.07) 0%, rgb(255 255 255 / 0.02) 45%, transparent 100%), var(--color-background)',
                  border: '1px solid rgb(255 255 255 / 0.14)',
                  boxShadow:
                    'inset 0 1px 0 rgb(255 255 255 / 0.08), 0 10px 42px -28px rgb(191 167 106 / 0.45), 0 0 0 1px rgb(0 0 0 / 0.35)',
                }}
              >
                Book a session
              </MagneticBookCta>
            </motion.div>

            <motion.div variants={navRevealItem}>
              <button
                type="button"
                className="inline-flex rounded-xl p-2 text-foreground/90 transition hover:bg-foreground/[0.06] md:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? (
                  <X className="size-6" strokeWidth={ICON_STROKE} aria-hidden />
                ) : (
                  <Menu className="size-6" strokeWidth={ICON_STROKE} aria-hidden />
                )}
              </button>
            </motion.div>
          </div>
        </motion.div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel-strong mx-auto mt-3 max-w-7xl rounded-2xl px-6 py-6 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="block rounded-xl px-3 py-3 text-base text-foreground/90 transition hover:bg-foreground/[0.06] hover:text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <motion.div
                  whileHover={{ y: -2, rotateX: 4, scale: 1.01 }}
                  transition={premiumSpring}
                  style={{ transformPerspective: 800, transformStyle: 'preserve-3d' }}
                >
                  <Link
                    to="/#contact"
                    className="block rounded-full bg-gradient-to-r from-accent-indigo/90 to-accent-indigo px-4 py-3.5 text-center text-sm font-semibold text-white shadow-[var(--shadow-glow-indigo)] transition-colors hover:brightness-110"
                    onClick={() => setOpen(false)}
                  >
                    Book a session
                  </Link>
                </motion.div>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
