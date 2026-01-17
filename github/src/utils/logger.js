/**
 * Logger Utility
 * Simple logging with levels
 */

import config from '../config/index.js';

const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const currentLevel = LOG_LEVELS[config.logging.level] || LOG_LEVELS.error;

/**
 * Log error message
 * @param {...any} args - Arguments to log
 */
function error(...args) {
  if (config.logging.enabled && currentLevel >= LOG_LEVELS.error) {
    console.error('[ERROR]', ...args);
  }
}

/**
 * Log warning message
 * @param {...any} args - Arguments to log
 */
function warn(...args) {
  if (config.logging.enabled && currentLevel >= LOG_LEVELS.warn) {
    console.warn('[WARN]', ...args);
  }
}

/**
 * Log info message
 * @param {...any} args - Arguments to log
 */
function info(...args) {
  if (config.logging.enabled && currentLevel >= LOG_LEVELS.info) {
    console.log('[INFO]', ...args);
  }
}

/**
 * Log debug message
 * @param {...any} args - Arguments to log
 */
function debug(...args) {
  if (config.logging.enabled && currentLevel >= LOG_LEVELS.debug) {
    console.log('[DEBUG]', ...args);
  }
}

const logger = {
  error,
  warn,
  info,
  debug,
};

export default logger;
