import type { PortfolioCategory } from './portfolio'

/** Single image reference (Unsplash photo id, without `photo-` prefix in URL builder) */
export type ProjectImage = {
  unsplashId: string
  alt: string
}

export type GalleryImage =
  | {
      type: 'fullBleed'
      image: ProjectImage
      caption?: string
    }
  | {
      type: 'diptych'
      left: ProjectImage
      right: ProjectImage
    }
  | {
      type: 'slider'
      variant: 'beforeAfter' | 'burst'
      label?: string
      images: ProjectImage[]
    }

export type Project = {
  id: string
  title: string
  category: PortfolioCategory
  year: number
  /** Primary thumbnail / shared-layout hero source */
  thumbnail: ProjectImage
  /** Short line for cards */
  tagline: string
  /** Long-form creative vision */
  description: string
  galleryImages: GalleryImage[]
}

export const projects: Project[] = [
  {
    id: 'heritage-vows',
    title: 'Heritage Vows',
    category: 'Weddings',
    year: 2026,
    thumbnail: {
      unsplashId: '1519741497674-611481863552',
      alt: 'Bride and groom in soft natural light',
    },
    tagline: 'Ceremony in candlelit stone, edited for timeless warmth.',
    description:
      'We approached this day as a sequence of rituals: light finding the aisle, hands meeting at the veil, and quiet laughter in the corridor after. The creative vision was editorial stillness — fewer poses, more breath between frames — so the final set feels like memory rather than staging.',
    galleryImages: [
      {
        type: 'fullBleed',
        image: {
          unsplashId: '1519741497674-611481863552',
          alt: 'Open-air celebration by the water',
        },
        caption: 'Processional — late afternoon coastal haze.',
      },
      {
        type: 'diptych',
        left: {
          unsplashId: '1519741497674-611481863552',
          alt: 'Couple portrait in warm light',
        },
        right: {
          unsplashId: '1529626455594-4ff0802cfb7e',
          alt: 'Editorial lifestyle texture',
        },
      },
      {
        type: 'slider',
        variant: 'beforeAfter',
        label: 'Color grade',
        images: [
          {
            unsplashId: '1519741497674-611481863552',
            alt: 'Ceremony before grade',
          },
          {
            unsplashId: '1604904612715-47bf9d9bc670',
            alt: 'Ceremony after grade',
          },
        ],
      },
      {
        type: 'slider',
        variant: 'burst',
        label: 'Confetti burst',
        images: [
          { unsplashId: '1511556532299-8f662fc26c06', alt: 'Exit — frame 1' },
          { unsplashId: '1519741497674-611481863552', alt: 'Exit — frame 2' },
          { unsplashId: '1529626455594-4ff0802cfb7e', alt: 'Exit — frame 3' },
        ],
      },
    ],
  },
  {
    id: 'golden-hour-portrait',
    title: 'Golden Hour Portrait',
    category: 'Portraits',
    year: 2026,
    thumbnail: {
      unsplashId: '1534528741775-53994a69daeb',
      alt: 'Portrait of a woman in warm light',
    },
    tagline: 'Skin tones held in a narrow luminance range for cream and shadow.',
    description:
      'This session was about proximity and patience — windows as softboxes, movement as punctuation. The narrative prioritizes tactile detail: stray hair, linen texture, the moment eyes relax between instructions.',
    galleryImages: [
      {
        type: 'fullBleed',
        image: {
          unsplashId: '1531746020798-e6953c6e8e04',
          alt: 'Soft portrait with natural expression',
        },
      },
      {
        type: 'diptych',
        left: {
          unsplashId: '1534528741775-53994a69daeb',
          alt: 'Three-quarter portrait',
        },
        right: {
          unsplashId: '1560250097-0b93528c311a',
          alt: 'Executive calm',
        },
      },
      {
        type: 'slider',
        variant: 'burst',
        label: 'Micro-movements',
        images: [
          { unsplashId: '1534528741775-53994a69daeb', alt: 'Frame A' },
          { unsplashId: '1494790108377-be9c29b29330', alt: 'Frame B' },
        ],
      },
    ],
  },
  {
    id: 'sunday-morning',
    title: 'Sunday Morning',
    category: 'Lifestyle',
    year: 2025,
    thumbnail: {
      unsplashId: '1499996860823-5214fcc65f8f',
      alt: 'Family candid in a bright living room',
    },
    tagline: 'Domestic light, slow shutter cadence, honest clutter.',
    description:
      'We treated the home as a single set — kitchen to sofa as one continuous scene. The edit leans warm-neutral so everyday materials read true, and small gestures carry the story instead of forced choreography.',
    galleryImages: [
      {
        type: 'fullBleed',
        image: {
          unsplashId: '1499996860823-5214fcc65f8f',
          alt: 'Family at breakfast table',
        },
        caption: 'Ambient north light, exposure biased for highlights.',
      },
      {
        type: 'diptych',
        left: {
          unsplashId: '1529626455594-4ff0802cfb7e',
          alt: 'Street-style lifestyle',
        },
        right: {
          unsplashId: '1499996860823-5214fcc65f8f',
          alt: 'Indoor candid',
        },
      },
      {
        type: 'slider',
        variant: 'beforeAfter',
        label: 'Ambient lift',
        images: [
          {
            unsplashId: '1499996860823-5214fcc65f8f',
            alt: 'Scene flat',
          },
          {
            unsplashId: '1529626455594-4ff0802cfb7e',
            alt: 'Scene lifted',
          },
        ],
      },
    ],
  },
  {
    id: 'city-gala',
    title: 'City Gala',
    category: 'Events',
    year: 2025,
    thumbnail: {
      unsplashId: '1511556532299-8f662fc26c06',
      alt: 'Elegant event venue with chandeliers',
    },
    tagline: 'Tungsten mixed with LED — balance without sterile neutrals.',
    description:
      'Ballrooms demand restraint in color and confidence in crop. We chased reflections as compositional anchors and used negative space to let gowns and architecture breathe.',
    galleryImages: [
      {
        type: 'fullBleed',
        image: {
          unsplashId: '1511556532299-8f662fc26c06',
          alt: 'Evening celebration',
        },
      },
      {
        type: 'diptych',
        left: {
          unsplashId: '1511556532299-8f662fc26c06',
          alt: 'Venue architecture',
        },
        right: {
          unsplashId: '1511556532299-8f662fc26c06',
          alt: 'Guests mingling',
        },
      },
      {
        type: 'slider',
        variant: 'burst',
        label: 'Candids',
        images: [
          { unsplashId: '1511556532299-8f662fc26c06', alt: 'Wide' },
          { unsplashId: '1511556532299-8f662fc26c06', alt: 'Tight' },
          { unsplashId: '1519741497674-611481863552', alt: 'Toast' },
        ],
      },
    ],
  },
  {
    id: 'studio-noir',
    title: 'Studio Noir',
    category: 'Studio',
    year: 2026,
    thumbnail: {
      unsplashId: '1604904612715-47bf9d9bc670',
      alt: 'High-contrast studio portrait',
    },
    tagline: 'Single key, deep flag, micro-contrast for fabric and iris.',
    description:
      'A study in silhouette and texture — metering for specular limits, then letting shadows pool intentionally. The brief was sculptural, almost object-like, while keeping humanity in the eyes.',
    galleryImages: [
      {
        type: 'fullBleed',
        image: {
          unsplashId: '1522335789203-aabd1fc54bc9',
          alt: 'Minimal studio composition',
        },
      },
      {
        type: 'diptych',
        left: {
          unsplashId: '1604904612715-47bf9d9bc670',
          alt: 'Shadow portrait',
        },
        right: {
          unsplashId: '1522335789203-aabd1fc54bc9',
          alt: 'Negative space study',
        },
      },
      {
        type: 'slider',
        variant: 'beforeAfter',
        label: 'Curve / density',
        images: [
          { unsplashId: '1604904612715-47bf9d9bc670', alt: 'Flat capture' },
          { unsplashId: '1522335789203-aabd1fc54bc9', alt: 'Finished tone' },
        ],
      },
    ],
  },
  {
    id: 'coastal-ceremony',
    title: 'Coastal Ceremony',
    category: 'Weddings',
    year: 2025,
    thumbnail: {
      unsplashId: '1519741497674-611481863552',
      alt: 'Outdoor wedding by the sea',
    },
    tagline: 'Wind as a compositional element — wide anchors, tight emotion.',
    description:
      'Salt air and shifting cloud created unreliable contrast; we prioritized consistent skin by exposing for faces and accepting blown sky when narrative demanded openness. The gallery pairs epic distance with intimate hands.',
    galleryImages: [
      {
        type: 'fullBleed',
        image: {
          unsplashId: '1519741497674-611481863552',
          alt: 'Seaside vows',
        },
      },
      {
        type: 'diptych',
        left: {
          unsplashId: '1519741497674-611481863552',
          alt: 'Portrait on dunes',
        },
        right: {
          unsplashId: '1511556532299-8f662fc26c06',
          alt: 'Recessional energy',
        },
      },
      {
        type: 'slider',
        variant: 'burst',
        label: 'Processional line',
        images: [
          { unsplashId: '1519741497674-611481863552', alt: 'Aisle 1' },
          { unsplashId: '1519741497674-611481863552', alt: 'Aisle 2' },
        ],
      },
    ],
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

/** Collect every unsplash id used by a project for preloading */
export function collectProjectImageIds(project: Project): string[] {
  const ids = new Set<string>()
  ids.add(project.thumbnail.unsplashId)
  for (const block of project.galleryImages) {
    if (block.type === 'fullBleed') {
      ids.add(block.image.unsplashId)
    } else if (block.type === 'diptych') {
      ids.add(block.left.unsplashId)
      ids.add(block.right.unsplashId)
    } else {
      block.images.forEach((im) => ids.add(im.unsplashId))
    }
  }
  return [...ids]
}
