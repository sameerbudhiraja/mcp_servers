// Git CLI Tools Registration
// Registers all Git CLI-related MCP tools


import { TOOL_DEFINITIONS } from '../../constants/index.js';
import * as gitService from '../../services/git/index.js';
import { formatSuccess, formatError, formatText } from '../../utils/index.js';

// Get Git tool definitions
const GIT_TOOLS = TOOL_DEFINITIONS.GIT;

/**
 * Helper function to register a tool from its definition
 */
function registerTool(server, toolDef, handler) {
  server.registerTool(
    toolDef.name,
    {
      description: toolDef.description,
      inputSchema: toolDef.inputSchema,
    },
    handler
  );
}

/**
 * Register all Git CLI tools
 * @param {McpServer} server - MCP server instance
 */
function registerGitTools(server) {
  // Git Init
  registerTool(server, GIT_TOOLS.INIT, async ({ payload }) => {
    try {
      const data = await gitService.gitInit(payload.repoPath);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Status
  registerTool(server, GIT_TOOLS.STATUS, async ({ payload }) => {
    try {
      const data = await gitService.gitStatus(payload.repoPath);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Add
  registerTool(server, GIT_TOOLS.ADD, async ({ payload }) => {
    try {
      const data = await gitService.gitAdd(payload.repoPath, payload.files);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Commit
  registerTool(server, GIT_TOOLS.COMMIT, async ({ payload }) => {
    try {
      const data = await gitService.gitCommit(payload.repoPath, payload.message);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Push
  registerTool(server, GIT_TOOLS.PUSH, async ({ payload }) => {
    try {
      const data = await gitService.gitPush(payload.repoPath, payload.remote, payload.branch, payload.setUpstream);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Pull
  registerTool(server, GIT_TOOLS.PULL, async ({ payload }) => {
    try {
      const data = await gitService.gitPull(payload.repoPath, payload.remote, payload.branch);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Clone
  registerTool(server, GIT_TOOLS.CLONE, async ({ payload }) => {
    try {
      const data = await gitService.gitClone(payload.url, payload.targetPath);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Remote Add
  registerTool(server, GIT_TOOLS.REMOTE_ADD, async ({ payload }) => {
    try {
      const data = await gitService.gitRemoteAdd(payload.repoPath, payload.name, payload.url);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Remote List
  registerTool(server, GIT_TOOLS.REMOTE_LIST, async ({ payload }) => {
    try {
      const data = await gitService.gitRemoteList(payload.repoPath);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Remote Remove
  registerTool(server, GIT_TOOLS.REMOTE_REMOVE, async ({ payload }) => {
    try {
      const data = await gitService.gitRemoteRemove(payload.repoPath, payload.name);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Log
  registerTool(server, GIT_TOOLS.LOG, async ({ payload }) => {
    try {
      const data = await gitService.gitLog(payload.repoPath, payload.maxCount);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Diff
  registerTool(server, GIT_TOOLS.DIFF, async ({ payload }) => {
    try {
      const data = await gitService.gitDiff(payload.repoPath, payload.options);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Reset
  registerTool(server, GIT_TOOLS.RESET, async ({ payload }) => {
    try {
      const data = await gitService.gitReset(payload.repoPath, payload.mode, payload.commit);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Checkout
  registerTool(server, GIT_TOOLS.CHECKOUT, async ({ payload }) => {
    try {
      const data = await gitService.gitCheckout(payload.repoPath, payload.branch, payload.createNew);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Branch List
  registerTool(server, GIT_TOOLS.BRANCH_LIST, async ({ payload }) => {
    try {
      const data = await gitService.gitBranchList(payload.repoPath);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Branch Delete
  registerTool(server, GIT_TOOLS.BRANCH_DELETE, async ({ payload }) => {
    try {
      const data = await gitService.gitBranchDelete(payload.repoPath, payload.branch, payload.force);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Stash
  registerTool(server, GIT_TOOLS.STASH, async ({ payload }) => {
    try {
      const data = await gitService.gitStash(payload.repoPath, payload.action);
      return typeof data === 'string' ? formatText(data) : formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Tag
  registerTool(server, GIT_TOOLS.TAG, async ({ payload }) => {
    try {
      const data = await gitService.gitTag(payload.repoPath, payload.tagName, payload.message);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Fetch
  registerTool(server, GIT_TOOLS.FETCH, async ({ payload }) => {
    try {
      const data = await gitService.gitFetch(payload.repoPath, payload.remote);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Merge
  registerTool(server, GIT_TOOLS.MERGE, async ({ payload }) => {
    try {
      const data = await gitService.gitMerge(payload.repoPath, payload.branch);
      
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });
}

export { registerGitTools };
