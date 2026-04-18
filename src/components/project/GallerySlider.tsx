import { useCallback, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ProjectImage } from '../../data/projects'
import { buildSrcSet, unsplashSrc } from '../../data/portfolio'
import { ICON_STROKE } from '../../lib/lucideDefaults'

type GallerySliderProps = {
  images: ProjectImage[]
  variant: 'beforeAfter' | 'burst'
  label?: string
}

export function GallerySlider({ images, variant, label }: GallerySliderProps) {
  const [index, setIndex] = useState(0)
  const len = images.length

  const go = useCallback(
    (dir: -1 | 1) => {
      if (len === 0) return
      setIndex((i) => (i + dir + len * 10) % len)
    },
    [len],
  )

  if (len === 0) return null

  const current = images[Math.min(index, len - 1)]!
  const isBeforeAfter = variant === 'beforeAfter'

  return (
    <figure className="mx-auto w-full max-w-5xl">
      {(label || isBeforeAfter) && (
        <figcaption className="mb-4 flex items-center justify-between gap-3 px-1">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/45">
            {label ?? (isBeforeAfter ? 'Compare' : 'Sequence')}
          </span>
          {isBeforeAfter && len >= 2 && (
            <span className="rounded-full bg-foreground/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-foreground/55">
              {index === 0 ? 'Before' : 'After'}
            </span>
          )}
        </figcaption>
      )}

      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          boxShadow:
            'inset 0 0 0 1px rgb(255 255 255 / 0.05), inset 0 -40px 80px rgb(0 0 0 / 0.35)',
        }}
      >
        <div className="relative aspect-[16/10] w-full bg-foreground/[0.03] sm:aspect-[2/1]">
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={`${current.unsplashId}-${index}`}
              src={unsplashSrc(current.unsplashId, 1600)}
              srcSet={buildSrcSet(current.unsplashId)}
              sizes="(max-width: 1024px) 100vw, min(1120px, 90vw)"
              width={1600}
              height={1000}
              alt={current.alt}
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>

          {len > 1 && (
            <>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-3 px-4">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="pointer-events-auto glass-panel inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground/90 transition hover:bg-foreground/[0.1]"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="size-5" strokeWidth={ICON_STROKE} />
                </button>
                <div className="flex gap-1.5">
                  {images.map((im, i) => (
                    <button
                      key={im.unsplashId}
                      type="button"
                      className={`h-1.5 rounded-full transition-all ${
                        i === index
                          ? 'w-8 bg-foreground/85'
                          : 'w-1.5 bg-foreground/25 hover:bg-foreground/45'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => setIndex(i)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="pointer-events-auto glass-panel inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground/90 transition hover:bg-foreground/[0.1]"
                  aria-label="Next image"
                >
                  <ChevronRight className="size-5" strokeWidth={ICON_STROKE} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </figure>
  )
}
