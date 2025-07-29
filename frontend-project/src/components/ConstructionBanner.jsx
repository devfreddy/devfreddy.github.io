import { Box, HStack, Text, Link } from '@chakra-ui/react'
import { FaTools, FaCode, FaCog, FaRobot } from 'react-icons/fa'
import { useBannerState } from '../hooks/useBannerState'

const ConstructionBanner = () => {
  const showBanner = useBannerState()

  const handleDismiss = () => {
    localStorage.setItem('constructionBannerDismissed', 'true')
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new Event('bannerDismissed'))
  }

  if (!showBanner) {
    return null
  }

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1001"
      bg="linear-gradient(90deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4)"
      py={2}
      px={4}
      boxShadow="0 2px 10px rgba(0,0,0,0.1)"
    >
      <Box position="relative" maxW="1200px" mx="auto">
        <HStack 
          justify="center" 
          spacing={4} 
          wrap="wrap"
        >
          <FaTools color="white" size="20px" />
          
          <Text 
            color="white" 
            fontWeight="bold" 
            fontSize={["sm", "md"]}
            textAlign="center"
            textShadow="1px 1px 2px rgba(0,0,0,0.3)"
          >
            🚧 Under Construction with
          </Text>
          
          <HStack spacing={2}>
            <FaRobot color="white" size="18px" />
            <Text color="white" fontWeight="bold" fontSize={["sm", "md"]} textShadow="1px 1px 2px rgba(0,0,0,0.3)">
              Claude Code
            </Text>
            <FaCode color="white" size="18px" />
          </HStack>
          
          <FaCog color="white" size="20px" />
        </HStack>
        
        <Link
          color="white"
          position="absolute"
          top="50%"
          right="0"
          transform="translateY(-50%)"
          onClick={handleDismiss}
          cursor="pointer"
          fontSize="sm"
          textDecoration="underline"
          _hover={{ 
            textDecoration: "none",
            opacity: 0.8
          }}
        >
          hide
        </Link>
      </Box>
    </Box>
  )
}

export default ConstructionBanner