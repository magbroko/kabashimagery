import { useMemo, useRef, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import type { PortfolioCategory } from '../../data/portfolio'
import { projects } from '../../data/projects'
import {
  premiumSpring,
  sectionHeaderReveal,
  sectionUnfoldContainer,
  staggerWave,
} from '../../lib/motionPresets'
import { premiumContainer, premiumSectionX } from '../../lib/sectionLayout'
import { SelectedWorkCard } from './SelectedWorkCard'

const categories: Array<'All' | PortfolioCategory> = [
  'All',
  'Weddings',
  'Portraits',
  'Lifestyle',
  'Events',
  'Studio',
]

const aspectClasses = [
  'aspect-[3/4]',
  'aspect-[4/5]',
  'aspect-[5/6]',
  'aspect-[2/3]',
  'aspect-[4/5]',
  'aspect-[3/4]',
] as const

const filtersContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerWave.staggerChildren,
      delayChildren: 0.04,
    },
  },
}

const filterChipVariants = {
  hidden: { opacity: 0, y: 12, rotateX: 5, scale: 0.96 },
  visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: premiumSpring },
}

/** Do not set opacity on the list — it hides all cards even when children are "visible". */
const galleryListVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerWave.staggerChildren,
      delayChildren: 0.08,
    },
  },
}

export function SelectedWork() {
  const [filter, setFilter] = useState<(typeof categories)[number]>('All')
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'end 0.1'],
  })

  const filtered = useMemo(() => {
    if (filter === 'All') return projects
    return projects.filter((p) => p.category === filter)
  }, [filter])

  const firstId = filtered[0]?.id

  return (
    <section
      ref={sectionRef}
      id="work"
      className={`scroll-mt-28 ${premiumSectionX} py-24 sm:py-28 md:py-32`}
      aria-labelledby="work-heading"
      style={{ perspective: '1400px' }}
    >
      <div className={`${premiumContainer} [transform-style:preserve-3d]`}>
        <motion.div
          variants={sectionUnfoldContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15, margin: '-60px' }}
          className="[transform-style:preserve-3d]"
        >
          <motion.div
            variants={sectionHeaderReveal}
            className="text-center [transform-style:preserve-3d]"
          >
            <h2
              id="work-heading"
              className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl md:text-[2.75rem]"
            >
              Selected work
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-foreground/60 sm:text-base">
              A curated collection of weddings, portraits, and editorial sessions — composed
              with space, light, and restraint. Open a project for the full narrative.
            </p>
          </motion.div>

          <motion.div
            variants={filtersContainerVariants}
            className="mt-12 flex flex-wrap justify-center gap-2.5 sm:gap-3 [transform-style:preserve-3d]"
            role="group"
            aria-label="Filter portfolio by category"
          >
            {categories.map((cat) => {
              const selected = filter === cat
              return (
                <motion.button
                  key={cat}
                  type="button"
                  aria-pressed={selected}
                  variants={filterChipVariants}
                  className={`rounded-full px-4 py-2.5 text-sm font-medium transition ${
                    selected
                      ? 'bg-foreground/[0.12] text-foreground shadow-[var(--shadow-glow-indigo)] ring-1 ring-accent-indigo/50'
                      : 'bg-foreground/[0.04] text-foreground/65 hover:bg-foreground/[0.08] hover:text-foreground'
                  } glass-panel`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </motion.button>
              )
            })}
          </motion.div>

          <motion.ul
            variants={galleryListVariants}
            className="mt-14 grid w-full list-none grid-cols-1 gap-8 p-0 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 [transform-style:preserve-3d]"
          >
            {filtered.map((project, i) => (
              <SelectedWorkCard
                key={project.id}
                project={project}
                index={i}
                scrollYProgress={scrollYProgress}
                aspectClass={aspectClasses[i % aspectClasses.length]}
                priority={project.id === firstId}
              />
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}
