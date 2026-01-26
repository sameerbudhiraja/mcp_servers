// Standardized error messages for consistent error handling

const ERROR_MESSAGES = {
  // API Errors
  API: {
    REQUEST_FAILED: 'GitLab API request failed',
    UNAUTHORIZED: 'Authentication failed. Please check your GitLab token',
    FORBIDDEN: 'Access forbidden. Check your permissions',
    NOT_FOUND: 'Resource not found',
    RATE_LIMIT: 'API rate limit exceeded. Please try again later',
    NETWORK_ERROR: 'Network error occurred. Please check your connection',
  },

  // Validation Errors
  VALIDATION: {
    MISSING_REQUIRED: 'Missing required parameter: {param}',
    INVALID_TYPE: 'Invalid type for parameter: {param}',
    INVALID_VALUE: 'Invalid value for parameter: {param}',
  },

  // General Errors
  GENERAL: {
    UNKNOWN: 'An unknown error occurred',
    INTERNAL: 'Internal server error',
  },
};

export default ERROR_MESSAGES;
