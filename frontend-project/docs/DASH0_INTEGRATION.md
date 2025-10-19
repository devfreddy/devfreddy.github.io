# Dash0 Web SDK Integration Guide

This document explains how Dash0 has been integrated into your React/Vite frontend application and how to use it effectively.

## Overview

Your application is now fully instrumented with Dash0 Web SDK for:
- Automatic page view tracking
- Route change tracking
- Error tracking (both runtime errors and unhandled promise rejections)
- Performance monitoring
- Custom event tracking
- User interaction tracking

## Files Created/Modified

### Core Integration Files
1. **`src/instrumentation-client.js`** - Main Dash0 initialization and configuration
2. **`src/config/dash0-config.js`** - Environment-specific configuration
3. **`src/hooks/useDash0Tracking.js`** - Custom React hook for tracking
4. **`src/main.jsx`** - Modified to import instrumentation
5. **`src/App.jsx`** - Modified to track route changes
6. **`src/ErrorBoundary.jsx`** - Enhanced with error tracking
7. **`src/components/Navbar.jsx`** - Added navigation tracking
8. **`src/components/Dash0Test.jsx`** - Development testing component

## Features Implemented

### 1. Automatic Initialization
- Dash0 SDK is automatically initialized when your app starts
- Environment-aware configuration (development vs production)
- Debug logging enabled in development mode

### 2. Page View Tracking
- Automatic page view tracking on initial load
- Route change tracking with React Router
- Custom navigation event tracking

### 3. Error Tracking
- Global error handler for runtime errors
- Unhandled promise rejection tracking
- Error boundary integration with detailed error context
- Automatic error reporting to Dash0

### 4. Performance Monitoring
- Page load performance metrics
- Component render time tracking
- Custom performance metric tracking

### 5. User Interaction Tracking
- Button click tracking
- Form submission tracking (with sensitive data filtering)
- Navigation tracking
- Custom event tracking

## Usage Examples

### Using the Custom Hook

```jsx
import { useDash0Tracking } from '../hooks/useDash0Tracking'

function MyComponent() {
  const { trackButtonClick, trackCustom, trackMetric } = useDash0Tracking()
  
  const handleClick = () => {
    trackButtonClick('my-button', {
      feature: 'example',
      variant: 'primary'
    })
  }
  
  return <button onClick={handleClick}>Click me</button>
}
```

### Tracking Custom Events

```jsx
import { sendEvent } from '@dash0/sdk-web'

// Track a custom business event
sendEvent('user_signup_completed', {
  method: 'email',
  plan: 'premium',
  timestamp: new Date().toISOString()
})
```

### Tracking Performance

```jsx
import { sendEvent } from '@dash0/sdk-web'

// Track custom performance metrics
const startTime = performance.now()
// ... perform operation
const duration = performance.now() - startTime

sendEvent('performance', {
  metric: 'database_query',
  duration,
  queryType: 'select',
  success: true,
  timestamp: new Date().toISOString()
})
```

### Tracking Errors

```jsx
import { reportError } from '@dash0/sdk-web'

// Track custom errors
try {
  // ... code that might throw
} catch (error) {
  reportError({
    message: error.message,
    stack: error.stack,
    context: 'user_action',
    timestamp: new Date().toISOString()
  })
}
```

## Testing the Integration

### Development Testing
1. Run your development server: `npm run dev`
2. You'll see a yellow test panel at the top of your application (development only)
3. Use the test buttons to verify different tracking features
4. Check browser console for debug logs
5. Verify events in your Dash0 dashboard

### Test Panel Features
The development test panel includes buttons to test:
- Button click tracking
- Navigation tracking
- Form submission tracking
- Custom event tracking
- Error tracking
- Performance tracking

## Configuration

### Environment Variables
The configuration automatically detects your environment:
- Development: Uses `devfreddycom-dev` dataset
- Production: Uses `devfreddycom` dataset

### Custom Configuration
You can modify the configuration in `src/config/dash0-config.js`:
- Change endpoint URLs
- Add custom attributes
- Modify tracking settings
- Adjust environment-specific settings

## Best Practices

### 1. Sensitive Data
- Form tracking automatically filters sensitive fields (password, token, secret)
- Be mindful of what data you send to Dash0
- Review your tracking implementation for privacy compliance

### 2. Performance Impact
- Dash0 SDK is lightweight and optimized for performance
- Tracking operations are non-blocking
- Consider sampling for high-frequency events in production

### 3. Error Handling
- All tracking calls are wrapped in try-catch blocks
- Tracking failures won't break your application
- Monitor tracking health in your Dash0 dashboard

### 4. Event Naming
- Use consistent naming conventions
- Include relevant context in event properties
- Follow Dash0's recommended event schemas

## Troubleshooting

### Common Issues

1. **Events not appearing in Dash0**
   - Check your auth token and endpoint configuration
   - Verify network connectivity to Dash0 endpoint
   - Check browser console for errors

2. **Build errors**
   - Ensure all imports are correct
   - Check that the Dash0 SDK is properly installed
   - Verify your environment configuration

3. **Performance issues**
   - Review your tracking implementation for excessive events
   - Consider implementing sampling for high-frequency events
   - Monitor bundle size impact

### Debug Mode
In development mode, debug logging is enabled. You'll see console logs like:
```
Dash0 initialized with config: {
  serviceName: "devfreddy.com",
  dataset: "devfreddycom-dev",
  environment: "development"
}
```

## Next Steps

1. **Review your tracking implementation** - Ensure you're tracking the right user journeys
2. **Set up Dash0 dashboards** - Create visualizations for your key metrics
3. **Configure alerts** - Set up notifications for errors and performance issues
4. **Monitor data quality** - Regularly review the data being sent to Dash0
5. **Optimize based on insights** - Use the data to improve user experience

## Support

For Dash0-specific questions:
- Refer to the [Dash0 documentation](https://docs.dash0.com)
- Contact Dash0 support for SDK-specific issues

For implementation questions:
- Review the code in the created files
- Check the test component for usage examples
- Refer to React best practices for custom hooks