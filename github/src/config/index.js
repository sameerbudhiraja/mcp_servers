// Centralized configuration management with validation and defaults

import 'dotenv/config';

const config = {
  // Application Environment
  app: {
    env: process.env.NODE_ENV || 'development',
    name: 'git-commands',
    version: '1.0.0',
  },

  // GitHub API Configuration
  github: {
    token: process.env.GIT_TOKEN || '',
    apiVersion: process.env.GIT_API_VERSION || '2022-11-28',
    baseUrl: process.env.GIT_BASE_URL || 'https://api.github.com',
    timeout: parseInt(process.env.GIT_TIMEOUT || '30000', 10),
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

  if (!config.github.token) {
    errors.push('GIT_TOKEN environment variable is required');
  }

  if (errors.length > 0) {
    console.error('Configuration validation failed:');
    errors.forEach(error => console.error(`  - ${error}`));
    // Don't exit, just warn - allow server to start for testing
  }

  return errors.length === 0;
}

// Validate on load
validateConfig();

export default config;

