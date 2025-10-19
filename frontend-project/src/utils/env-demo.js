/**
 * Demonstration of import.meta.env in Vite
 * This file shows what environment variables are available
 */

// Vite provides import.meta.env which contains:
console.log('=== Vite Environment Variables ===');

// Built-in variables provided by Vite
console.log('MODE:', import.meta.env.MODE); // 'development' or 'production'
console.log('DEV:', import.meta.env.DEV);   // true in development
console.log('PROD:', import.meta.env.PROD); // true in production
console.log('SSR:', import.meta.env.SSR);   // true during server-side rendering

// Custom environment variables from .env files
// Only variables prefixed with VITE_ are exposed to the client
console.log('VITE_GA_MEASUREMENT_ID:', import.meta.env.VITE_GA_MEASUREMENT_ID);

// BASE_URL is the public path when served in development or production
console.log('BASE_URL:', import.meta.env.BASE_URL);

// Show all available environment variables
console.log('\n=== All Available Environment Variables ===');
Object.keys(import.meta.env).forEach(key => {
  console.log(`${key}:`, import.meta.env[key]);
});

/**
 * How import.meta.env works:
 * 
 * 1. Vite automatically provides import.meta.env in your code
 * 2. It loads variables from .env files in this order:
 *    - .env.local        (Always loaded, ignored by git)
 *    - .env.[mode]       (e.g., .env.development, .env.production)
 *    - .env              (Loaded in all cases)
 * 
 * 3. Only variables prefixed with VITE_ are exposed to the client code
 *    for security reasons
 * 
 * 4. During build, Vite statically replaces import.meta.env with the actual values
 * 
 * 5. You can access environment variables in your code like:
 *    - const isDev = import.meta.env.DEV
 *    - const apiUrl = import.meta.env.VITE_API_URL
 */

export const getEnvironment = () => {
  return {
    mode: import.meta.env.MODE,
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
    baseUrl: import.meta.env.BASE_URL,
    gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID,
  }
}

export default getEnvironment