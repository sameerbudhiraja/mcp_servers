/**
 * Error Handler Utility
 * Centralized error handling with proper logging and formatting
 */

import { ERROR_MESSAGES } from '../constants/index.js';
import logger from './logger.js';

/**
 * Handle API errors
 * @param {Error} error - The error object
 * @param {string} context - Context where the error occurred
 * @returns {Object} Formatted error response
 */
function handleApiError(error, context = 'API Request') {
  logger.error(`${context} failed:`, error);

  let errorMessage = ERROR_MESSAGES.API.REQUEST_FAILED;
  const statusCode = error.response?.status;

  if (error.response) {
    // API responded with error
    switch (statusCode) {
      case 401:
        errorMessage = ERROR_MESSAGES.API.UNAUTHORIZED;
        break;
      case 404:
        errorMessage = ERROR_MESSAGES.API.NOT_FOUND;
        break;
      case 403:
        if (error.response.headers?.['x-ratelimit-remaining'] === '0') {
          errorMessage = ERROR_MESSAGES.API.RATE_LIMIT;
        }
        break;
      default:
        errorMessage = error.response.data?.message || ERROR_MESSAGES.API.REQUEST_FAILED;
    }
  } else if (error.request) {
    // Request made but no response
    errorMessage = ERROR_MESSAGES.API.NETWORK_ERROR;
  } else {
    // Error in request setup
    errorMessage = error.message || ERROR_MESSAGES.GENERAL.UNKNOWN;
  }

  return {
    error: true,
    message: errorMessage,
    statusCode,
    details: error.response?.data,
  };
}

/**
 * Handle Git CLI errors
 * @param {Error} error - The error object
 * @param {string} context - Context where the error occurred
 * @returns {Object} Formatted error response
 */
function handleGitError(error, context = 'Git Command') {
  logger.error(`${context} failed:`, error);

  let errorMessage = ERROR_MESSAGES.GIT.COMMAND_FAILED;

  if (error.message) {
    if (error.message.includes('not a git repository')) {
      errorMessage = ERROR_MESSAGES.GIT.NOT_A_REPO;
    } else if (error.message.includes('CONFLICT')) {
      errorMessage = ERROR_MESSAGES.GIT.MERGE_CONFLICT;
    } else {
      errorMessage = `${ERROR_MESSAGES.GIT.COMMAND_FAILED}: ${error.message}`;
    }
  }

  return {
    error: true,
    message: errorMessage,
    details: error.message,
  };
}

/**
 * Handle validation errors
 * @param {string} param - Parameter name
 * @param {string} type - Error type (missing, invalid_type, invalid_value)
 * @returns {Object} Formatted error response
 */
function handleValidationError(param, type = 'missing') {
  let message;
  switch (type) {
    case 'missing':
      message = ERROR_MESSAGES.VALIDATION.MISSING_REQUIRED.replace('{param}', param);
      break;
    case 'invalid_type':
      message = ERROR_MESSAGES.VALIDATION.INVALID_TYPE.replace('{param}', param);
      break;
    case 'invalid_value':
      message = ERROR_MESSAGES.VALIDATION.INVALID_VALUE.replace('{param}', param);
      break;
    default:
      message = ERROR_MESSAGES.GENERAL.UNKNOWN;
  }

  logger.warn(`Validation error: ${message}`);

  return {
    error: true,
    message,
    param,
  };
}

/**
 * Wrap async function with error handling
 * @param {Function} fn - Async function to wrap
 * @param {string} context - Context for error logging
 * @returns {Function} Wrapped function
 */
function withErrorHandling(fn, context) {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      // Determine error type and handle accordingly
      if (error.response || error.request) {
        return handleApiError(error, context);
      }
      return handleGitError(error, context);
    }
  };
}

export {
  handleApiError,
  handleGitError,
  handleValidationError,
  withErrorHandling,
};
