import { Box, Flex, HStack, Link } from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { ColorModeButton } from './ui/color-mode'

const Navbar = ({ scrollToSection }) => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const homeNavItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Experience', id: 'experience' }
  ]

  return (
    <Box
      position="fixed"
      top="0"
      left={0}
      right={0}
      bg="white"
      borderBottom="1px"
      borderColor="gray.200"
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
          color="blue.500"
          _hover={{ textDecoration: 'none', color: 'blue.600' }}
        >
          Dev Freddy
        </Link>
        
        <HStack spacing={8}>
          {isHomePage && homeNavItems.map((item) => (
            <Link
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              cursor="pointer"
              fontWeight="medium"
              color="gray.600"
              _hover={{ color: 'blue.500', textDecoration: 'none' }}
              transition="color 0.2s"
            >
              {item.name}
            </Link>
          ))}
          
          <Link
            as={RouterLink}
            to="/cocktails"
            fontWeight="medium"
            color={location.pathname === '/cocktails' ? 'blue.500' : 'gray.600'}
            _hover={{ color: 'blue.500', textDecoration: 'none' }}
            transition="color 0.2s"
          >
            Cocktails
          </Link>
          
          {!isHomePage && (
            <Link
              as={RouterLink}
              to="/"
              fontWeight="medium"
              color="gray.600"
              _hover={{ color: 'blue.500', textDecoration: 'none' }}
              transition="color 0.2s"
            >
              Home
            </Link>
          )}
          
          <ColorModeButton />
        </HStack>
      </Flex>
    </Box>
  )
}

export default Navbar