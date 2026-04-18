import { motion } from 'framer-motion'
import { ServiceCard } from './ServiceCard'
import { services } from '../data/services'
import { premiumContainer, premiumSectionX } from '../lib/sectionLayout'
import {
  sectionHeaderReveal,
  sectionUnfoldContainer,
  sectionUnfoldItem,
  staggerWave,
} from '../lib/motionPresets'

const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerWave.staggerChildren,
      delayChildren: 0,
    },
  },
}

export function Services() {
  return (
    <section
      id="services"
      className={`scroll-mt-28 bg-black ${premiumSectionX} py-24 sm:py-28 md:py-32`}
      aria-labelledby="services-heading"
      style={{ perspective: '1400px' }}
    >
      <div className={`${premiumContainer} [transform-style:preserve-3d]`}>
        <motion.div
          variants={sectionUnfoldContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: '-60px' }}
          className="[transform-style:preserve-3d]"
        >
          <motion.div
            variants={sectionHeaderReveal}
            className="text-center [transform-style:preserve-3d]"
          >
            <h2
              id="services-heading"
              className="font-serif text-3xl font-semibold tracking-[0.02em] text-foreground sm:text-4xl md:text-[2.75rem] md:leading-[1.15]"
            >
              Services
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-pretty font-sans text-base leading-relaxed text-body-soft/85 sm:text-[1.05rem]">
              Bespoke offerings tailored to how you want to be seen — and remembered.
            </p>
            <p className="mx-auto mt-2 max-w-2xl text-pretty font-sans text-sm leading-relaxed text-body-soft/75 sm:text-[0.95rem]">
              Premium local service; transparent quotes in{' '}
              <span className="font-normal text-champagne transition-colors duration-300 ease-in-out">
                ₦
              </span>{' '}
              where applicable.
            </p>
          </motion.div>

          <motion.div
            variants={gridContainerVariants}
            className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-4 md:grid-rows-[auto_auto_auto] md:gap-12 [transform-style:preserve-3d]"
          >
            {services.map((s) => (
              <motion.div
                key={s.title}
                variants={sectionUnfoldItem}
                className={`[transform-style:preserve-3d] ${s.gridClassName}`}
              >
                <ServiceCard
                  title={s.title}
                  description={s.description}
                  icon={s.icon}
                  className="h-full"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
