import { Box, Button, VStack, Heading, Text } from '@chakra-ui/react'
import { useDash0Tracking } from '../hooks/useDash0Tracking'
import { reportError, sendEvent } from '@dash0/sdk-web'
import { toaster } from './ui/toaster'

/**
 * Test component for Dash0 instrumentation
 * This component provides buttons to test various Dash0 tracking features
 * Should only be visible in development mode
 */
const Dash0Test = () => {
  const {
    trackButtonClick,
    trackNavigation,
    trackFormSubmission,
    trackCustom,
    trackMetric
  } = useDash0Tracking()

  const handleTestClick = () => {
    trackButtonClick('test-button', {
      testType: 'basic-click',
      timestamp: new Date().toISOString()
    })
    
    toaster.create({
      title: 'Click Tracked',
      description: 'Button click has been tracked with Dash0',
      status: 'success',
      duration: 2000,
    })
  }

  const handleTestNavigation = () => {
    trackNavigation('/test-page', {
      source: 'test-component',
      method: 'programmatic'
    })
    
    toaster.create({
      title: 'Navigation Tracked',
      description: 'Navigation event has been tracked with Dash0',
      status: 'success',
      duration: 2000,
    })
  }

  const handleTestForm = () => {
    trackFormSubmission('test-form', {
      field1: 'value1',
      field2: 'value2',
      // Note: password fields would be automatically filtered
    })
    
    toaster.create({
      title: 'Form Submission Tracked',
      description: 'Form submission has been tracked with Dash0',
      status: 'success',
      duration: 2000,
    })
  }

  const handleTestCustomEvent = () => {
    trackCustom('test_custom_event', {
      customProperty: 'custom-value',
      category: 'testing',
      action: 'custom-event-test'
    })
    
    toaster.create({
      title: 'Custom Event Tracked',
      description: 'Custom event has been tracked with Dash0',
      status: 'success',
      duration: 2000,
    })
  }

  const handleTestError = () => {
    try {
      throw new Error('This is a test error for Dash0 tracking')
    } catch (error) {
      reportError({
        message: error.message,
        stack: error.stack,
        testError: true,
        component: 'Dash0Test'
      })
      
      toaster.create({
        title: 'Error Tracked',
        description: 'Test error has been tracked with Dash0',
        status: 'warning',
        duration: 2000,
      })
    }
  }

  const handleTestPerformance = () => {
    // Simulate some performance metric
    const startTime = performance.now()
    
    // Simulate some work
    setTimeout(() => {
      const endTime = performance.now()
      const duration = endTime - startTime
      
      trackMetric('test_operation', duration, {
        operationType: 'simulated-work',
        success: true
      })
      
      toaster.create({
        title: 'Performance Metric Tracked',
        description: `Performance metric (${duration.toFixed(2)}ms) has been tracked with Dash0`,
        status: 'info',
        duration: 2000,
      })
    }, 100)
  }

  // Only render in development
  if (import.meta.env.MODE !== 'development') {
    return null
  }

  return (
    <Box p={6} bg="yellow.50" borderWidth={2} borderColor="yellow.300" borderRadius="md" m={4}>
      <VStack spacing={4} align="stretch">
        <Heading size="md" color="yellow.800">
          🧪 Dash0 Test Panel (Development Only)
        </Heading>
        <Text fontSize="sm" color="gray.600">
          Use these buttons to test Dash0 tracking functionality. Check your browser console and Dash0 dashboard for events.
        </Text>
        
        <VStack spacing={3} align="stretch">
          <Button 
            colorScheme="blue" 
            onClick={handleTestClick}
            size="sm"
          >
            Test Button Click Tracking
          </Button>
          
          <Button 
            colorScheme="green" 
            onClick={handleTestNavigation}
            size="sm"
          >
            Test Navigation Tracking
          </Button>
          
          <Button 
            colorScheme="purple" 
            onClick={handleTestForm}
            size="sm"
          >
            Test Form Submission Tracking
          </Button>
          
          <Button 
            colorScheme="orange" 
            onClick={handleTestCustomEvent}
            size="sm"
          >
            Test Custom Event Tracking
          </Button>
          
          <Button 
            colorScheme="red" 
            onClick={handleTestError}
            size="sm"
          >
            Test Error Tracking
          </Button>
          
          <Button 
            colorScheme="teal" 
            onClick={handleTestPerformance}
            size="sm"
          >
            Test Performance Tracking
          </Button>
        </VStack>
      </VStack>
    </Box>
  )
}

export default Dash0Test