import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import {
  HERO_BRAND_LINE,
  formatHeroServicePhrase,
  heroFocusServices,
  heroHeadlineWordRows,
  heroLocationPrimary,
  heroLocationSecondary,
} from '../data/heroContent'
import { heroImageSrcSet, heroImageUrl, heroSlideImageUrls } from '../data/heroSlides'
import { ICON_STROKE } from '../lib/lucideDefaults'
import { premiumSpring } from '../lib/motionPresets'

const editorialEase: [number, number, number, number] = [0.22, 1, 0.36, 1]
const curtainEase: [number, number, number, number] = [0.76, 0, 0.24, 1]

const BRAND_CHARS = [...HERO_BRAND_LINE]

export function Hero() {
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const heroImgRef = useRef<HTMLImageElement | null>(null)
  const [slideIndex, setSlideIndex] = useState(0)
  const [loadedSlides, setLoadedSlides] = useState(() => new Set<number>())
  const [curtainsOpen, setCurtainsOpen] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const scrollLift = useTransform(scrollYProgress, [0, 0.42], [0, -48])
  const scrollFade = useTransform(scrollYProgress, [0, 0.28, 0.58], [1, 0.94, 0.55])
  const scrollScale = useTransform(scrollYProgress, [0, 0.48], [1, 0.982])

  useEffect(() => {
    const t = window.setInterval(() => {
      setSlideIndex((i) => (i + 1) % heroSlideImageUrls.length)
    }, 7000)
    return () => window.clearInterval(t)
  }, [])

  const activeSlideKey = heroSlideImageUrls[slideIndex] ?? heroSlideImageUrls[0]

  const markSlideLoaded = (i: number) => {
    setLoadedSlides((prev) => {
      const next = new Set(prev)
      next.add(i)
      return next
    })
  }

  /** Any slide counts: avoids deadlock if slide 0 never fires `onLoad` (cached img, slow network, or carousel advanced first). */
  const heroMediaReady = reduceMotion || loadedSlides.size > 0

  useLayoutEffect(() => {
    const img = heroImgRef.current
    if (!img?.complete || img.naturalWidth === 0) return
    setLoadedSlides((prev) => {
      if (prev.has(slideIndex)) return prev
      const next = new Set(prev)
      next.add(slideIndex)
      return next
    })
  }, [slideIndex, activeSlideKey])

  useEffect(() => {
    if (!heroMediaReady) return
    const delay = reduceMotion ? 0 : 320
    const id = window.setTimeout(() => setCurtainsOpen(true), delay)
    return () => window.clearTimeout(id)
  }, [heroMediaReady, reduceMotion])

  const brandStagger = useMemo<Variants>(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.02,
          delayChildren: reduceMotion ? 0 : 0.1,
        },
      },
    }),
    [reduceMotion],
  )

  const brandLetter: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: editorialEase },
    },
  }

  const wordVariant: Variants = {
    hidden: { opacity: 0, y: 32, rotateX: 14, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.72, ease: editorialEase },
    },
  }

  const supportingVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, delay: reduceMotion ? 0 : 0.35, ease: editorialEase },
    },
  }

  const revealState = curtainsOpen || reduceMotion ? 'visible' : 'hidden'

  const servicePhrase = useMemo(
    () => formatHeroServicePhrase(heroFocusServices),
    [],
  )

  const headlineRowContainer = (rowIndex: number): Variants => ({
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.052,
        delayChildren: reduceMotion ? 0 : 0.2 + rowIndex * 0.14,
      },
    },
  })

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlideKey}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: editorialEase }}
        >
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              ref={heroImgRef}
              src={heroImageUrl(slideIndex, 1920)}
              srcSet={heroImageSrcSet(slideIndex)}
              sizes="100vw"
              width={1920}
              height={1080}
              alt=""
              decoding="async"
              fetchPriority={slideIndex === 0 ? 'high' : 'low'}
              onLoad={() => markSlideLoaded(slideIndex)}
              onError={() => markSlideLoaded(slideIndex)}
              className={`object-cover w-full h-full absolute inset-0 -z-10 min-h-full object-[center_30%] sm:object-center ${
                reduceMotion ? '' : 'animate-hero-ken-burns'
              }`}
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-background/65 via-background/20 to-background/92"
            aria-hidden
          />
        </motion.div>
      </AnimatePresence>

      {!reduceMotion && (
        <>
          <motion.div
            className="pointer-events-none absolute left-0 top-0 z-[15] h-full w-1/2 origin-left bg-background"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: curtainsOpen ? 0 : 1 }}
            transition={{ duration: 1.08, ease: curtainEase }}
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute right-0 top-0 z-[15] h-full w-1/2 origin-right bg-background"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: curtainsOpen ? 0 : 1 }}
            transition={{ duration: 1.08, ease: curtainEase }}
            aria-hidden
          />
        </>
      )}

      <motion.div
        className="relative z-30 flex max-w-4xl flex-col items-center px-6 text-center text-white"
        style={{
          y: scrollLift,
          opacity: scrollFade,
          scale: scrollScale,
        }}
      >
        <div className="font-sans text-[0.68rem] font-medium uppercase tracking-[0.38em] text-white/60 sm:text-[0.72rem]">
          <motion.p
            className="inline-flex max-w-full flex-nowrap justify-center"
            variants={brandStagger}
            initial="hidden"
            animate={revealState}
            aria-label={HERO_BRAND_LINE}
          >
            {BRAND_CHARS.map((ch, i) => (
              <motion.span
                key={`${ch}-${i}`}
                variants={brandLetter}
                className="inline-block"
              >
                {ch === ' ' ? '\u00a0' : ch}
              </motion.span>
            ))}
          </motion.p>
        </div>

        <motion.h1
          className="mt-5 flex max-w-[min(92vw,44rem)] flex-col items-center gap-2 text-balance font-serif text-[clamp(1.55rem,5.2vw,3.65rem)] font-medium leading-[1.08] tracking-[-0.02em] text-white sm:mt-6 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-3 sm:gap-y-0 sm:leading-[1.06]"
          style={{ perspective: 1400 }}
        >
          {heroHeadlineWordRows.map((row, ri) => (
            <motion.span
              key={ri}
              className="inline-flex flex-wrap justify-center gap-x-2 gap-y-1 sm:flex-nowrap sm:gap-x-2.5"
              variants={headlineRowContainer(ri)}
              initial="hidden"
              animate={revealState}
            >
              {row.map((word, wi) => (
                <motion.span
                  key={`${ri}-${wi}-${word}`}
                  variants={wordVariant}
                  className="inline-block [transform-style:preserve-3d]"
                >
                  {word}
                </motion.span>
              ))}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="mt-7 max-w-xl text-pretty font-sans text-sm font-normal leading-relaxed text-white/85 sm:mt-8 sm:text-base"
          variants={supportingVariant}
          initial="hidden"
          animate={revealState}
        >
          Luxury photography for {servicePhrase} — based in {heroLocationPrimary}.{' '}
          {heroLocationSecondary}
        </motion.p>
      </motion.div>

      <motion.a
        href="#work"
        whileHover={{ y: -4, rotateX: 6, scale: 1.02 }}
        transition={premiumSpring}
        style={{
          transformPerspective: 1000,
          transformStyle: 'preserve-3d',
        }}
        className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/88"
        aria-label="Scroll to portfolio"
      >
        <motion.span
          className="text-[0.68rem] font-medium uppercase tracking-[0.26em] text-foreground/70"
          animate={
            reduceMotion
              ? undefined
              : { opacity: [0.4, 0.92, 0.4] }
          }
          transition={
            reduceMotion
              ? undefined
              : { duration: 4.4, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          Explore
        </motion.span>
        <motion.span
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, 6, 0],
                  opacity: [0.45, 0.9, 0.45],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 4.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
        >
          <ChevronDown className="size-7" strokeWidth={ICON_STROKE} aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  )
}
