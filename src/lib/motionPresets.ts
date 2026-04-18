import type { Transition, Variants } from 'framer-motion'

/** Premium, controlled motion — high damping avoids “bouncy” easing. */
export const premiumSpring: Transition = {
  type: 'spring',
  damping: 22,
  stiffness: 100,
}

/** Stagger between list/grid children (~20ms wave). */
export const staggerWave = {
  staggerChildren: 0.02,
  delayChildren: 0.06,
} as const

export const sectionUnfoldContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      ...premiumSpring,
      ...staggerWave,
    },
  },
}

export const sectionUnfoldItem: Variants = {
  hidden: {
    opacity: 0,
    rotateX: 7,
    scale: 0.94,
    y: 28,
    z: -100,
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    scale: 1,
    y: 0,
    z: 0,
    transition: premiumSpring,
  },
}

/** Section title + lead paragraph (3D unfold). */
export const sectionHeaderReveal: Variants = {
  hidden: {
    opacity: 0,
    rotateX: 6,
    scale: 0.96,
    y: 24,
    z: -100,
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    scale: 1,
    y: 0,
    z: 0,
    transition: premiumSpring,
  },
}

export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    rotateX: 5,
    y: 40,
    scale: 0.97,
    transformPerspective: 1400,
  },
  animate: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    scale: 1,
    transformPerspective: 1400,
    transition: premiumSpring,
  },
  exit: {
    opacity: 0,
    rotateX: -3,
    y: -16,
    scale: 0.92,
    transformPerspective: 1400,
    transition: premiumSpring,
  },
}
