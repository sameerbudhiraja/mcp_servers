// Main tools registration entry point
// Exports function to register all tools

import { registerBitbucketTools } from './bitbucket/index.js';

/**
 * Register all MCP tools
 * @param {McpServer} server - MCP server instance
 */
function registerAllTools(server) {
  registerBitbucketTools(server);
}

export { registerAllTools };
