/**
 * Utilities Index
 * Central export point for all utilities
 */

import * as errorHandler from './error-handler.js';
import * as responseFormatter from './response-formatter.js';
import logger from './logger.js';

export const {
  handleApiError,
  handleGitError,
  handleValidationError,
  withErrorHandling,
} = errorHandler;

export const {
  formatSuccess,
  formatError,
  formatList,
  formatText,
} = responseFormatter;

export { logger };
