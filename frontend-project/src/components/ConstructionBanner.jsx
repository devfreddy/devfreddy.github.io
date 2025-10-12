import { Box, HStack, Text } from '@chakra-ui/react'
import { FaTools, FaCode, FaCog, FaRobot } from 'react-icons/fa'

const ConstructionBanner = () => {
  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      zIndex="1001"
      bg="linear-gradient(90deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4)"
      py={2}
      px={4}
      boxShadow="0 -2px 10px rgba(0,0,0,0.1)"
    >
      <Box maxW="1200px" mx="auto">
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
      </Box>
    </Box>
  )
}

export default ConstructionBanner