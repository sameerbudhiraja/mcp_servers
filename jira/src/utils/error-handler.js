import logger from './logger.js';

/**
 * Custom error class for Jira API errors
 */
export class JiraApiError extends Error {
  constructor(message, statusCode, response) {
    super(message);
    this.name = 'JiraApiError';
    this.statusCode = statusCode;
    this.response = response;
  }
}

/**
 * Handles and formats errors consistently
 * @param {Error} error - The error to handle
 * @param {string} context - Context where the error occurred
 * @returns {Object} Formatted error response
 */
export function handleError(error, context = '') {
  const errorContext = context ? `[${context}] ` : '';

  // Log the error
  logger.error(`${errorContext}${error.message}`, {
    error: error.stack,
    context,
  });

  // Format error response
  const errorResponse = {
    error: true,
    message: `${errorContext}${error.message}`,
  };

  // Add additional error details if available
  if (error.response) {
    errorResponse.statusCode = error.response.status;
    errorResponse.statusText = error.response.statusText;

    if (error.response.data) {
      errorResponse.details = error.response.data;
    }
  }

  return errorResponse;
}

/**
 * Wraps async functions with error handling
 * @param {Function} fn - Async function to wrap
 * @param {string} context - Context for error handling
 * @returns {Function} Wrapped function
 */
export function withErrorHandling(fn, context) {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      throw new Error(`${context}: ${error.message}`);
    }
  };
}

export default {
  JiraApiError,
  handleError,
  withErrorHandling,
};
