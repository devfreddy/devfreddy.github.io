import { Box, VStack, Heading, Text, Button, HStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import ParticleBackground from './ParticleBackground'
import FloatingTechIcons from './FloatingTechIcons'

const MotionBox = motion.create(Box)
const MotionVStack = motion.create(VStack)
const MotionHeading = motion.create(Heading)
const MotionText = motion.create(Text)
const MotionButton = motion.create(Button)

const HeroSection = ({ scrollToSection }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const nameVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <MotionBox
      id="home"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      pt="80px"
      position="relative"
      overflow="hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <ParticleBackground />
      <FloatingTechIcons />
      <MotionVStack spacing={6} textAlign="center" maxW="800px" px={4} zIndex={2}>
        <MotionHeading
          as="h1"
          size="2xl"
          color="white"
          fontWeight="extrabold"
          textShadow="2px 2px 4px rgba(0,0,0,0.3)"
          variants={nameVariants}
        >
          Michael Frederick
        </MotionHeading>

        <MotionHeading as="h2" size="lg" color="whiteAlpha.900" fontWeight="semibold" variants={itemVariants}>
          I Help Customers Navigate Complex Technical Decisions
        </MotionHeading>

        <MotionText fontSize="lg" color="whiteAlpha.800" maxW="600px" lineHeight="1.6" variants={itemVariants}>
          Staff Solutions Architect specializing in GraphQL, observability, and distributed systems.
          I combine technical depth with the ability to read customer needs—then guide them to solutions they understand, trust, and can successfully implement.
        </MotionText>
        
        <motion.div variants={itemVariants}>
          <HStack spacing={4} pt={4}>
            <MotionButton
              bg="rgba(255, 255, 255, 0.2)"
              color="white"
              size="lg"
              onClick={() => scrollToSection('experience')}
              _hover={{ 
                transform: 'translateY(-2px)', 
                boxShadow: 'xl',
                bg: "rgba(255, 255, 255, 0.3)"
              }}
              transition="all 0.2s"
              fontWeight="semibold"
              backdropFilter="blur(10px)"
              border="1px solid rgba(255, 255, 255, 0.3)"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Experience
            </MotionButton>
            
            <MotionButton
              variant="outline"
              borderColor="whiteAlpha.500"
              color="white"
              size="lg"
              onClick={() => scrollToSection('about')}
              _hover={{ 
                transform: 'translateY(-2px)',
                bg: "rgba(255, 255, 255, 0.1)",
                borderColor: "whiteAlpha.700"
              }}
              transition="all 0.2s"
              fontWeight="semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              About Me
            </MotionButton>
          </HStack>
        </motion.div>
        
        <motion.div
          style={{
            position: "absolute",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            cursor: "pointer"
          }}
          onClick={() => scrollToSection('about')}
          whileHover={{ y: -5 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut"
          }}
          variants={itemVariants}
        >
          <VStack spacing={2}>
            <Text fontSize="sm" color="whiteAlpha.700">Scroll down</Text>
            <Text fontSize="2xl" color="whiteAlpha.700">↓</Text>
          </VStack>
        </motion.div>
      </MotionVStack>
    </MotionBox>
  )
}

export default HeroSection