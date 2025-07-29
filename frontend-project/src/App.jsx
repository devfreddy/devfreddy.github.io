import { Box } from '@chakra-ui/react'
import ConstructionBanner from './components/ConstructionBanner'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ProjectsSection from './components/ProjectsSection'
import ExperienceSection from './components/ExperienceSection'
import { useBannerState } from './hooks/useBannerState'

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
      <HeroSection scrollToSection={scrollToSection} showBanner={showBanner} />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
    </Box>
  )
}

export default App
