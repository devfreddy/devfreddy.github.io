import HeroSection from '../components/HeroSection'

const HomePage = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <HeroSection scrollToSection={scrollToSection} />
  )
}

export default HomePage
