import { Box, Flex, HStack, Link } from '@chakra-ui/react'
import { ColorModeButton } from './ui/color-mode'

const Navbar = ({ scrollToSection, showBanner }) => {

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Experience', id: 'experience' }
  ]

  return (
    <Box 
      position="fixed" 
      top={showBanner ? "44px" : "0"}
      left={0} 
      right={0} 
      bg="white" 
      borderBottom="1px" 
      borderColor="gray.200" 
      zIndex={1000}
      px={4}
      py={3}
      transition="top 0.3s ease"
    >
      <Flex maxW="1200px" mx="auto" justify="space-between" align="center">
        <Link 
          fontSize="xl" 
          fontWeight="bold" 
          color="blue.500"
          onClick={() => scrollToSection('home')}
          cursor="pointer"
          _hover={{ textDecoration: 'none', color: 'blue.600' }}
        >
          Dev Freddy
        </Link>
        
        <HStack spacing={8}>
          {navItems.map((item) => (
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
          
          <ColorModeButton />
        </HStack>
      </Flex>
    </Box>
  )
}

export default Navbar