import { Box } from '@chakra-ui/react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
// import ProjectsSection from './components/ProjectsSection'
import ExperienceSection from './components/ExperienceSection'
import CocktailsPageBasic from './components/CocktailsPageBasic'
import MusingsRouter from './components/MusingsPage'
import ExperimentsRouter from './components/ExperimentsPage'
import Dash0Test from './components/Dash0Test'

// Import Dash0 tracking functions
import { sendEvent } from '@dash0/sdk-web'

const HomePage = ({ scrollToSection }) => (
  <>
    <HeroSection scrollToSection={scrollToSection} />
    <AboutSection />
    {/* <ProjectsSection /> */}
    <ExperienceSection />
  </>
)

function App() {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  // Track page views on route change
  useEffect(() => {
    // Track page view with Dash0
    sendEvent('page_view', {
      path: location.pathname,
      search: location.search,
      hash: location.hash,
      timestamp: new Date().toISOString(),
    })

    // Track custom event for navigation
    sendEvent('navigation', {
      from: location.pathname,
      timestamp: new Date().toISOString(),
    })
  }, [location.pathname, location.search, location.hash])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Box>
      <Navbar scrollToSection={scrollToSection} />
      <Dash0Test />
      <Routes>
        <Route path="/" element={<HomePage scrollToSection={scrollToSection} />} />
        <Route path="/cocktails" element={<CocktailsPageBasic />} />
        <Route path="/musings/*" element={<MusingsRouter />} />
        <Route path="/experiments/*" element={<ExperimentsRouter />} />
      </Routes>
    </Box>
  )
}

export default App
