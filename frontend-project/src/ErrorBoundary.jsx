import React from 'react'
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react'
import { reportError, sendEvent } from '@dash0/sdk-web'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    
    // Log error to console
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
    
    // Track error with Dash0
    reportError({
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorBoundary: true,
      timestamp: new Date().toISOString(),
    })
    
    // Track custom event for error boundary
    sendEvent('error_boundary_triggered', {
      errorMessage: error.message,
      errorType: error.name,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box p={8} maxW="600px" mx="auto" mt={10}>
          <VStack spacing={4} align="start">
            <Heading color="red.500">Something went wrong!</Heading>
            <Text>
              <strong>Error:</strong> {this.state.error && this.state.error.toString()}
            </Text>
            <Box bg="gray.100" p={4} borderRadius="md" w="100%" overflow="auto">
              <Text fontSize="sm" fontFamily="mono">
                {this.state.errorInfo?.componentStack || 'No stack trace available'}
              </Text>
            </Box>
            <Button 
              colorScheme="blue" 
              onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
            >
              Try Again
            </Button>
          </VStack>
        </Box>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary