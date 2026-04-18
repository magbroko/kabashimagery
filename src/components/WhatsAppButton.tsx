import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { ICON_STROKE } from '../lib/lucideDefaults'
import { premiumSpring } from '../lib/motionPresets'

const PHONE_E164 = '2347043681970'
const href = `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(
  'Hello Kabash Imagery — I would like to book a session.',
)}`

export function WhatsAppButton() {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -4, rotateX: 8, scale: 1.03 }}
      transition={premiumSpring}
      style={{ transformPerspective: 900, transformStyle: 'preserve-3d' }}
      className="glass-panel fixed bottom-6 right-6 z-[80] flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-foreground shadow-lg shadow-black/45 transition-colors hover:border-accent-indigo/35 hover:text-accent-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo"
      aria-label="Chat on WhatsApp at 07043681970"
    >
      <MessageCircle className="size-5 text-accent" strokeWidth={ICON_STROKE} aria-hidden />
      <span className="hidden sm:inline">WhatsApp</span>
    </motion.a>
  )
}
