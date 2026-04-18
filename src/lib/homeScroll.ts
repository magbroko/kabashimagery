/** Session key for restoring home scroll after returning from a project */
export const HOME_SCROLL_STORAGE_KEY = 'kabash:home-scroll-y'

export function saveHomeScrollPosition(): void {
  sessionStorage.setItem(HOME_SCROLL_STORAGE_KEY, String(window.scrollY))
}

export function takeHomeScrollRestore(): number | null {
  const raw = sessionStorage.getItem(HOME_SCROLL_STORAGE_KEY)
  if (raw == null) return null
  sessionStorage.removeItem(HOME_SCROLL_STORAGE_KEY)
  const n = parseInt(raw, 10)
  return Number.isFinite(n) ? n : null
}
