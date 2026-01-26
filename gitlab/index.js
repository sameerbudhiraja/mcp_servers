// GitLab MCP Server
// Main entry point for the MCP server with GitLab API operations

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import config from './src/config/index.js';
import { registerAllTools } from './src/tools/index.js';
import logger from './src/utils/logger.js';

/**
 * Initialize and configure the MCP server
 */
function createServer() {
  try {
    const server = new McpServer({
    version: config.app.version,
    name: config.app.name,
    description: 'MCP server for GitLab API operations',
  });

  // Register all tools
  registerAllTools(server);

  logger.info('MCP server initialized with all tools registered');

  return server;
} catch (error) {
    logger.error('Failed to create server:', error);
    process.exit(1);
    return null; // This line will never execute but satisfies ESLint
} 
}

/**
 * Start the MCP server
 */
async function main() {
  try {
    const server = createServer();
    const transport = new StdioServerTransport();
    
    await server.connect(transport);
    
    logger.info('Server started successfully');
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start the server
main();
