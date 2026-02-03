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
  
  registerTool(server, BITBUCKET.REPOSITORY.GET_MY_REPOSITORIES, async ({ payload }) => {
    try {
      const data = await bitbucketServices.getMyRepos(payload.workspace);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.REPOSITORY.GET_REPO_DETAILS, async ({ payload }) => {
    try {
      const data = await bitbucketServices.getRepo(payload.workspace, payload.repoSlug);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.REPOSITORY.LIST_REPO_FORKS, async ({ payload }) => {
    try {
      const data = await bitbucketServices.listForks(payload.workspace, payload.repoSlug);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.REPOSITORY.CREATE_REPO, async ({ payload }) => {
    try {
      const data = await bitbucketServices.createRepo(payload.workspace, payload.repoSlug, payload.description, payload.isPrivate);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== ISSUE OPERATIONS =====
  
  registerTool(server, BITBUCKET.ISSUE.LIST_REPO_ISSUES, async ({ payload }) => {
    try {
      const data = await bitbucketServices.listIssues(payload.workspace, payload.repoSlug, payload.state);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.ISSUE.GET_ISSUE, async ({ payload }) => {
    try {
      const data = await bitbucketServices.getIssue(payload.workspace, payload.repoSlug, payload.issueId);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.ISSUE.LIST_ISSUE_COMMENTS, async ({ payload }) => {
    try {
      const data = await bitbucketServices.listIssueComments(payload.workspace, payload.repoSlug, payload.issueId);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== PULL REQUEST OPERATIONS =====
  
  registerTool(server, BITBUCKET.PULL_REQUEST.LIST_PULL_REQUESTS, async ({ payload }) => {
    try {
      const data = await bitbucketServices.listPullRequests(payload.workspace, payload.repoSlug, payload.state);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.PULL_REQUEST.GET_PULL_REQUEST, async ({ payload }) => {
    try {
      const data = await bitbucketServices.getPullRequest(payload.workspace, payload.repoSlug, payload.prId);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.PULL_REQUEST.LIST_PR_COMMENTS, async ({ payload }) => {
    try {
      const data = await bitbucketServices.listPRComments(payload.workspace, payload.repoSlug, payload.prId);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.PULL_REQUEST.LIST_PR_COMMITS, async ({ payload }) => {
    try {
      const data = await bitbucketServices.listPRCommits(payload.workspace, payload.repoSlug, payload.prId);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.PULL_REQUEST.GET_PULL_REQUEST_DIFF, async ({ payload }) => {
    try {
      const data = await bitbucketServices.getPullRequestDiff(payload.workspace, payload.repoSlug, payload.prId);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== BRANCH OPERATIONS =====
  
  registerTool(server, BITBUCKET.BRANCH.LIST_BRANCHES, async ({ payload }) => {
    try {
      const data = await bitbucketServices.listBranches(payload.workspace, payload.repoSlug);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.BRANCH.GET_BRANCH, async ({ payload }) => {
    try {
      const data = await bitbucketServices.getBranch(payload.workspace, payload.repoSlug, payload.branchName);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.BRANCH.CREATE_BRANCH, async ({ payload }) => {
    try {
      const data = await bitbucketServices.createBranch(payload.workspace, payload.repoSlug, payload.branchName, payload.target);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.BRANCH.DELETE_BRANCH, async ({ payload }) => {
    try {
      const data = await bitbucketServices.deleteBranch(payload.workspace, payload.repoSlug, payload.branchName);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== COMMIT OPERATIONS =====
  
  registerTool(server, BITBUCKET.COMMIT.LIST_COMMITS, async ({ payload }) => {
    try {
      const data = await bitbucketServices.listCommits(payload.workspace, payload.repoSlug, payload.branch);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.COMMIT.GET_COMMIT, async ({ payload }) => {
    try {
      const data = await bitbucketServices.getCommit(payload.workspace, payload.repoSlug, payload.commit);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.COMMIT.GET_COMMIT_DIFF, async ({ payload }) => {
    try {
      const data = await bitbucketServices.getCommitDiff(payload.workspace, payload.repoSlug, payload.spec);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== FILE OPERATIONS =====
  
  registerTool(server, BITBUCKET.FILE.GET_FILE_CONTENTS, async ({ payload }) => {
    try {
      const data = await bitbucketServices.getFileContents(payload.workspace, payload.repoSlug, payload.path, payload.commit);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, BITBUCKET.FILE.GET_DIRECTORY_CONTENTS, async ({ payload }) => {
    try {
      const data = await bitbucketServices.getDirectoryContents(payload.workspace, payload.repoSlug, payload.path, payload.commit);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== SEARCH OPERATIONS =====
  
  registerTool(server, BITBUCKET.SEARCH.SEARCH_CODE, async ({ payload }) => {
    try {
      const data = await bitbucketServices.searchCode(payload.workspace, payload.searchQuery);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });
}

export { registerBitbucketTools };
