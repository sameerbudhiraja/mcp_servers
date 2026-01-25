// Bitbucket Tools Registration
// Registers all Bitbucket-related MCP tools

import { TOOL_DEFINITIONS } from '../../constants/index.js';
import * as bitbucketServices from '../../services/bitbucket/index.js';
import { formatSuccess, formatError, formatText } from '../../utils/index.js';

// Get Bitbucket tool definitions
const { BITBUCKET } = TOOL_DEFINITIONS;

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
 * Register all Bitbucket tools
 * @param {McpServer} server - MCP server instance
 */
function registerBitbucketTools(server) {
  // ===== REPOSITORY OPERATIONS =====
  
  registerTool(server, BITBUCKET.REPOSITORY.GET_MY_REPOSITORIES, async ({ workspace }) => {
    try {
      const data = await bitbucketServices.getMyRepos(workspace);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.REPOSITORY.GET_REPO_DETAILS, async ({ workspace, repoSlug }) => {
    try {
      const data = await bitbucketServices.getRepo(workspace, repoSlug);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.REPOSITORY.LIST_REPO_FORKS, async ({ workspace, repoSlug }) => {
    try {
      const data = await bitbucketServices.listForks(workspace, repoSlug);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.REPOSITORY.CREATE_REPO, async ({ workspace, repoSlug, description, isPrivate }) => {
    try {
      const data = await bitbucketServices.createRepo(workspace, repoSlug, description, isPrivate);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== ISSUE OPERATIONS =====
  
  registerTool(server, BITBUCKET.ISSUE.LIST_REPO_ISSUES, async ({ workspace, repoSlug, state }) => {
    try {
      const data = await bitbucketServices.listIssues(workspace, repoSlug, state);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.ISSUE.GET_ISSUE, async ({ workspace, repoSlug, issueId }) => {
    try {
      const data = await bitbucketServices.getIssue(workspace, repoSlug, issueId);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.ISSUE.LIST_ISSUE_COMMENTS, async ({ workspace, repoSlug, issueId }) => {
    try {
      const data = await bitbucketServices.listIssueComments(workspace, repoSlug, issueId);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== PULL REQUEST OPERATIONS =====
  
  registerTool(server, BITBUCKET.PULL_REQUEST.LIST_PULL_REQUESTS, async ({ workspace, repoSlug, state }) => {
    try {
      const data = await bitbucketServices.listPullRequests(workspace, repoSlug, state);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.PULL_REQUEST.GET_PULL_REQUEST, async ({ workspace, repoSlug, prId }) => {
    try {
      const data = await bitbucketServices.getPullRequest(workspace, repoSlug, prId);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.PULL_REQUEST.LIST_PR_COMMENTS, async ({ workspace, repoSlug, prId }) => {
    try {
      const data = await bitbucketServices.listPRComments(workspace, repoSlug, prId);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.PULL_REQUEST.LIST_PR_COMMITS, async ({ workspace, repoSlug, prId }) => {
    try {
      const data = await bitbucketServices.listPRCommits(workspace, repoSlug, prId);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.PULL_REQUEST.GET_PULL_REQUEST_DIFF, async ({ workspace, repoSlug, prId }) => {
    try {
      const data = await bitbucketServices.getPullRequestDiff(workspace, repoSlug, prId);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== BRANCH OPERATIONS =====
  
  registerTool(server, BITBUCKET.BRANCH.LIST_BRANCHES, async ({ workspace, repoSlug }) => {
    try {
      const data = await bitbucketServices.listBranches(workspace, repoSlug);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.BRANCH.GET_BRANCH, async ({ workspace, repoSlug, branchName }) => {
    try {
      const data = await bitbucketServices.getBranch(workspace, repoSlug, branchName);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.BRANCH.CREATE_BRANCH, async ({ workspace, repoSlug, branchName, target }) => {
    try {
      const data = await bitbucketServices.createBranch(workspace, repoSlug, branchName, target);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.BRANCH.DELETE_BRANCH, async ({ workspace, repoSlug, branchName }) => {
    try {
      const data = await bitbucketServices.deleteBranch(workspace, repoSlug, branchName);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== COMMIT OPERATIONS =====
  
  registerTool(server, BITBUCKET.COMMIT.LIST_COMMITS, async ({ workspace, repoSlug, branch }) => {
    try {
      const data = await bitbucketServices.listCommits(workspace, repoSlug, branch);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.COMMIT.GET_COMMIT, async ({ workspace, repoSlug, commit }) => {
    try {
      const data = await bitbucketServices.getCommit(workspace, repoSlug, commit);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.COMMIT.GET_COMMIT_DIFF, async ({ workspace, repoSlug, spec }) => {
    try {
      const data = await bitbucketServices.getCommitDiff(workspace, repoSlug, spec);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== FILE OPERATIONS =====
  
  registerTool(server, BITBUCKET.FILE.GET_FILE_CONTENTS, async ({ workspace, repoSlug, path, commit }) => {
    try {
      const data = await bitbucketServices.getFileContents(workspace, repoSlug, path, commit);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.FILE.GET_DIRECTORY_CONTENTS, async ({ workspace, repoSlug, path, commit }) => {
    try {
      const data = await bitbucketServices.getDirectoryContents(workspace, repoSlug, path, commit);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== SEARCH OPERATIONS =====
  
  registerTool(server, BITBUCKET.SEARCH.SEARCH_CODE, async ({ workspace, searchQuery }) => {
    try {
      const data = await bitbucketServices.searchCode(workspace, searchQuery);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });
}

export { registerBitbucketTools };
