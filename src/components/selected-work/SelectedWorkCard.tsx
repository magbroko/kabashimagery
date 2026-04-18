import { Link } from 'react-router-dom'
import { motion, useTransform, type MotionValue } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { Project } from '../../data/projects'
import { buildSrcSet, unsplashSrc } from '../../data/portfolio'
import { saveHomeScrollPosition } from '../../lib/homeScroll'
import { projectCoverLayoutId } from '../../lib/projectLayout'

type SelectedWorkCardProps = {
  project: Project
  index: number
  scrollYProgress: MotionValue<number>
  aspectClass: string
  priority?: boolean
}

export function SelectedWorkCard({
  project,
  index,
  scrollYProgress,
  aspectClass,
  priority = false,
}: SelectedWorkCardProps) {
  const [loaded, setLoaded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [photoId, setPhotoId] = useState(project.thumbnail.unsplashId)
  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    setPhotoId(project.thumbnail.unsplashId)
    setLoaded(false)
  }, [project.id, project.thumbnail.unsplashId])

  /** Cached images often never fire `onLoad` after the handler is attached. */
  useLayoutEffect(() => {
    const img = imgRef.current
    if (img?.complete && img.naturalHeight > 0) setLoaded(true)
  }, [photoId])

  const stagger = (index % 5) * 0.22 + 0.55
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [48 * stagger, -48 * stagger],
  )

  const title = project.title
  const letters = title.split('')

  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.01, margin: '0px 0px 120px 0px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-w-0 [transform-style:preserve-3d]"
    >
      <motion.div
        style={{ y }}
        className={`relative w-full min-h-[220px] overflow-hidden rounded-2xl bg-neutral-900 [transform-style:preserve-3d] ${aspectClass}`}
      >
        <Link
          to={`/work/${project.id}`}
          data-cursor-project="true"
          className="group absolute inset-0 z-0 block overflow-hidden rounded-[inherit] bg-neutral-900 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          onClick={() => saveHomeScrollPosition()}
          aria-label={`View project ${project.title}`}
        >
          {/* Frameless depth: inset shadow only */}
          <div
            className="pointer-events-none absolute inset-0 z-20 rounded-[inherit]"
            style={{
              boxShadow:
                'inset 0 0 0 1px rgb(255 255 255 / 0.04), inset 0 -28px 48px rgb(0 0 0 / 0.45), inset 0 1px 0 rgb(255 255 255 / 0.05)',
            }}
            aria-hidden
          />

          <div
            className="skeleton-shimmer absolute inset-0 z-[1] rounded-[inherit] bg-foreground/[0.04] blur-[1px]"
            aria-hidden
            style={{ display: loaded ? 'none' : 'block' }}
          />

          <motion.div
            className="relative z-[2] h-full w-full overflow-hidden rounded-[inherit] bg-neutral-900"
            style={{
              perspective: '1200px',
              transformStyle: 'preserve-3d',
            }}
            whileHover={{ scale: 1 }}
          >
            <motion.img
              ref={imgRef}
              layoutId={projectCoverLayoutId(project.id)}
              src={unsplashSrc(photoId, 900)}
              srcSet={buildSrcSet(photoId)}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              width={900}
              height={1200}
              alt={project.thumbnail.alt}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={priority ? 'high' : 'low'}
              className={`h-full w-full object-cover transition-opacity duration-500 ease-out ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                willChange: 'transform',
                transformStyle: 'preserve-3d',
                transformOrigin: 'center center',
              }}
              transition={{
                layout: { type: 'spring', stiffness: 320, damping: 38 },
                type: 'spring',
                damping: 22,
                stiffness: 100,
              }}
              animate={{
                scale: hovered ? 1.07 : 1,
                rotateX: hovered ? -1.25 : 0,
                rotateY: hovered ? 1.75 : 0,
                z: hovered ? 12 : 0,
              }}
              onLoad={() => setLoaded(true)}
              onError={() => {
                if (photoId !== '1519741497674-611481863552') {
                  setPhotoId('1519741497674-611481863552')
                  return
                }
                setLoaded(true)
              }}
            />
          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-0 z-10 bg-background/0"
            animate={{ backgroundColor: hovered ? 'rgb(5 5 5 / 0.52)' : 'rgb(5 5 5 / 0)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          />

          <div className="pointer-events-none absolute inset-0 z-30 flex items-end justify-center px-5 pb-7 md:pb-9">
            <div className="overflow-hidden text-center">
              <motion.p
                className="font-serif text-[1.35rem] leading-tight text-foreground drop-shadow-[0_2px_24px_rgba(0,0,0,0.65)] sm:text-2xl md:text-[1.65rem]"
                aria-hidden
                animate={
                  hovered
                    ? { letterSpacing: '0.04em', opacity: 1, y: 0 }
                    : { letterSpacing: '0.22em', opacity: 0, y: 8 }
                }
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {letters.map((ch, i) => (
                  <motion.span
                    key={`${title}-${i}`}
                    className="inline-block"
                    animate={
                      hovered
                        ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                        : { opacity: 0, y: 10, filter: 'blur(4px)' }
                    }
                    transition={{
                      duration: 0.4,
                      delay: hovered ? i * 0.025 : 0,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {ch === ' ' ? '\u00a0' : ch}
                  </motion.span>
                ))}
              </motion.p>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.li>
  )
}
