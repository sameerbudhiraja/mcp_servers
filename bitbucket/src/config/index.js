// Centralized configuration management with validation and defaults

import 'dotenv/config';

const config = {
  // Application Environment
  app: {
    env: process.env.NODE_ENV || 'development',
    name: 'bitbucket-mcp-server',
    version: '1.0.0',
  },

  // Bitbucket API Configuration
  bitbucket: {
    email: process.env.BITBUCKET_EMAIL || '',
    apiToken: process.env.BITBUCKET_API_TOKEN || '',
    workspace: process.env.BITBUCKET_WORKSPACE || '',
    baseUrl: process.env.BITBUCKET_BASE_URL || 'https://api.bitbucket.org/2.0',
    timeout: parseInt(process.env.BITBUCKET_TIMEOUT || '30000', 10),
  },

  // Server Configuration
  server: {
    transport: 'stdio',
  },

  // Logging Configuration
  logging: {
    level: process.env.LOG_LEVEL || 'error',
    enabled: process.env.LOGGING_ENABLED !== 'false',
    fileEnabled: process.env.LOG_FILE_ENABLED !== 'false', // Enable file logging by default
    maxFileSize: process.env.LOG_MAX_FILE_SIZE || '20m', // Max size per log file
    maxFiles: process.env.LOG_MAX_FILES || '14d', // Keep logs for 14 days
  },
};

/**
 * Validate required configuration
 */
function validateConfig() {
  const errors = [];

  if (!config.bitbucket.email) {
    errors.push('BITBUCKET_EMAIL environment variable is required');
  }

  if (!config.bitbucket.apiToken) {
    errors.push('BITBUCKET_API_TOKEN environment variable is required');
  }

  if (errors.length > 0) {
    // Using console.error here instead of logger to avoid circular dependency
    /* eslint-disable no-console */
    console.error('Configuration validation failed:');
    errors.forEach(error => console.error(`  - ${error}`));
    /* eslint-enable no-console */
    // Don't exit, just warn - allow server to start for testing
  }

  return errors.length === 0;
}

// Validate on load
validateConfig();

export default config;
