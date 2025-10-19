/**
 * Dash0 configuration for different environments
 */

const isDevelopment = import.meta.env.MODE === 'development'
const isProduction = import.meta.env.MODE === 'production'

// Base configuration
const baseConfig = {
  serviceName: "devfreddy.com",
  trackErrors: true,
  trackPerformance: true,
  trackPageViews: true,
}

// Development configuration
const developmentConfig = {
  ...baseConfig,
  endpoint: {
    url: "https://devfreddy.com",
    authToken: "auth_Ro2pVbBZ47ZS2Sq48ieIRl9seWOl8P7B",
    dataset: "devfreddycom-dev"
  },
  // Enable debug logging in development
  debug: true,
}

// Production configuration
const productionConfig = {
  ...baseConfig,
  endpoint: {
    url: "https://devfreddy.com",
    authToken: "auth_Ro2pVbBZ47ZS2Sq48ieIRl9seWOl8P7B",
    dataset: "devfreddycom"
  },
  // Disable debug logging in production
  debug: false,
}

// Export the appropriate configuration based on environment
export const dash0Config = isDevelopment ? developmentConfig : productionConfig

// Export environment-specific utilities
export const isDev = isDevelopment
export const isProd = isProduction

export default dash0Config