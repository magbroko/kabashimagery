import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { MessageCircle, Aperture, Package } from 'lucide-react'
import { ICON_STROKE } from '../lib/lucideDefaults'
import { premiumContainer, premiumSectionX } from '../lib/sectionLayout'
import {
  sectionHeaderReveal,
  sectionUnfoldContainer,
  sectionUnfoldItem,
  staggerWave,
} from '../lib/motionPresets'

type ProcessStep = {
  title: string
  body: string
  icon: LucideIcon
}

const steps: readonly ProcessStep[] = [
  {
    title: 'Consultation',
    body: 'We align on vision, timeline, and deliverables — mood boards, locations, and wardrobe guidance included.',
    icon: MessageCircle,
  },
  {
    title: 'Shoot',
    body: 'A calm, directed session with professional lighting and composition — you stay present; we handle the craft.',
    icon: Aperture,
  },
  {
    title: 'Delivery',
    body: 'Edited galleries, print-ready files, and optional albums — delivered with care and clear next steps.',
    icon: Package,
  },
]

const stepListVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerWave.staggerChildren,
      delayChildren: 0.1,
    },
  },
}

const timelineOlClass =
  "relative mt-16 m-0 list-none space-y-0 p-0 before:pointer-events-none before:absolute before:left-[1.125rem] before:top-4 before:bottom-4 before:w-px before:bg-gradient-to-b before:from-accent/80 before:via-foreground/15 before:to-transparent before:content-[''] md:before:left-1/2 md:before:-translate-x-px"

export function Process() {
  return (
    <section
      id="process"
      className={`scroll-mt-28 ${premiumSectionX} pt-24 pb-10 sm:pt-28 sm:pb-12 md:pt-32 md:pb-14`}
      aria-labelledby="process-heading"
      style={{ perspective: '1400px' }}
    >
      <div className={`${premiumContainer} [transform-style:preserve-3d]`}>
        <motion.div
          variants={sectionUnfoldContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: '-50px' }}
          className="[transform-style:preserve-3d]"
        >
          <motion.div variants={sectionHeaderReveal} className="text-center [transform-style:preserve-3d]">
            <h2
              id="process-heading"
              className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl md:text-[2.75rem]"
            >
              The process
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-foreground/60 sm:text-base">
              Consultation to delivery — a clear path with luxury-level attention.
            </p>
          </motion.div>

          <motion.ol variants={stepListVariants} className={`${timelineOlClass} [transform-style:preserve-3d]`}>
            {steps.map((step, i) => {
              const Icon = step.icon
              const isLeft = i % 2 === 0
              return (
                <motion.li
                  key={step.title}
                  variants={sectionUnfoldItem}
                  className={`relative flex flex-col gap-4 pb-16 last:pb-2 [transform-style:preserve-3d] md:flex-row md:items-center ${
                    isLeft ? '' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="flex flex-1 md:justify-end md:pr-10">
                    <div
                      className={`glass-panel max-w-md rounded-2xl p-6 ${
                        isLeft ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'
                      }`}
                    >
                      <div
                        className={`mb-3 inline-flex rounded-xl bg-foreground/[0.06] p-2 text-accent ring-1 ring-foreground/[0.06] ${
                          isLeft ? 'md:float-right md:ml-4' : ''
                        }`}
                      >
                        <Icon className="size-5" strokeWidth={ICON_STROKE} aria-hidden />
                      </div>
                      <h3 className="font-serif text-xl text-foreground">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                        {step.body}
                      </p>
                    </div>
                  </div>

                  <div className="absolute left-0 top-2 flex md:left-1/2 md:-translate-x-1/2">
                    <span
                      className="ml-[0.125rem] flex size-9 items-center justify-center rounded-full border border-accent/45 bg-background text-xs font-semibold text-accent md:ml-0"
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                  </div>

                  <div className="hidden flex-1 md:block" aria-hidden />
                </motion.li>
              )
            })}
          </motion.ol>
        </motion.div>
      </div>
    </section>
  )
}
