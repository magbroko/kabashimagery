/** Editorial hero copy — single source for headline, brand line, and service emphasis. */

export const HERO_BRAND_LINE = 'KABASH IMAGERY'

/** Display as two sentences for rhythm; serif, editorial. */
export const HERO_HEADLINE = 'Capturing moments. Creating legacies.'

/** Word groups per line — keeps stagger + line breaks aligned with `HERO_HEADLINE`. */
export const heroHeadlineWordRows: readonly (readonly string[])[] = [
  ['Capturing', 'moments.'],
  ['Creating', 'legacies.'],
] as const

/**
 * Services called out in the hero supporting line (mapped for easy updates).
 * Rendered with natural-language joining (Oxford comma).
 */
export const heroFocusServices = [
  'weddings',
  'portraits',
  'celebrations',
] as const

export type HeroFocusService = (typeof heroFocusServices)[number]

export const heroLocationPrimary = 'Osubi, Delta State'
export const heroLocationSecondary = 'Sessions across Nigeria by appointment.'

export function formatHeroServicePhrase(services: readonly string[]): string {
  if (services.length === 0) return ''
  if (services.length === 1) return services[0]
  if (services.length === 2) return `${services[0]} and ${services[1]}`
  return `${services.slice(0, -1).join(', ')}, and ${services[services.length - 1]}`
}
