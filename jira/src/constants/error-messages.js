/**
 * Error Messages
 * Standardized error messages for consistent error reporting
 */

export const ERROR_MESSAGES = {
  // Configuration errors
  CONFIG_MISSING: 'Missing required configuration. Please check your .env file.',
  CONFIG_INVALID_URL: 'Invalid Jira base URL. Must start with https://',

  // Authentication errors
  AUTH_FAILED: 'Authentication failed. Please check your email and API token.',
  AUTH_TOKEN_INVALID: 'Invalid API token. Please generate a new token.',
  AUTH_UNAUTHORIZED: 'Unauthorized access. Check your permissions.',

  // API errors
  API_REQUEST_FAILED: 'Jira API request failed',
  API_TIMEOUT: 'Request timeout. Please try again.',
  API_RATE_LIMIT: 'Rate limit exceeded. Please wait before making more requests.',

  // Resource errors
  PROJECT_NOT_FOUND: 'Project not found',
  ISSUE_NOT_FOUND: 'Issue not found',
  COMMENT_NOT_FOUND: 'Comment not found',
  USER_NOT_FOUND: 'User not found',
  SPRINT_NOT_FOUND: 'Sprint not found',
  ATTACHMENT_NOT_FOUND: 'Attachment not found',
  FILTER_NOT_FOUND: 'Filter not found',

  // Validation errors
  VALIDATION_FAILED: 'Input validation failed',
  INVALID_JQL: 'Invalid JQL query',
  INVALID_ISSUE_KEY: 'Invalid issue key format',
  INVALID_PROJECT_KEY: 'Invalid project key format',

  // Permission errors
  PERMISSION_DENIED: 'Permission denied. You do not have access to this resource.',
  INSUFFICIENT_PERMISSIONS: 'Insufficient permissions to perform this action.',

  // General errors
  UNKNOWN_ERROR: 'An unknown error occurred',
  NETWORK_ERROR: 'Network error. Please check your connection.',
};

export default ERROR_MESSAGES;
