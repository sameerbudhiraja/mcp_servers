// Figma Tools Registration
// Registers all Figma-related tools with the MCP server

import { TOOL_DEFINITIONS } from '../../constants/index.js';
import * as figmaServices from '../../services/figma/index.js';
import { formatSuccess, formatError } from '../../utils/index.js';

/**
 * Helper to register a tool with standard error handling
 */
function registerTool(server, toolDef, handler) {
  server.tool(
    toolDef.name,
    toolDef.description,
    toolDef.inputSchema,
    async (args) => {
      try {
        const result = await handler(args);
        return formatSuccess(result);
      } catch (error) {
        return formatError(error);
      }
    }
  );
}

/**
 * Register all Figma tools
 * @param {McpServer} server - The MCP server instance
 */
export function registerFigmaTools(server) {
  const { FILE, COMMENT, USER, PROJECT, COMPONENT, STYLE, WEBHOOK, VARIABLE } = TOOL_DEFINITIONS;

  // ===== FILE TOOLS =====
  registerTool(server, FILE.GET_FILE, (args) => {
    const { key, ...options } = args;
    return figmaServices.getFile(key, options);
  });

  registerTool(server, FILE.GET_FILE_NODES, (args) => {
    const { key, ids, ...options } = args;
    return figmaServices.getFileNodes(key, ids, options);
  });

  registerTool(server, FILE.GET_IMAGES, (args) => {
    const { key, ids, ...options } = args;
    return figmaServices.getImages(key, ids, options);
  });

  registerTool(server, FILE.GET_IMAGE_FILLS, (args) => {
    return figmaServices.getImageFills(args.key);
  });

  registerTool(server, FILE.GET_FILE_VERSIONS, (args) => {
    return figmaServices.getFileVersions(args.key);
  });

  // ===== COMMENT TOOLS =====
  registerTool(server, COMMENT.GET_COMMENTS, (args) => {
    return figmaServices.getComments(args.key);
  });

  registerTool(server, COMMENT.POST_COMMENT, (args) => {
    return figmaServices.postComment(args.key, args.message, args.client_meta);
  });

  registerTool(server, COMMENT.DELETE_COMMENT, (args) => {
    return figmaServices.deleteComment(args.key, args.id);
  });

  // ===== USER TOOLS =====
  registerTool(server, USER.GET_CURRENT_USER, () => {
    return figmaServices.getCurrentUser();
  });

  // ===== PROJECT TOOLS =====
  registerTool(server, PROJECT.GET_TEAM_PROJECTS, (args) => {
    return figmaServices.getTeamProjects(args.team_id);
  });

  registerTool(server, PROJECT.GET_PROJECT_FILES, (args) => {
    return figmaServices.getProjectFiles(args.project_id);
  });

  // ===== COMPONENT TOOLS =====
  registerTool(server, COMPONENT.GET_FILE_COMPONENTS, (args) => {
    return figmaServices.getFileComponents(args.key);
  });

  registerTool(server, COMPONENT.GET_TEAM_COMPONENTS, (args) => {
    return figmaServices.getTeamComponents(args.team_id);
  });

  registerTool(server, COMPONENT.GET_COMPONENT, (args) => {
    return figmaServices.getComponent(args.key);
  });

  registerTool(server, COMPONENT.GET_TEAM_COMPONENT_SETS, (args) => {
    return figmaServices.getTeamComponentSets(args.team_id);
  });

  registerTool(server, COMPONENT.GET_COMPONENT_SET, (args) => {
    return figmaServices.getComponentSet(args.key);
  });

  // ===== STYLE TOOLS =====
  registerTool(server, STYLE.GET_FILE_STYLES, (args) => {
    return figmaServices.getFileStyles(args.key);
  });

  registerTool(server, STYLE.GET_TEAM_STYLES, (args) => {
    return figmaServices.getTeamStyles(args.team_id);
  });

  registerTool(server, STYLE.GET_STYLE, (args) => {
    return figmaServices.getStyle(args.key);
  });

  // ===== WEBHOOK TOOLS =====
  registerTool(server, WEBHOOK.CREATE_WEBHOOK, (args) => {
    // eslint-disable-next-line camelcase
    const { team_id, event_type, endpoint, passcode, description } = args;
    return figmaServices.createWebhook(team_id, event_type, endpoint, passcode, description);
  });

  registerTool(server, WEBHOOK.GET_WEBHOOK, (args) => {
    return figmaServices.getWebhook(args.id);
  });

  registerTool(server, WEBHOOK.UPDATE_WEBHOOK, (args) => {
    const { id, ...data } = args;
    return figmaServices.updateWebhook(id, data);
  });

  registerTool(server, WEBHOOK.DELETE_WEBHOOK, (args) => {
    return figmaServices.deleteWebhook(args.id);
  });

  registerTool(server, WEBHOOK.GET_TEAM_WEBHOOKS, (args) => {
    return figmaServices.getTeamWebhooks(args.team_id);
  });

  // ===== VARIABLE TOOLS =====
  registerTool(server, VARIABLE.GET_LOCAL_VARIABLES, (args) => {
    return figmaServices.getLocalVariables(args.key);
  });

  registerTool(server, VARIABLE.GET_PUBLISHED_VARIABLES, (args) => {
    return figmaServices.getPublishedVariables(args.key);
  });

  registerTool(server, VARIABLE.POST_VARIABLES, (args) => {
    return figmaServices.postVariables(args.key, args.params);
  });
}
