import { Box } from '@chakra-ui/react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import ConstructionBanner from './components/ConstructionBanner'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
// import ProjectsSection from './components/ProjectsSection'
import ExperienceSection from './components/ExperienceSection'
import CocktailsPageBasic from './components/CocktailsPageBasic'

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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Box>
      <Navbar scrollToSection={scrollToSection} />
      <Routes>
        <Route path="/" element={<HomePage scrollToSection={scrollToSection} />} />
        <Route path="/cocktails" element={<CocktailsPageBasic />} />
      </Routes>
      <ConstructionBanner />
    </Box>
  )
}

export default App
