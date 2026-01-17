/**
 * Git CLI Tools Registration
 * Registers all Git CLI-related MCP tools
 */

import { z } from 'zod';
import { SCHEMAS } from '../../constants/index.js';
import * as gitService from '../../services/git/index.js';
import { formatSuccess, formatError, formatText } from '../../utils/index.js';

/**
 * Register all Git CLI tools
 * @param {McpServer} server - MCP server instance
 */
function registerGitTools(server) {
  // Git Init
  server.registerTool('git_init', {
    description: 'Initialize a new Git repository in the specified directory',
    inputSchema: SCHEMAS.GIT.INIT,
  }, async ({ repoPath }) => {
    try {
      const data = await gitService.gitInit(repoPath);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Status
  server.registerTool('git_status', {
    description: 'Get the status of a Git repository',
    inputSchema: SCHEMAS.GIT.STATUS,
  }, async ({ repoPath }) => {
    try {
      const data = await gitService.gitStatus(repoPath);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Add
  server.registerTool('git_add', {
    description: "Stage files for commit (use '.' to add all files)",
    inputSchema: SCHEMAS.GIT.ADD,
  }, async ({ repoPath, files }) => {
    try {
      const data = await gitService.gitAdd(repoPath, files);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Commit
  server.registerTool('git_commit', {
    description: 'Create a commit with the staged changes',
    inputSchema: SCHEMAS.GIT.COMMIT,
  }, async ({ repoPath, message }) => {
    try {
      const data = await gitService.gitCommit(repoPath, message);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Push
  server.registerTool('git_push', {
    description: 'Push commits to a remote repository',
    inputSchema: SCHEMAS.GIT.PUSH,
  }, async ({ repoPath, remote, branch, setUpstream }) => {
    try {
      const data = await gitService.gitPush(repoPath, remote, branch, setUpstream);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Pull
  server.registerTool('git_pull', {
    description: 'Pull changes from a remote repository',
    inputSchema: SCHEMAS.GIT.PULL,
  }, async ({ repoPath, remote, branch }) => {
    try {
      const data = await gitService.gitPull(repoPath, remote, branch);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Clone
  server.registerTool('git_clone', {
    description: 'Clone a repository from a URL',
    inputSchema: SCHEMAS.GIT.CLONE,
  }, async ({ url, targetPath }) => {
    try {
      const data = await gitService.gitClone(url, targetPath);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Remote Add
  server.registerTool('git_remote_add', {
    description: 'Add a remote repository',
    inputSchema: SCHEMAS.GIT.REMOTE_ADD,
  }, async ({ repoPath, name, url }) => {
    try {
      const data = await gitService.gitRemoteAdd(repoPath, name, url);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Remote List
  server.registerTool('git_remote_list', {
    description: 'List all remote repositories',
    inputSchema: SCHEMAS.GIT.STATUS,
  }, async ({ repoPath }) => {
    try {
      const data = await gitService.gitRemoteList(repoPath);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Remote Remove
  server.registerTool('git_remote_remove', {
    description: 'Remove a remote repository',
    inputSchema: {
      repoPath: SCHEMAS.GIT.STATUS.repoPath,
      name: SCHEMAS.GIT.REMOTE_ADD.name,
    },
  }, async ({ repoPath, name }) => {
    try {
      const data = await gitService.gitRemoteRemove(repoPath, name);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Log
  server.registerTool('git_log', {
    description: 'Get commit history',
    inputSchema: {
      repoPath: SCHEMAS.GIT.STATUS.repoPath,
      maxCount: z.number().optional().describe('Maximum number of commits to retrieve (default: 10)'),
    },
  }, async ({ repoPath, maxCount }) => {
    try {
      const data = await gitService.gitLog(repoPath, maxCount);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Diff
  server.registerTool('git_diff', {
    description: 'Show changes (diff) in the repository',
    inputSchema: {
      repoPath: SCHEMAS.GIT.STATUS.repoPath,
      options: z.record(z.any()).optional().describe("Diff options (e.g., { '--cached': null } for staged changes)"),
    },
  }, async ({ repoPath, options }) => {
    try {
      const data = await gitService.gitDiff(repoPath, options);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Reset
  server.registerTool('git_reset', {
    description: 'Reset to a specific commit',
    inputSchema: SCHEMAS.GIT.RESET,
  }, async ({ repoPath, mode, commit }) => {
    try {
      const data = await gitService.gitReset(repoPath, mode, commit);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Checkout
  server.registerTool('git_checkout', {
    description: 'Switch to a branch or create a new branch',
    inputSchema: SCHEMAS.GIT.CHECKOUT,
  }, async ({ repoPath, branch, createNew }) => {
    try {
      const data = await gitService.gitCheckout(repoPath, branch, createNew);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Branch List
  server.registerTool('git_branch_list', {
    description: 'List all local branches',
    inputSchema: SCHEMAS.GIT.STATUS,
  }, async ({ repoPath }) => {
    try {
      const data = await gitService.gitBranchList(repoPath);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Branch Delete
  server.registerTool('git_branch_delete', {
    description: 'Delete a local branch',
    inputSchema: SCHEMAS.GIT.BRANCH_DELETE,
  }, async ({ repoPath, branch, force }) => {
    try {
      const data = await gitService.gitBranchDelete(repoPath, branch, force);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Stash
  server.registerTool('git_stash', {
    description: 'Stash changes in the working directory',
    inputSchema: {
      repoPath: SCHEMAS.GIT.STATUS.repoPath,
      action: z.string().optional().describe("Stash action: 'save', 'pop', 'list', 'clear' (default: 'save')"),
    },
  }, async ({ repoPath, action }) => {
    try {
      const data = await gitService.gitStash(repoPath, action);
      return typeof data === 'string' ? formatText(data) : formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Tag
  server.registerTool('git_tag', {
    description: 'Create a tag',
    inputSchema: SCHEMAS.GIT.TAG,
  }, async ({ repoPath, tagName, message }) => {
    try {
      const data = await gitService.gitTag(repoPath, tagName, message);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Fetch
  server.registerTool('git_fetch', {
    description: 'Fetch from a remote repository',
    inputSchema: {
      repoPath: SCHEMAS.GIT.STATUS.repoPath,
      remote: z.string().optional().describe("Remote name (default: 'origin')"),
    },
  }, async ({ repoPath, remote }) => {
    try {
      const data = await gitService.gitFetch(repoPath, remote);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // Git Merge
  server.registerTool('git_merge', {
    description: 'Merge a branch into the current branch',
    inputSchema: SCHEMAS.GIT.MERGE,
  }, async ({ repoPath, branch }) => {
    try {
      const data = await gitService.gitMerge(repoPath, branch);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });
}

export { registerGitTools };
