// Tools Index
// Central export and registration point for all tools

import { registerGitHubTools } from './github/index.js';
import { registerGitTools } from './git/index.js';
import { logger } from '../utils/index.js';

/**
 * Register all MCP tools
 * @param {McpServer} server - MCP server instance
 */
function registerAllTools(server) {
  try {
    registerGitHubTools(server);
    registerGitTools(server);
  } catch (error) {
    logger.error('Failed to register tools:', error);
    process.exit(1);
  }
}

export { registerAllTools };
