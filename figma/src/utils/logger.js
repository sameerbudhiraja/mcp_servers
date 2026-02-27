// Logger Utility

import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import { fileURLToPath } from 'url';
import config from '../config/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define log directory
const LOG_DIR = path.join(__dirname, '../../logs');

/**
 * Custom log format with timestamp, level, and message
 */
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.printf(({ timestamp, level, message, stack, ...metadata }) => {
    let msg = `${timestamp} [${level.toUpperCase()}]: ${message}`;
    
    // Add stack trace for errors
    if (stack) {
      msg += `\n${stack}`;
    }
    
    // Add metadata if present
    if (Object.keys(metadata).length > 0) {
      msg += `\n${JSON.stringify(metadata, null, 2)}`;
    }
    
    return msg;
  })
);

/**
 * Console format with colors
 */
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    let msg = `${timestamp} ${level}: ${message}`;
    if (stack) {
      msg += `\n${stack}`;
    }
    return msg;
  })
);

/**
 * Create transports array based on configuration
 */
const transports = [];

// Console transport (always enabled if logging is enabled)
if (config.logging.enabled) {
  transports.push(
    new winston.transports.Console({
      format: consoleFormat,
      level: config.logging.level,
    })
  );
}

// File transports with daily rotation
if (config.logging.fileEnabled) {
  // Combined log - all levels
  transports.push(
    new DailyRotateFile({
      filename: path.join(LOG_DIR, 'combined-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: config.logging.maxFileSize,
      maxFiles: config.logging.maxFiles,
      format: logFormat,
      level: config.logging.level,
    })
  );

  // Error log - only errors
  transports.push(
    new DailyRotateFile({
      filename: path.join(LOG_DIR, 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: config.logging.maxFileSize,
      maxFiles: config.logging.maxFiles,
      format: logFormat,
      level: 'error',
    })
  );
}

/**
 * Create Winston logger instance
 */
const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports,
  exitOnError: false,
  exceptionHandlers: config.logging.fileEnabled
    ? [
        new DailyRotateFile({
          filename: path.join(LOG_DIR, 'exceptions-%DATE%.log'),
          datePattern: 'YYYY-MM-DD',
          maxSize: config.logging.maxFileSize,
          maxFiles: config.logging.maxFiles,
          format: logFormat,
        }),
      ]
    : [],
  rejectionHandlers: config.logging.fileEnabled
    ? [
        new DailyRotateFile({
          filename: path.join(LOG_DIR, 'rejections-%DATE%.log'),
          datePattern: 'YYYY-MM-DD',
          maxSize: config.logging.maxFileSize,
          maxFiles: config.logging.maxFiles,
          format: logFormat,
        }),
      ]
    : [],
});

export default logger;
