import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import config from '../config/index.js';

const {
  combine,
  timestamp,
  printf,
  colorize,
} = winston.format;

/**
 * Custom log format
 */
const logFormat = printf(({
  level,
  message,
  timestamp: ts,
  ...metadata
}) => {
  let msg = `${ts} [${level}]: ${message}`;
  if (Object.keys(metadata).length > 0) {
    msg += ` ${JSON.stringify(metadata)}`;
  }
  return msg;
});

/**
 * Create transports based on configuration
 */
const transports = [];

// Console transport (write to stderr to avoid interfering with stdio MCP protocol)
if (config.logging.enabled) {
  transports.push(
    new winston.transports.Console({
      stderrLevels: ['error', 'warn', 'info', 'debug', 'verbose', 'silly'],
      format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat,
      ),
    }),
  );
}

// File transport with daily rotation
if (config.logging.file.enabled) {
  // Combined log file
  transports.push(
    new DailyRotateFile({
      filename: 'logs/jira-mcp-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: config.logging.file.maxSize,
      maxFiles: config.logging.file.maxFiles,
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat,
      ),
    }),
  );

  // Error log file
  transports.push(
    new DailyRotateFile({
      filename: 'logs/jira-mcp-error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxSize: config.logging.file.maxSize,
      maxFiles: config.logging.file.maxFiles,
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat,
      ),
    }),
  );
}

/**
 * Winston logger instance
 */
const logger = winston.createLogger({
  level: config.logging.level,
  transports,
  exitOnError: false,
});

export default logger;
