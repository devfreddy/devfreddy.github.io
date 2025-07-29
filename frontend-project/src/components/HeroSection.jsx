import { Box, VStack, Heading, Text, Button, HStack } from '@chakra-ui/react'

const HeroSection = ({ scrollToSection }) => {
  return (
    <Box
      id="home"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gradient-to-br from-blue.50 to-purple.50"
      pt="80px"
    >
      <VStack spacing={6} textAlign="center" maxW="800px" px={4}>
        <Heading
          as="h1"
          size="2xl"
          bgGradient="linear(to-r, blue.500, purple.500)"
          bgClip="text"
          fontWeight="extrabold"
        >
          Hi, I'm Your Name
        </Heading>
        
        <Heading as="h2" size="lg" color="gray.600" fontWeight="medium">
          Full Stack Developer & Problem Solver
        </Heading>
        
        <Text fontSize="lg" color="gray.500" maxW="600px" lineHeight="1.6">
          I create modern, responsive web applications using cutting-edge technologies. 
          Passionate about clean code, user experience, and turning ideas into reality.
        </Text>
        
        <HStack spacing={4} pt={4}>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => scrollToSection('projects')}
            _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
            transition="all 0.2s"
          >
            View My Work
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection('about')}
            _hover={{ transform: 'translateY(-2px)' }}
            transition="all 0.2s"
          >
            About Me
          </Button>
        </HStack>
        
        <Box
          position="absolute"
          bottom="30px"
          left="50%"
          transform="translateX(-50%)"
          cursor="pointer"
          onClick={() => scrollToSection('about')}
          _hover={{ transform: 'translateX(-50%) translateY(-5px)' }}
          transition="transform 0.2s"
        >
          <VStack spacing={2}>
            <Text fontSize="sm" color="gray.400">Scroll down</Text>
            <Text fontSize="2xl" color="gray.400">↓</Text>
          </VStack>
        </Box>
      </VStack>
    </Box>
  )
}

export default HeroSection