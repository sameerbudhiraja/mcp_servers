// Tools Index
// Central point for registering all tools

import { registerFigmaTools } from './figma/index.js';

/**
 * Register all tools with the MCP server
 * @param {McpServer} server - The MCP server instance
 */
export function registerAllTools(server) {
  registerFigmaTools(server);
}
