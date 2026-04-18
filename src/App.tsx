import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { Navigate, useLocation, useRoutes } from 'react-router-dom'
import { CustomCursor } from './components/CustomCursor'
import { Header } from './components/Header'
import { ProjectDetail } from './components/project/ProjectDetail'
import { WhatsAppButton } from './components/WhatsAppButton'
import { pageTransitionVariants } from './lib/motionPresets'
import { HomePage } from './pages/HomePage'

function RouteTransitions() {
  const location = useLocation()
  const element = useRoutes(
    [
      { path: '/', element: <HomePage /> },
      { path: '/work/:projectId', element: <ProjectDetail /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
    location,
  )

  return (
    <LayoutGroup id="portfolio-layout">
      <div className="relative min-h-screen" style={{ perspective: '1400px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative min-h-screen [transform-style:preserve-3d]"
            style={{ transformOrigin: '50% 0%', transformStyle: 'preserve-3d' }}
          >
            {element}
          </motion.div>
        </AnimatePresence>
      </div>
    </LayoutGroup>
  )
}

function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-background"
      >
        Skip to main content
      </a>
      <CustomCursor />
      <Header />
      <motion.main
        id="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'spring', damping: 22, stiffness: 100 }}
      >
        <RouteTransitions />
      </motion.main>
      <footer className="border-t border-foreground/[0.08] px-6 py-14 text-center text-sm text-foreground/45 sm:px-8 md:px-10">
        <p>
          © {new Date().getFullYear()} Kabash Imagery Studio. All rights reserved.
        </p>
      </footer>
      <WhatsAppButton />
    </>
  )
}

export default App
