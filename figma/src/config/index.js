// Centralized configuration management with validation and defaults

import 'dotenv/config';

const config = {
  // Application Environment
  app: {
    env: process.env.NODE_ENV || 'development',
    name: 'figma-mcp-server',
    version: '1.0.0',
  },

  // Figma API Configuration
  figma: {
    token: process.env.FIGMA_ACCESS_TOKEN || '',
    baseUrl: process.env.FIGMA_BASE_URL || 'https://api.figma.com',
    timeout: parseInt(process.env.FIGMA_TIMEOUT || '30000', 10),
  },

  // Server Configuration
  server: {
    transport: 'stdio',
  },

  // Logging Configuration
  logging: {
    level: process.env.LOG_LEVEL || 'error',
    enabled: process.env.LOGGING_ENABLED !== 'false',
    fileEnabled: process.env.LOG_FILE_ENABLED !== 'false',
    maxFileSize: process.env.LOG_MAX_FILE_SIZE || '20m',
    maxFiles: process.env.LOG_MAX_FILES || '14d',
  },
};

/**
 * Validate required configuration
 */
function validateConfig() {
  const errors = [];

  if (!config.figma.token) {
    errors.push('FIGMA_ACCESS_TOKEN environment variable is required');
  }

  if (errors.length > 0) {
    // eslint-disable-next-line no-console
    console.error('Configuration validation failed:');
    errors.forEach(error => {
      // eslint-disable-next-line no-console
      console.error(`  - ${error}`);
    });
  }

  return errors.length === 0;
}

// Validate on load
validateConfig();

export default config;
