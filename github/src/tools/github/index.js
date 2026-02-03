// GitHub Tools Registration
// Registers all GitHub-related MCP tools


import { TOOL_DEFINITIONS } from '../../constants/index.js';
import * as githubServices from '../../services/github/index.js';
import { formatSuccess, formatError, formatText } from '../../utils/index.js';

// Get GitHub tool definitions
const {GITHUB} = TOOL_DEFINITIONS;

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
 * Register all GitHub tools
 * @param {McpServer} server - MCP server instance
 */
function registerGitHubTools(server) {
  // ===== REPOSITORY OPERATIONS =====
  
  registerTool(server, GITHUB.REPOSITORY.GET_MY_REPOSITORIES, async ({ payload }) => {
    try {
      const data = await githubServices.getMyRepos();
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.REPOSITORY.GET_REPO_DETAILS, async ({ payload }) => {
    try {
      const data = await githubServices.getRepo(payload.owner, payload.repo);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.REPOSITORY.LIST_REPO_FORKS, async ({ payload }) => {
    try {
      const data = await githubServices.listForks(payload.owner, payload.repo);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.REPOSITORY.GET_REPO_TOPICS, async ({ payload }) => {
    try {
      const data = await githubServices.getRepoTopics(payload.owner, payload.repo);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.REPOSITORY.CREATE_REPO, async ({ payload }) => {
    try {
      const data = await githubServices.createRepo(payload.name, payload.description, payload.isPrivate, payload.autoInit);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== ISSUE OPERATIONS =====
  
  registerTool(server, GITHUB.ISSUE.LIST_REPO_ISSUES, async ({ payload }) => {
    try {
      const data = await githubServices.listIssues(payload.owner, payload.repo, payload.state);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.ISSUE.GET_ISSUE, async ({ payload }) => {
    try {
      const data = await githubServices.getIssue(payload.owner, payload.repo, payload.issueNumber);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.ISSUE.LIST_ISSUE_COMMENTS, async ({ payload }) => {
    try {
      const data = await githubServices.listIssueComments(payload.owner, payload.repo, payload.issueNumber);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== PULL REQUEST OPERATIONS =====
  
  registerTool(server, GITHUB.PULL_REQUEST.LIST_PULL_REQUESTS, async ({ payload }) => {
    try {
      const data = await githubServices.listPullRequests(payload.owner, payload.repo, payload.state);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.PULL_REQUEST.GET_PULL_REQUEST, async ({ payload }) => {
    try {
      const data = await githubServices.getPullRequest(payload.owner, payload.repo, payload.prNumber);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.PULL_REQUEST.LIST_PR_REVIEWS, async ({ payload }) => {
    try {
      const data = await githubServices.listPRReviews(payload.owner, payload.repo, payload.prNumber);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.PULL_REQUEST.LIST_PR_FILES, async ({ payload }) => {
    try {
      const data = await githubServices.listPRFiles(payload.owner, payload.repo, payload.prNumber);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.PULL_REQUEST.LIST_PR_COMMENTS, async ({ payload }) => {
    try {
      const data = await githubServices.listPRComments(payload.owner, payload.repo, payload.prNumber);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== BRANCH OPERATIONS =====
  
  registerTool(server, GITHUB.BRANCH.LIST_BRANCHES, async ({ payload }) => {
    try {
      const data = await githubServices.listBranches(payload.owner, payload.repo);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.BRANCH.GET_BRANCH, async ({ payload }) => {
    try {
      const data = await githubServices.getBranch(payload.owner, payload.repo, payload.branch);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.BRANCH.CREATE_BRANCH, async ({ payload }) => {
    try {
      const data = await githubServices.createBranch(payload.owner, payload.repo, payload.newBranch, payload.fromSha);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.BRANCH.DELETE_BRANCH, async ({ payload }) => {
    try {
      const data = await githubServices.deleteBranch(payload.owner, payload.repo, payload.branch);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.BRANCH.GET_DEFAULT_BRANCH, async ({ payload }) => {
    try {
      const data = await githubServices.getDefaultBranch(payload.owner, payload.repo);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== COMMIT OPERATIONS =====
  
  registerTool(server, GITHUB.COMMIT.LIST_COMMITS, async ({ payload }) => {
    try {
      const data = await githubServices.listCommits(payload.owner, payload.repo, payload.sha, payload.path);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.COMMIT.GET_COMMIT, async ({ payload }) => {
    try {
      const data = await githubServices.getCommit(payload.owner, payload.repo, payload.sha);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.COMMIT.COMPARE_COMMITS, async ({ payload }) => {
    try {
      const data = await githubServices.compareCommits(payload.owner, payload.repo, payload.base, payload.head);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== FILE OPERATIONS =====
  
  registerTool(server, GITHUB.FILE.GET_FILE_CONTENTS, async ({ payload }) => {
    try {
      const data = await githubServices.getFileContents(payload.owner, payload.repo, payload.path, payload.ref);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.FILE.CREATE_OR_UPDATE_FILE, async ({ payload }) => {
    try {
      const data = await githubServices.createOrUpdateFile(payload.owner, payload.repo, payload.path, payload.message, payload.content, payload.sha, payload.branch);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.FILE.DELETE_FILE, async ({ payload }) => {
    try {
      const data = await githubServices.deleteFile(payload.owner, payload.repo, payload.path, payload.message, payload.sha, payload.branch);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.FILE.GET_DIRECTORY_CONTENTS, async ({ payload }) => {
    try {
      const data = await githubServices.getDirectoryContents(payload.owner, payload.repo, payload.path, payload.ref);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== TREE OPERATIONS =====
  
  registerTool(server, GITHUB.TREE.GET_TREE, async ({ payload }) => {
    try {
      const data = await githubServices.getTree(payload.owner, payload.repo, payload.treeSha, payload.recursive);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== BLOB OPERATIONS =====
  
  registerTool(server, GITHUB.BLOB.GET_BLOB, async ({ payload }) => {
    try {
      const data = await githubServices.getBlob(payload.owner, payload.repo, payload.fileSha);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.BLOB.CREATE_BLOB, async ({ payload }) => {
    try {
      const data = await githubServices.createBlob(payload.owner, payload.repo, payload.content, payload.encoding);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== REPOSITORY ADVISORIES =====
  
  registerTool(server, GITHUB.REPOSITORY.LIST_REPOSITORY_ADVISORIES, async ({ payload }) => {
    try {
      const data = await githubServices.listRepositoryAdvisories(payload.owner, payload.repo);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.REPOSITORY.GET_REPOSITORY_ADVISORY, async ({ payload }) => {
    try {
      const data = await githubServices.getRepositoryAdvisory(payload.owner, payload.repo, payload.ghsaId);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== SEARCH OPERATIONS =====
  
  registerTool(server, GITHUB.SEARCH.SEARCH_REPOSITORIES, async ({ payload }) => {
    try {
      const data = await githubServices.searchRepositories(payload.query, payload.sort, payload.order);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.SEARCH.SEARCH_CODE, async ({ payload }) => {
    try {
      const data = await githubServices.searchCode(payload.query, payload.sort, payload.order);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.SEARCH.SEARCH_ISSUES, async ({ payload }) => {
    try {
      const data = await githubServices.searchIssues(payload.query, payload.sort, payload.order);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.SEARCH.SEARCH_COMMITS, async ({ payload }) => {
    try {
      const data = await githubServices.searchCommits(payload.query, payload.sort, payload.order);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== TAGS OPERATIONS =====
  
  registerTool(server, GITHUB.REPOSITORY.LIST_TAGS, async ({ payload }) => {
    try {
      const data = await githubServices.listTags(payload.owner, payload.repo);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== DIFF OPERATIONS =====
  
  registerTool(server, GITHUB.PULL_REQUEST.GET_PULL_REQUEST_DIFF, async ({ payload }) => {
    try {
      const data = await githubServices.getPullRequestDiff(payload.owner, payload.repo, payload.prNumber);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.COMMIT.GET_COMMIT_DIFF, async ({ payload }) => {
    try {
      const data = await githubServices.getCommitDiff(payload.owner, payload.repo, payload.sha);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });
}

export { registerGitHubTools };
