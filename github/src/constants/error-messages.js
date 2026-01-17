// Centralized error messages for consistency

const ERROR_MESSAGES = {
  // Configuration Errors
  CONFIG: {
    MISSING_TOKEN: 'GitHub token is not configured. Please set GIT_TOKEN environment variable.',
    INVALID_CONFIG: 'Invalid configuration provided.',
  },

  // API Errors
  API: {
    REQUEST_FAILED: 'GitHub API request failed.',
    UNAUTHORIZED: 'Unauthorized. Please check your GitHub token.',
    NOT_FOUND: 'Resource not found.',
    RATE_LIMIT: 'GitHub API rate limit exceeded.',
    NETWORK_ERROR: 'Network error occurred while contacting GitHub API.',
  },

  // Git CLI Errors
  GIT: {
    NOT_A_REPO: 'Not a git repository.',
    COMMAND_FAILED: 'Git command failed.',
    INVALID_PATH: 'Invalid repository path.',
    MERGE_CONFLICT: 'Merge conflict detected.',
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
