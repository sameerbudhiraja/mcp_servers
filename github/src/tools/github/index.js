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
  
  registerTool(server, GITHUB.REPOSITORY.GET_MY_REPOSITORIES, async () => {
    try {
      const data = await githubServices.getMyRepos();
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.REPOSITORY.GET_REPO_DETAILS, async ({ owner, repo }) => {
    try {
      const data = await githubServices.getRepo(owner, repo);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.REPOSITORY.LIST_REPO_FORKS, async ({ owner, repo }) => {
    try {
      const data = await githubServices.listForks(owner, repo);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.REPOSITORY.GET_REPO_TOPICS, async ({ owner, repo }) => {
    try {
      const data = await githubServices.getRepoTopics(owner, repo);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.REPOSITORY.CREATE_REPO, async ({ name, description, isPrivate, autoInit }) => {
    try {
      const data = await githubServices.createRepo(name, description, isPrivate, autoInit);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== ISSUE OPERATIONS =====
  
  registerTool(server, GITHUB.ISSUE.LIST_REPO_ISSUES, async ({ owner, repo, state }) => {
    try {
      const data = await githubServices.listIssues(owner, repo, state);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.ISSUE.GET_ISSUE, async ({ owner, repo, issueNumber }) => {
    try {
      const data = await githubServices.getIssue(owner, repo, issueNumber);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.ISSUE.LIST_ISSUE_COMMENTS, async ({ owner, repo, issueNumber }) => {
    try {
      const data = await githubServices.listIssueComments(owner, repo, issueNumber);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== PULL REQUEST OPERATIONS =====
  
  registerTool(server, GITHUB.PULL_REQUEST.LIST_PULL_REQUESTS, async ({ owner, repo, state }) => {
    try {
      const data = await githubServices.listPullRequests(owner, repo, state);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.PULL_REQUEST.GET_PULL_REQUEST, async ({ owner, repo, prNumber }) => {
    try {
      const data = await githubServices.getPullRequest(owner, repo, prNumber);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.PULL_REQUEST.LIST_PR_REVIEWS, async ({ owner, repo, prNumber }) => {
    try {
      const data = await githubServices.listPRReviews(owner, repo, prNumber);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.PULL_REQUEST.LIST_PR_FILES, async ({ owner, repo, prNumber }) => {
    try {
      const data = await githubServices.listPRFiles(owner, repo, prNumber);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.PULL_REQUEST.LIST_PR_COMMENTS, async ({ owner, repo, prNumber }) => {
    try {
      const data = await githubServices.listPRComments(owner, repo, prNumber);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== BRANCH OPERATIONS =====
  
  registerTool(server, GITHUB.BRANCH.LIST_BRANCHES, async ({ owner, repo }) => {
    try {
      const data = await githubServices.listBranches(owner, repo);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.BRANCH.GET_BRANCH, async ({ owner, repo, branch }) => {
    try {
      const data = await githubServices.getBranch(owner, repo, branch);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.BRANCH.CREATE_BRANCH, async ({ owner, repo, newBranch, fromSha }) => {
    try {
      const data = await githubServices.createBranch(owner, repo, newBranch, fromSha);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.BRANCH.DELETE_BRANCH, async ({ owner, repo, branch }) => {
    try {
      const data = await githubServices.deleteBranch(owner, repo, branch);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.BRANCH.GET_DEFAULT_BRANCH, async ({ owner, repo }) => {
    try {
      const data = await githubServices.getDefaultBranch(owner, repo);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== COMMIT OPERATIONS =====
  
  registerTool(server, GITHUB.COMMIT.LIST_COMMITS, async ({ owner, repo, sha, path }) => {
    try {
      const data = await githubServices.listCommits(owner, repo, sha, path);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.COMMIT.GET_COMMIT, async ({ owner, repo, sha }) => {
    try {
      const data = await githubServices.getCommit(owner, repo, sha);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.COMMIT.COMPARE_COMMITS, async ({ owner, repo, base, head }) => {
    try {
      const data = await githubServices.compareCommits(owner, repo, base, head);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== FILE OPERATIONS =====
  
  registerTool(server, GITHUB.FILE.GET_FILE_CONTENTS, async ({ owner, repo, path, ref }) => {
    try {
      const data = await githubServices.getFileContents(owner, repo, path, ref);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.FILE.CREATE_OR_UPDATE_FILE, async ({ owner, repo, path, message, content, sha, branch }) => {
    try {
      const data = await githubServices.createOrUpdateFile(owner, repo, path, message, content, sha, branch);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.FILE.DELETE_FILE, async ({ owner, repo, path, message, sha, branch }) => {
    try {
      const data = await githubServices.deleteFile(owner, repo, path, message, sha, branch);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.FILE.GET_DIRECTORY_CONTENTS, async ({ owner, repo, path, ref }) => {
    try {
      const data = await githubServices.getDirectoryContents(owner, repo, path, ref);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== TREE OPERATIONS =====
  
  registerTool(server, GITHUB.TREE.GET_TREE, async ({ owner, repo, treeSha, recursive }) => {
    try {
      const data = await githubServices.getTree(owner, repo, treeSha, recursive);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== BLOB OPERATIONS =====
  
  registerTool(server, GITHUB.BLOB.GET_BLOB, async ({ owner, repo, fileSha }) => {
    try {
      const data = await githubServices.getBlob(owner, repo, fileSha);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.BLOB.CREATE_BLOB, async ({ owner, repo, content, encoding }) => {
    try {
      const data = await githubServices.createBlob(owner, repo, content, encoding);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== REPOSITORY ADVISORIES =====
  
  registerTool(server, GITHUB.REPOSITORY.LIST_REPOSITORY_ADVISORIES, async ({ owner, repo }) => {
    try {
      const data = await githubServices.listRepositoryAdvisories(owner, repo);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.REPOSITORY.GET_REPOSITORY_ADVISORY, async ({ owner, repo, ghsaId }) => {
    try {
      const data = await githubServices.getRepositoryAdvisory(owner, repo, ghsaId);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== SEARCH OPERATIONS =====
  
  registerTool(server, GITHUB.SEARCH.SEARCH_REPOSITORIES, async ({ query, sort, order }) => {
    try {
      const data = await githubServices.searchRepositories(query, sort, order);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.SEARCH.SEARCH_CODE, async ({ query, sort, order }) => {
    try {
      const data = await githubServices.searchCode(query, sort, order);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.SEARCH.SEARCH_ISSUES, async ({ query, sort, order }) => {
    try {
      const data = await githubServices.searchIssues(query, sort, order);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.SEARCH.SEARCH_COMMITS, async ({ query, sort, order }) => {
    try {
      const data = await githubServices.searchCommits(query, sort, order);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== TAGS OPERATIONS =====
  
  registerTool(server, GITHUB.REPOSITORY.LIST_TAGS, async ({ owner, repo }) => {
    try {
      const data = await githubServices.listTags(owner, repo);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== DIFF OPERATIONS =====
  
  registerTool(server, GITHUB.PULL_REQUEST.GET_PULL_REQUEST_DIFF, async ({ owner, repo, prNumber }) => {
    try {
      const data = await githubServices.getPullRequestDiff(owner, repo, prNumber);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  registerTool(server, GITHUB.COMMIT.GET_COMMIT_DIFF, async ({ owner, repo, sha }) => {
    try {
      const data = await githubServices.getCommitDiff(owner, repo, sha);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });
}

export { registerGitHubTools };
