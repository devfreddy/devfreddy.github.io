import { Box, Flex, HStack, Link, IconButton, VStack } from '@chakra-ui/react'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { ColorModeButton } from './ui/color-mode'
import { useEffect, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useDash0Tracking } from '../hooks/useDash0Tracking'

const Navbar = ({ scrollToSection }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const isHomePage = location.pathname === '/'
  const [isOpen, setIsOpen] = useState(false)
  const { trackNavigation, trackButtonClick } = useDash0Tracking()

  // Handle hash navigation when landing on homepage
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const sectionId = location.hash.substring(1)
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [location])

  const handleSectionClick = (sectionId) => {
    // Track navigation to section
    trackNavigation(`#${sectionId}`, {
      section: sectionId,
      isHomePage,
      source: 'navbar'
    })

    if (isHomePage) {
      scrollToSection(sectionId)
    } else {
      navigate(`/#${sectionId}`)
    }
    setIsOpen(false)
  }

  return (
    <>
      <Box
        position="fixed"
        top="0"
        left={0}
        right={0}
        bg={{ base: 'white', _dark: 'gray.800' }}
        borderBottom="1px"
        borderColor={{ base: 'gray.200', _dark: 'gray.700' }}
        zIndex={1000}
        px={4}
        py={3}
      >
        <Flex maxW="1200px" mx="auto" justify="space-between" align="center">
          <Link
            as={RouterLink}
            to="/"
            fontSize="xl"
            fontWeight="bold"
            color={{ base: 'gray.800', _dark: 'white' }}
            _hover={{ textDecoration: 'none', color: { base: 'gray.600', _dark: 'gray.300' } }}
          >
            DevFreddy
          </Link>

          {/* Desktop Menu */}
          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            {isHomePage ? (
              <>
                <Link
                  onClick={() => scrollToSection('home')}
                  cursor="pointer"
                  fontWeight="medium"
                  color={{ base: 'gray.600', _dark: 'gray.300' }}
                  _hover={{ color: 'blue.500', textDecoration: 'none' }}
                  transition="color 0.2s"
                >
                  Home
                </Link>
                <Link
                  onClick={() => scrollToSection('about')}
                  cursor="pointer"
                  fontWeight="medium"
                  color={{ base: 'gray.600', _dark: 'gray.300' }}
                  _hover={{ color: 'blue.500', textDecoration: 'none' }}
                  transition="color 0.2s"
                >
                  About
                </Link>
                <Link
                  onClick={() => scrollToSection('experience')}
                  cursor="pointer"
                  fontWeight="medium"
                  color={{ base: 'gray.600', _dark: 'gray.300' }}
                  _hover={{ color: 'blue.500', textDecoration: 'none' }}
                  transition="color 0.2s"
                >
                  Experience
                </Link>
                <Link
                  as={RouterLink}
                  to="/musings"
                  fontWeight="medium"
                  color={{ base: 'gray.600', _dark: 'gray.300' }}
                  _hover={{ color: 'blue.500', textDecoration: 'none' }}
                  transition="color 0.2s"
                >
                  Musings
                </Link>
                <Link
                  as={RouterLink}
                  to="/experiments"
                  fontWeight="medium"
                  color={{ base: 'gray.600', _dark: 'gray.300' }}
                  _hover={{ color: 'blue.500', textDecoration: 'none' }}
                  transition="color 0.2s"
                >
                  Experiments
                </Link>
              </>
            ) : (
              <>
                <Link
                  as={RouterLink}
                  to="/"
                  fontWeight="medium"
                  color={{ base: 'gray.600', _dark: 'gray.300' }}
                  _hover={{ color: 'blue.500', textDecoration: 'none' }}
                  transition="color 0.2s"
                >
                  Home
                </Link>
                <Link
                  onClick={() => handleSectionClick('about')}
                  cursor="pointer"
                  fontWeight="medium"
                  color={{ base: 'gray.600', _dark: 'gray.300' }}
                  _hover={{ color: 'blue.500', textDecoration: 'none' }}
                  transition="color 0.2s"
                >
                  About
                </Link>
                <Link
                  onClick={() => handleSectionClick('experience')}
                  cursor="pointer"
                  fontWeight="medium"
                  color={{ base: 'gray.600', _dark: 'gray.300' }}
                  _hover={{ color: 'blue.500', textDecoration: 'none' }}
                  transition="color 0.2s"
                >
                  Experience
                </Link>
                <Link
                  as={RouterLink}
                  to="/musings"
                  fontWeight="medium"
                  color={location.pathname.startsWith('/musings') ? 'blue.500' : { base: 'gray.600', _dark: 'gray.300' }}
                  _hover={{ color: 'blue.500', textDecoration: 'none' }}
                  transition="color 0.2s"
                >
                  Musings
                </Link>
                <Link
                  as={RouterLink}
                  to="/experiments"
                  fontWeight="medium"
                  color={location.pathname.startsWith('/experiments') ? 'blue.500' : { base: 'gray.600', _dark: 'gray.300' }}
                  _hover={{ color: 'blue.500', textDecoration: 'none' }}
                  transition="color 0.2s"
                >
                  Experiments
                </Link>
              </>
            )}

            <ColorModeButton
              color={{ base: 'gray.600', _dark: 'gray.700' }}
              bg={{ base: 'gray.300', _dark: 'orange.200' }}
              _hover={{
                color: { base: 'blue.500', _dark: 'gray.800' },
                bg: { base: 'gray.400', _dark: 'orange.300' }
              }}
              px={3}
              h="32px"
            />
          </HStack>

          {/* Mobile Menu Button */}
          <HStack spacing={2} display={{ base: 'flex', md: 'none' }}>
            <ColorModeButton
              color={{ base: 'gray.600', _dark: 'gray.700' }}
              bg={{ base: 'gray.300', _dark: 'orange.200' }}
              _hover={{
                color: { base: 'blue.500', _dark: 'gray.800' },
                bg: { base: 'gray.400', _dark: 'orange.300' }
              }}
              px={3}
              h="32px"
            />
            <IconButton
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={() => {
                trackButtonClick('mobile-menu-toggle', {
                  isOpen: !isOpen,
                  location: location.pathname
                })
                setIsOpen(!isOpen)
              }}
              color={{ base: 'gray.800', _dark: 'gray.100' }}
              bg={{ base: 'gray.100', _dark: 'gray.600' }}
              _hover={{
                color: { base: 'gray.900', _dark: 'white' },
                bg: { base: 'gray.200', _dark: 'gray.500' }
              }}
              px={3}
              h="32px"
              fontSize="18px"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </IconButton>
          </HStack>
        </Flex>
      </Box>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <Box
          position="fixed"
          top="57px"
          right={0}
          zIndex={999}
          display={{ base: 'block', md: 'none' }}
        >
          <VStack
            spacing={0}
            align="stretch"
            bg={{ base: 'white', _dark: 'gray.800' }}
            border="1px"
            borderColor={{ base: 'gray.200', _dark: 'gray.700' }}
            borderRadius="md"
            py={2}
            mr={4}
            mt={1}
            boxShadow="lg"
          >
            {isHomePage ? (
              <>
                <Link
                  onClick={() => handleSectionClick('home')}
                  cursor="pointer"
                  fontWeight="medium"
                  color={{ base: 'gray.700', _dark: 'gray.200' }}
                  _hover={{ bg: { base: 'gray.50', _dark: 'gray.700' }, color: 'blue.500' }}
                  py={3}
                  px={4}
                  transition="all 0.2s"
                  textAlign="right"
                >
                  Home
                </Link>
                <Link
                  onClick={() => handleSectionClick('about')}
                  cursor="pointer"
                  fontWeight="medium"
                  color={{ base: 'gray.700', _dark: 'gray.200' }}
                  _hover={{ bg: { base: 'gray.50', _dark: 'gray.700' }, color: 'blue.500' }}
                  py={3}
                  px={4}
                  transition="all 0.2s"
                  textAlign="right"
                >
                  About
                </Link>
                <Link
                  onClick={() => handleSectionClick('experience')}
                  cursor="pointer"
                  fontWeight="medium"
                  color={{ base: 'gray.700', _dark: 'gray.200' }}
                  _hover={{ bg: { base: 'gray.50', _dark: 'gray.700' }, color: 'blue.500' }}
                  py={3}
                  px={4}
                  transition="all 0.2s"
                  textAlign="right"
                >
                  Experience
                </Link>
                <Link
                  as={RouterLink}
                  to="/musings"
                  onClick={() => setIsOpen(false)}
                  fontWeight="medium"
                  color={{ base: 'gray.700', _dark: 'gray.200' }}
                  _hover={{ bg: { base: 'gray.50', _dark: 'gray.700' }, color: 'blue.500', textDecoration: 'none' }}
                  py={3}
                  px={4}
                  transition="all 0.2s"
                  textAlign="right"
                >
                  Musings
                </Link>
                <Link
                  as={RouterLink}
                  to="/experiments"
                  onClick={() => setIsOpen(false)}
                  fontWeight="medium"
                  color={{ base: 'gray.700', _dark: 'gray.200' }}
                  _hover={{ bg: { base: 'gray.50', _dark: 'gray.700' }, color: 'blue.500', textDecoration: 'none' }}
                  py={3}
                  px={4}
                  transition="all 0.2s"
                  textAlign="right"
                >
                  Experiments
                </Link>
              </>
            ) : (
              <>
                <Link
                  as={RouterLink}
                  to="/"
                  onClick={() => setIsOpen(false)}
                  fontWeight="medium"
                  color={{ base: 'gray.700', _dark: 'gray.200' }}
                  _hover={{ bg: { base: 'gray.50', _dark: 'gray.700' }, color: 'blue.500', textDecoration: 'none' }}
                  py={3}
                  px={4}
                  transition="all 0.2s"
                  textAlign="right"
                >
                  Home
                </Link>
                <Link
                  onClick={() => handleSectionClick('about')}
                  cursor="pointer"
                  fontWeight="medium"
                  color={{ base: 'gray.700', _dark: 'gray.200' }}
                  _hover={{ bg: { base: 'gray.50', _dark: 'gray.700' }, color: 'blue.500' }}
                  py={3}
                  px={4}
                  transition="all 0.2s"
                  textAlign="right"
                >
                  About
                </Link>
                <Link
                  onClick={() => handleSectionClick('experience')}
                  cursor="pointer"
                  fontWeight="medium"
                  color={{ base: 'gray.700', _dark: 'gray.200' }}
                  _hover={{ bg: { base: 'gray.50', _dark: 'gray.700' }, color: 'blue.500' }}
                  py={3}
                  px={4}
                  transition="all 0.2s"
                  textAlign="right"
                >
                  Experience
                </Link>
                <Link
                  as={RouterLink}
                  to="/musings"
                  onClick={() => setIsOpen(false)}
                  fontWeight="medium"
                  color={location.pathname.startsWith('/musings') ? 'blue.500' : { base: 'gray.700', _dark: 'gray.200' }}
                  _hover={{ bg: { base: 'gray.50', _dark: 'gray.700' }, color: 'blue.500', textDecoration: 'none' }}
                  py={3}
                  px={4}
                  transition="all 0.2s"
                  textAlign="right"
                >
                  Musings
                </Link>
                <Link
                  as={RouterLink}
                  to="/experiments"
                  onClick={() => setIsOpen(false)}
                  fontWeight="medium"
                  color={location.pathname.startsWith('/experiments') ? 'blue.500' : { base: 'gray.700', _dark: 'gray.200' }}
                  _hover={{ bg: { base: 'gray.50', _dark: 'gray.700' }, color: 'blue.500', textDecoration: 'none' }}
                  py={3}
                  px={4}
                  transition="all 0.2s"
                  textAlign="right"
                >
                  Experiments
                </Link>
              </>
            )}
          </VStack>
        </Box>
      )}
    </>
  )
}

export default Navbar