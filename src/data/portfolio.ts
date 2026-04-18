export type PortfolioCategory =
  | 'Weddings'
  | 'Portraits'
  | 'Lifestyle'
  | 'Events'
  | 'Studio'

export type PortfolioItem = {
  id: string
  title: string
  category: PortfolioCategory
  year: number
  /** Unsplash photo id for responsive URLs */
  unsplashId: string
  alt: string
}

/** Curated Unsplash IDs — wedding / portrait / lifestyle photography */
export const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'Heritage Vows',
    category: 'Weddings',
    year: 2026,
    unsplashId: '1519741497674-611481863552',
    alt: 'Bride and groom in soft natural light',
  },
  {
    id: '2',
    title: 'Golden Hour Portrait',
    category: 'Portraits',
    year: 2026,
    unsplashId: '1534528741775-53994a69daeb',
    alt: 'Portrait of a woman in warm light',
  },
  {
    id: '3',
    title: 'Sunday Morning',
    category: 'Lifestyle',
    year: 2025,
    unsplashId: '1499996860823-5214fcc65f8f',
    alt: 'Family candid in a bright living room',
  },
  {
    id: '4',
    title: 'City Gala',
    category: 'Events',
    year: 2025,
    unsplashId: '1511556532299-8f662fc26c06',
    alt: 'Elegant event venue with chandeliers',
  },
  {
    id: '5',
    title: 'Studio Noir',
    category: 'Studio',
    year: 2026,
    unsplashId: '1604904612715-47bf9d9bc670',
    alt: 'High-contrast studio portrait',
  },
  {
    id: '6',
    title: 'Coastal Ceremony',
    category: 'Weddings',
    year: 2025,
    unsplashId: '1519741497674-611481863552',
    alt: 'Outdoor wedding by the sea',
  },
  {
    id: '7',
    title: 'Executive Profile',
    category: 'Portraits',
    year: 2026,
    unsplashId: '1560250097-0b93528c311a',
    alt: 'Professional headshot',
  },
  {
    id: '8',
    title: 'Editorial Street',
    category: 'Lifestyle',
    year: 2025,
    unsplashId: '1529626455594-4ff0802cfb7e',
    alt: 'Fashion-inspired lifestyle shot',
  },
  {
    id: '9',
    title: 'Anniversary Soirée',
    category: 'Events',
    year: 2026,
    unsplashId: '1511556532299-8f662fc26c06',
    alt: 'Guests at an evening celebration',
  },
  {
    id: '10',
    title: 'Minimal Still',
    category: 'Studio',
    year: 2025,
    unsplashId: '1522335789203-aabd1fc54bc9',
    alt: 'Minimal studio composition',
  },
  {
    id: '11',
    title: 'Garden Reception',
    category: 'Weddings',
    year: 2025,
    unsplashId: '1519741497674-611481863552',
    alt: 'Outdoor wedding reception tables',
  },
  {
    id: '12',
    title: 'New Chapter',
    category: 'Portraits',
    year: 2026,
    unsplashId: '1494790108377-be9c29b29330',
    alt: 'Soft portrait with natural smile',
  },
]

export function unsplashSrc(
  photoId: string,
  width: number,
  quality = 80,
): string {
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${width}&q=${quality}`
}

export function buildSrcSet(photoId: string): string {
  const w = [400, 800, 1200, 1600] as const
  return w
    .map((width) => `${unsplashSrc(photoId, width)} ${width}w`)
    .join(', ')
}
