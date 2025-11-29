/**
 * Environment Configuration
 * Centralized environment variable management
 */

interface EnvConfig {
  // Application
  appName: string;
  appVersion: string;
  env: string;

  // API Configuration
  apiBaseUrl: string;
  apiVersion: string;
  apiTimeout: number;

  // Base Path
  basePath: string;

  // Feature Flags
  enableAnalytics: boolean;
  enableDebug: boolean;
}

/**
 * Parse environment variables with proper type conversion and defaults
 */
const getEnvConfig = (): EnvConfig => {
  return {
    // Application
    appName: import.meta.env.VITE_APP_NAME || 'Caisse Post',
    appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
    env: import.meta.env.VITE_ENV || import.meta.env.MODE || 'development',

    // API Configuration
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    apiVersion: import.meta.env.VITE_API_VERSION || 'v1',
    apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,

    // Base Path
    basePath: import.meta.env.VITE_BASE_PATH || '/',

    // Feature Flags
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    enableDebug: import.meta.env.VITE_ENABLE_DEBUG === 'true',
  };
};

// Export the configuration object
export const envConfig = getEnvConfig();

// Helper to construct full API URL
export const getApiUrl = (endpoint: string = ''): string => {
  const baseUrl = envConfig.apiBaseUrl;
  const version = envConfig.apiVersion;

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

  return cleanEndpoint
    ? `${baseUrl}/${version}/${cleanEndpoint}`
    : `${baseUrl}/${version}`;
};

export const isProduction = (): boolean => {
  return envConfig.env === 'production';
};

export const isPreprod = (): boolean => {
  return envConfig.env === 'preprod';
};

export const isDevelopment = (): boolean => {
  return envConfig.env === 'development';
};

if (envConfig.enableDebug) {
  console.log('🔧 Environment Configuration:', {
    env: envConfig.env,
    basePath: envConfig.basePath,
    apiBaseUrl: envConfig.apiBaseUrl,
    apiVersion: envConfig.apiVersion,
  });
}

export default envConfig;
