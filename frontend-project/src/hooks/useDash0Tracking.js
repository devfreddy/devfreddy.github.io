import { useCallback } from 'react'
import { sendEvent, reportError } from '@dash0/sdk-web'

/**
 * Custom hook for Dash0 tracking functionality
 * Provides convenient methods to track user interactions and performance
 */
export const useDash0Tracking = () => {
  /**
   * Track user interactions (clicks, form submissions, etc.)
   * @param {string} action - The action name (e.g., 'click', 'submit')
   * @param {string} element - The element identifier (e.g., 'button', 'link')
   * @param {Object} properties - Additional properties to track
   */
  const trackInteraction = useCallback((action, element, properties = {}) => {
    sendEvent('user_interaction', {
      action,
      element,
      ...properties,
      timestamp: new Date().toISOString(),
    })
  }, [])

  /**
   * Track button clicks
   * @param {string} buttonName - Name or identifier of the button
   * @param {Object} properties - Additional properties
   */
  const trackButtonClick = useCallback((buttonName, properties = {}) => {
    trackInteraction('click', 'button', {
      buttonName,
      ...properties,
    })
  }, [trackInteraction])

  /**
   * Track navigation clicks
   * @param {string} destination - The destination path or section
   * @param {Object} properties - Additional properties
   */
  const trackNavigation = useCallback((destination, properties = {}) => {
    trackInteraction('navigate', 'link', {
      destination,
      ...properties,
    })
  }, [trackInteraction])

  /**
   * Track form submissions
   * @param {string} formName - Name or identifier of the form
   * @param {Object} formData - Form data (sanitized)
   * @param {Object} properties - Additional properties
   */
  const trackFormSubmission = useCallback((formName, formData = {}, properties = {}) => {
    // Sanitize form data to remove sensitive information
    const sanitizedData = Object.keys(formData).reduce((acc, key) => {
      // Skip password fields and other sensitive data
      if (key.toLowerCase().includes('password') || 
          key.toLowerCase().includes('token') || 
          key.toLowerCase().includes('secret')) {
        return acc
      }
      acc[key] = formData[key]
      return acc
    }, {})

    trackInteraction('submit', 'form', {
      formName,
      formData: sanitizedData,
      ...properties,
    })
  }, [trackInteraction])

  /**
   * Track custom events
   * @param {string} eventName - Name of the custom event
   * @param {Object} properties - Event properties
   */
  const trackCustom = useCallback((eventName, properties = {}) => {
    sendEvent(eventName, {
      timestamp: new Date().toISOString(),
      ...properties,
    })
  }, [])

  /**
   * Track performance metrics
   * @param {string} metricName - Name of the performance metric
   * @param {number} value - Metric value
   * @param {Object} properties - Additional properties
   */
  const trackMetric = useCallback((metricName, value, properties = {}) => {
    sendEvent('performance', {
      metric: metricName,
      value,
      timestamp: new Date().toISOString(),
      ...properties,
    })
  }, [])

  /**
   * Track component render time
   * @param {string} componentName - Name of the component
   * @param {number} renderTime - Time taken to render in milliseconds
   */
  const trackComponentRender = useCallback((componentName, renderTime) => {
    trackMetric('component_render', renderTime, {
      componentName,
    })
  }, [trackMetric])

  return {
    trackInteraction,
    trackButtonClick,
    trackNavigation,
    trackFormSubmission,
    trackCustom,
    trackMetric,
    trackComponentRender,
  }
}

export default useDash0Tracking