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
  registerTool(server, GIT_TOOLS.INIT, async ({ repoPath }) => {
    try {
      const data = await gitService.gitInit(repoPath);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Status
  registerTool(server, GIT_TOOLS.STATUS, async ({ repoPath }) => {
    try {
      const data = await gitService.gitStatus(repoPath);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Add
  registerTool(server, GIT_TOOLS.ADD, async ({ repoPath, files }) => {
    try {
      const data = await gitService.gitAdd(repoPath, files);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Commit
  registerTool(server, GIT_TOOLS.COMMIT, async ({ repoPath, message }) => {
    try {
      const data = await gitService.gitCommit(repoPath, message);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Push
  registerTool(server, GIT_TOOLS.PUSH, async ({ repoPath, remote, branch, setUpstream }) => {
    try {
      const data = await gitService.gitPush(repoPath, remote, branch, setUpstream);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Pull
  registerTool(server, GIT_TOOLS.PULL, async ({ repoPath, remote, branch }) => {
    try {
      const data = await gitService.gitPull(repoPath, remote, branch);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Clone
  registerTool(server, GIT_TOOLS.CLONE, async ({ url, targetPath }) => {
    try {
      const data = await gitService.gitClone(url, targetPath);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Remote Add
  registerTool(server, GIT_TOOLS.REMOTE_ADD, async ({ repoPath, name, url }) => {
    try {
      const data = await gitService.gitRemoteAdd(repoPath, name, url);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Remote List
  registerTool(server, GIT_TOOLS.REMOTE_LIST, async ({ repoPath }) => {
    try {
      const data = await gitService.gitRemoteList(repoPath);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Remote Remove
  registerTool(server, GIT_TOOLS.REMOTE_REMOVE, async ({ repoPath, name }) => {
    try {
      const data = await gitService.gitRemoteRemove(repoPath, name);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Log
  registerTool(server, GIT_TOOLS.LOG, async ({ repoPath, maxCount }) => {
    try {
      const data = await gitService.gitLog(repoPath, maxCount);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Diff
  registerTool(server, GIT_TOOLS.DIFF, async ({ repoPath, options }) => {
    try {
      const data = await gitService.gitDiff(repoPath, options);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Reset
  registerTool(server, GIT_TOOLS.RESET, async ({ repoPath, mode, commit }) => {
    try {
      const data = await gitService.gitReset(repoPath, mode, commit);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Checkout
  registerTool(server, GIT_TOOLS.CHECKOUT, async ({ repoPath, branch, createNew }) => {
    try {
      const data = await gitService.gitCheckout(repoPath, branch, createNew);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Branch List
  registerTool(server, GIT_TOOLS.BRANCH_LIST, async ({ repoPath }) => {
    try {
      const data = await gitService.gitBranchList(repoPath);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Branch Delete
  registerTool(server, GIT_TOOLS.BRANCH_DELETE, async ({ repoPath, branch, force }) => {
    try {
      const data = await gitService.gitBranchDelete(repoPath, branch, force);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Stash
  registerTool(server, GIT_TOOLS.STASH, async ({ repoPath, action }) => {
    try {
      const data = await gitService.gitStash(repoPath, action);
      return typeof data === 'string' ? formatText(data) : formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Tag
  registerTool(server, GIT_TOOLS.TAG, async ({ repoPath, tagName, message }) => {
    try {
      const data = await gitService.gitTag(repoPath, tagName, message);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Fetch
  registerTool(server, GIT_TOOLS.FETCH, async ({ repoPath, remote }) => {
    try {
      const data = await gitService.gitFetch(repoPath, remote);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Merge
  registerTool(server, GIT_TOOLS.MERGE, async (request) => {
    try {
      const data = await gitService.gitMerge(request.repoPath, request.branch);
      
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });
}

export { registerGitTools };
