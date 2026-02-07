import dotenv from 'dotenv';

// Load environment variables (silent mode to avoid stdout pollution)
dotenv.config({ quiet: true });

/**
 * Application Configuration
 * Centralized configuration management for the Jira MCP Server
 */
const config = {
  // Application Environment
  app: {
    env: process.env.NODE_ENV || 'development',
    name: 'mcp-server-jira',
    version: '1.0.0',
  },

  // Jira API Configuration
  jira: {
    email: process.env.JIRA_EMAIL,
    apiToken: process.env.JIRA_API_TOKEN,
    baseUrl: process.env.JIRA_BASE_URL,
    apiVersion: process.env.JIRA_API_VERSION || '3',
    timeout: parseInt(process.env.JIRA_TIMEOUT || '30000', 10),
  },

  // Server Transport Configuration
  server: {
    transport: process.env.SERVER_TRANSPORT || 'stdio',
  },

  // Logging Configuration
  logging: {
    level: process.env.LOG_LEVEL || 'error',
    enabled: process.env.LOGGING_ENABLED !== 'false',
    file: {
      enabled: process.env.LOG_FILE_ENABLED !== 'false',
      maxSize: process.env.LOG_MAX_FILE_SIZE || '20m',
      maxFiles: process.env.LOG_MAX_FILES || '14d',
    },
  },
};

/**
 * Validates required configuration
 * @throws {Error} If required configuration is missing
 */
export function validateConfig() {
  const requiredFields = [
    { key: 'jira.email', value: config.jira.email, name: 'JIRA_EMAIL' },
    { key: 'jira.apiToken', value: config.jira.apiToken, name: 'JIRA_API_TOKEN' },
    { key: 'jira.baseUrl', value: config.jira.baseUrl, name: 'JIRA_BASE_URL' },
  ];

  const missing = requiredFields.filter((field) => !field.value);

  if (missing.length > 0) {
    const missingNames = missing.map((f) => f.name).join(', ');
    throw new Error(
      `Missing required configuration: ${missingNames}. `
        + 'Please check your .env file or environment variables.',
    );
  }

  // Validate base URL format
  if (config.jira.baseUrl && !config.jira.baseUrl.startsWith('https://')) {
    throw new Error('JIRA_BASE_URL must start with https://');
  }
}

export default config;
