import { init, addSignalAttribute, sendEvent, reportError } from "@dash0/sdk-web";
import { dash0Config, isDev } from './config/dash0-config.js';

// Initialize Dash0 for devfreddy.com with environment-specific configuration
init(dash0Config);

// Log initialization in development
if (isDev) {
  console.log('Dash0 initialized with config:', {
    serviceName: dash0Config.serviceName,
    dataset: dash0Config.endpoint.dataset,
    environment: import.meta.env.MODE,
  });
}

// Add custom attributes for better filtering
addSignalAttribute("environment", import.meta.env.MODE || "development");
addSignalAttribute("version", "1.0.0");
addSignalAttribute("framework", "react");
addSignalAttribute("bundler", "vite");

// Track initial page view
sendEvent('page_view', {
  path: window.location.pathname,
  search: window.location.search,
  hash: window.location.hash,
  referrer: document.referrer,
  timestamp: new Date().toISOString(),
});

// Set up global error handler
window.addEventListener('error', (event) => {
  reportError({
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error?.stack || event.error,
  });
});

// Set up unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  reportError({
    message: `Unhandled Promise Rejection: ${event.reason}`,
    type: 'unhandledrejection',
    reason: event.reason,
  });
});

// Track page performance metrics
if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        sendEvent('performance', {
          metric: 'page_load',
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          totalTime: navigation.loadEventEnd - navigation.fetchStart,
          timestamp: new Date().toISOString(),
        });
      }
    }, 0);
  });
}