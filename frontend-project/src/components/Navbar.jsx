import { Box, Flex, HStack, Link } from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { ColorModeButton } from './ui/color-mode'

const Navbar = ({ scrollToSection }) => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
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

        <HStack spacing={8}>
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
            </>
          ) : (
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
          )}

          <Link
            as={RouterLink}
            to="/cocktails"
            fontWeight="medium"
            color={location.pathname === '/cocktails' ? 'blue.500' : { base: 'gray.600', _dark: 'gray.300' }}
            _hover={{ color: 'blue.500', textDecoration: 'none' }}
            transition="color 0.2s"
          >
            Cocktails
          </Link>

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
      </Flex>
    </Box>
  )
}

export default Navbar