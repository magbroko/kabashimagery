import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { SelectedWork } from '../components/selected-work/SelectedWork'
import { Services } from '../components/Services'
import { Process } from '../components/Process'
import { ContactForm } from '../components/ContactForm'
import { takeHomeScrollRestore } from '../lib/homeScroll'

export function HomePage() {
  const location = useLocation()

  useLayoutEffect(() => {
    const y = takeHomeScrollRestore()
    if (y != null) {
      window.scrollTo(0, y)
      return
    }

    if (location.hash.length > 1) {
      const id = location.hash.slice(1)
      queueMicrotask(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      })
    }
  }, [location.hash, location.pathname])

  return (
    <>
      <Hero />
      <SelectedWork />
      <Services />
      <Process />
      <ContactForm />
    </>
  )
}
