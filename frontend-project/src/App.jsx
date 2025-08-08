import { Box } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import ConstructionBanner from './components/ConstructionBanner'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
// import ProjectsSection from './components/ProjectsSection'
import ExperienceSection from './components/ExperienceSection'
import CocktailsPageBasic from './components/CocktailsPageBasic'
import { useBannerState } from './hooks/useBannerState'

const HomePage = ({ showBanner, scrollToSection }) => (
  <>
    <HeroSection scrollToSection={scrollToSection} showBanner={showBanner} />
    <AboutSection />
    {/* <ProjectsSection /> */}
    <ExperienceSection />
  </>
)

function App() {
  const showBanner = useBannerState()

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Box>
      <ConstructionBanner />
      <Navbar scrollToSection={scrollToSection} showBanner={showBanner} />
      <Routes>
        <Route path="/" element={<HomePage showBanner={showBanner} scrollToSection={scrollToSection} />} />
        <Route path="/cocktails" element={<CocktailsPageBasic />} />
      </Routes>
    </Box>
  )
}

export default App
