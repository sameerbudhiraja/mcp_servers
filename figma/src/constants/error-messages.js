// Centralized error messages for consistency

const ERROR_MESSAGES = {
  // Configuration Errors
  CONFIG: {
    MISSING_TOKEN: 'Figma access token is not configured. Please set FIGMA_ACCESS_TOKEN environment variable.',
    INVALID_CONFIG: 'Invalid configuration provided.',
  },

  // API Errors
  API: {
    REQUEST_FAILED: 'Figma API request failed.',
    UNAUTHORIZED: 'Unauthorized. Please check your Figma access token.',
    NOT_FOUND: 'Resource not found.',
    RATE_LIMIT: 'Figma API rate limit exceeded.',
    NETWORK_ERROR: 'Network error occurred while contacting Figma API.',
  },

  // Validation Errors
  VALIDATION: {
    MISSING_REQUIRED: 'Missing required parameter: {param}',
    INVALID_TYPE: 'Invalid type for parameter: {param}',
    INVALID_VALUE: 'Invalid value for parameter: {param}',
  },

  // General Errors
  GENERAL: {
    UNKNOWN: 'An unknown error occurred.',
    TIMEOUT: 'Request timeout.',
  },
};

export default ERROR_MESSAGES;
