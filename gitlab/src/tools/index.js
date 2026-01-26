// Tools Index
// Main tool registration entry point

import { registerGitLabTools } from './gitlab/index.js';

/**
 * Register all tools with the MCP server
 * @param {McpServer} server - MCP server instance
 */
function registerAllTools(server) {
  registerGitLabTools(server);
}

export { registerAllTools };
