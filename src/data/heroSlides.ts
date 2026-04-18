/**
 * Hero imagery — full Unsplash URLs (luxury / editorial).
 * `heroImageUrl` / `heroImageSrcSet` swap the `w=` query for responsive srcset.
 */
export const heroSlideImageUrls = [
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2560&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2560&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2560&auto=format&fit=crop',
] as const

/** @param slideIndex — index into `heroSlideImageUrls` */
export function heroImageUrl(slideIndex: number, width: number): string {
  const base = heroSlideImageUrls[slideIndex]
  if (!base) {
    return heroSlideImageUrls[0].replace(/w=\d+/, `w=${width}`)
  }
  return base.replace(/w=\d+/, `w=${width}`)
}

/** @param slideIndex — index into `heroSlideImageUrls` */
export function heroImageSrcSet(slideIndex: number): string {
  const widths = [640, 960, 1280, 1600, 1920, 2560] as const
  return widths.map((w) => `${heroImageUrl(slideIndex, w)} ${w}w`).join(', ')
}
