import { useEffect, useLayoutEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import {
  collectProjectImageIds,
  getProjectById,
  type GalleryImage,
} from '../../data/projects'
import { buildSrcSet, unsplashSrc } from '../../data/portfolio'
import { projectCoverLayoutId } from '../../lib/projectLayout'
import { GallerySlider } from './GallerySlider'
import { ICON_STROKE } from '../../lib/lucideDefaults'

function preloadUnsplash(ids: string[]) {
  const widths = [800, 1200, 1600]
  for (const id of ids) {
    for (const w of widths) {
      const url = unsplashSrc(id, w)
      const img = new Image()
      img.decoding = 'async'
      img.src = url
    }
  }
}

function GalleryBlockView({ block }: { block: GalleryImage }) {
  if (block.type === 'fullBleed') {
    return (
      <div className="w-full">
        {block.caption && (
          <p className="mb-4 px-1 text-xs font-medium uppercase tracking-[0.2em] text-foreground/40">
            {block.caption}
          </p>
        )}
        <div
          className="overflow-hidden rounded-2xl"
          style={{
            boxShadow:
              'inset 0 0 0 1px rgb(255 255 255 / 0.05), inset 0 -32px 64px rgb(0 0 0 / 0.4)',
          }}
        >
          <img
            src={unsplashSrc(block.image.unsplashId, 1600)}
            srcSet={buildSrcSet(block.image.unsplashId)}
            sizes="100vw"
            width={1600}
            height={1067}
            alt={block.image.alt}
            loading="lazy"
            decoding="async"
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    )
  }

  if (block.type === 'diptych') {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8">
        {[block.left, block.right].map((im) => (
          <div
            key={im.unsplashId}
            className="overflow-hidden rounded-2xl"
            style={{
              boxShadow:
                'inset 0 0 0 1px rgb(255 255 255 / 0.05), inset 0 -28px 56px rgb(0 0 0 / 0.38)',
            }}
          >
            <img
              src={unsplashSrc(im.unsplashId, 1200)}
              srcSet={buildSrcSet(im.unsplashId)}
              sizes="(max-width: 640px) 100vw, 50vw"
              width={1200}
              height={1500}
              alt={im.alt}
              loading="lazy"
              decoding="async"
              className="aspect-[3/4] w-full object-cover sm:aspect-[4/5]"
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <GallerySlider
      images={block.images}
      variant={block.variant}
      label={block.label}
    />
  )
}

export function ProjectDetail() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const project = projectId ? getProjectById(projectId) : undefined

  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-9%', '14%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25])

  useEffect(() => {
    if (!project) return
    preloadUnsplash(collectProjectImageIds(project))
  }, [project])

  useLayoutEffect(() => {
    if (!projectId) return
    window.scrollTo(0, 0)
  }, [projectId])

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  if (!project) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-32"
      >
        <p className="font-serif text-2xl text-foreground">Project not found</p>
        <Link
          to="/"
          className="mt-6 text-sm font-medium text-accent-bright underline-offset-4 hover:underline"
        >
          Return home
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen pb-28 pt-24 md:pb-36"
    >
      <motion.button
        type="button"
        onClick={handleBack}
        className="glass-panel fixed left-5 top-24 z-40 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-foreground/90 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.85)] transition hover:bg-foreground/[0.08] md:left-8"
        aria-label="Back to portfolio"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 0.45 }}
      >
        <ArrowLeft className="size-4" strokeWidth={ICON_STROKE} aria-hidden />
        Back
      </motion.button>

      <div ref={heroRef} className="relative h-[min(78vh,820px)] w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 h-[118%] w-full will-change-transform"
          style={{ y: imageY }}
        >
          <motion.div
            className="relative h-full w-full"
            style={{ opacity: heroOpacity }}
          >
            <motion.img
              layoutId={projectCoverLayoutId(project.id)}
              src={unsplashSrc(project.thumbnail.unsplashId, 2000)}
              srcSet={buildSrcSet(project.thumbnail.unsplashId)}
              sizes="100vw"
              width={2000}
              height={1333}
              alt={project.thumbnail.alt}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full scale-105 object-cover"
              transition={{ type: 'spring', stiffness: 320, damping: 38 }}
            />
          </motion.div>
        </motion.div>

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"
          aria-hidden
        />

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 pt-24 md:px-12 md:pb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="text-xs font-medium uppercase tracking-[0.35em] text-foreground/55"
          >
            {project.category} · {project.year}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 max-w-3xl font-serif text-4xl leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl"
          >
            {project.title}
          </motion.h1>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 md:px-10 md:pt-20">
        <section
          className="grid grid-cols-1 gap-12 border-b border-foreground/[0.08] pb-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] md:gap-16 md:pb-20"
          aria-labelledby="project-brief-heading"
        >
          <div>
            <h2 id="project-brief-heading" className="sr-only">
              Project brief
            </h2>
            <p className="font-serif text-2xl text-foreground md:text-[1.75rem]">
              {project.title}
            </p>
            <p className="mt-3 text-sm uppercase tracking-[0.25em] text-foreground/45">
              {project.category}
            </p>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-foreground/70 md:text-[1.05rem]">
            <p className="text-pretty">{project.description}</p>
            <p className="text-pretty text-foreground/50">{project.tagline}</p>
          </div>
        </section>

        <div className="mt-20 space-y-20 md:mt-24 md:space-y-28">
          {project.galleryImages.map((block, i) => (
            <motion.div
              key={`${project.id}-block-${i}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <GalleryBlockView block={block} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
