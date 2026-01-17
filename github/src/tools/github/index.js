/**
 * GitHub Tools Registration
 * Registers all GitHub-related MCP tools
 */

import { z } from 'zod';
import { SCHEMAS } from '../../constants/index.js';
import * as githubServices from '../../services/github/index.js';
import { formatSuccess, formatError, formatText } from '../../utils/index.js';

/**
 * Register all GitHub tools
 * @param {McpServer} server - MCP server instance
 */
function registerGitHubTools(server) {
  // ===== REPOSITORY OPERATIONS =====
  
  server.registerTool('get_my_repositories', {
    description: 'Fetches all repositories for the authenticated user',
    inputSchema: {},
  }, async () => {
    try {
      const data = await githubServices.getMyRepos();
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  server.registerTool('get_repo_details', {
    description: 'Gets details of a specific repository',
    inputSchema: SCHEMAS.REPOSITORY.GET_REPO,
  }, async ({ owner, repo }) => {
    try {
      const data = await githubServices.getRepo(owner, repo);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  server.registerTool('list_repo_forks', {
    description: 'Lists all forks of a repository',
    inputSchema: SCHEMAS.REPOSITORY.GET_REPO,
  }, async ({ owner, repo }) => {
    try {
      const data = await githubServices.listForks(owner, repo);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  server.registerTool('get_repo_topics', SCHEMAS.REPOSITORY.GET_REPO, async (payload) => {
    try {
      const data = await githubServices.getRepoTopics(payload.owner, payload.repo);

      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  server.registerTool('create_repo', {
    description: 'Creates a new repository for the authenticated user',
    inputSchema: SCHEMAS.REPOSITORY.CREATE_REPO,
  }, async ({ name, description, isPrivate, autoInit }) => {
    try {
      const data = await githubServices.createRepo(name, description, isPrivate, autoInit);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== ISSUE OPERATIONS =====
  
  server.registerTool('list_repo_issues', {
    description: 'Lists issues for a specific repository',
    inputSchema: SCHEMAS.ISSUE.LIST,
  }, async ({ owner, repo, state }) => {
    try {
      const data = await githubServices.listIssues(owner, repo, state);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  server.registerTool('get_issue', {
    description: 'Gets details of a specific issue',
    inputSchema: SCHEMAS.ISSUE.GET,
  }, async ({ owner, repo, issueNumber }) => {
    try {
      const data = await githubServices.getIssue(owner, repo, issueNumber);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  server.registerTool('list_issue_comments', {
    description: 'Lists all comments on an issue',
    inputSchema: SCHEMAS.ISSUE.GET,
  }, async ({ owner, repo, issueNumber }) => {
    try {
      const data = await githubServices.listIssueComments(owner, repo, issueNumber);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== PULL REQUEST OPERATIONS =====
  
  server.registerTool('list_pull_requests', {
    description: 'Lists pull requests for a repository',
    inputSchema: SCHEMAS.PULL_REQUEST.LIST,
  }, async ({ owner, repo, state }) => {
    try {
      const data = await githubServices.listPullRequests(owner, repo, state);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  server.registerTool('get_pull_request', {
    description: 'Gets details of a specific pull request',
    inputSchema: SCHEMAS.PULL_REQUEST.GET,
  }, async ({ owner, repo, prNumber }) => {
    try {
      const data = await githubServices.getPullRequest(owner, repo, prNumber);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  server.registerTool('list_pr_reviews', {
    description: 'Lists reviews for a pull request',
    inputSchema: SCHEMAS.PULL_REQUEST.GET,
  }, async ({ owner, repo, prNumber }) => {
    try {
      const data = await githubServices.listPRReviews(owner, repo, prNumber);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  server.registerTool('list_pr_files', {
    description: 'Lists files changed in a pull request',
    inputSchema: SCHEMAS.PULL_REQUEST.GET,
  }, async ({ owner, repo, prNumber }) => {
    try {
      const data = await githubServices.listPRFiles(owner, repo, prNumber);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  server.registerTool('list_pr_comments', {
    description: 'Lists comments on a pull request',
    inputSchema: SCHEMAS.PULL_REQUEST.GET,
  }, async ({ owner, repo, prNumber }) => {
    try {
      const data = await githubServices.listPRComments(owner, repo, prNumber);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== BRANCH OPERATIONS =====
  
  server.registerTool('list_branches', {
    description: 'Lists all branches in a repository',
    inputSchema: SCHEMAS.BRANCH.LIST,
  }, async ({ owner, repo }) => {
    try {
      const data = await githubServices.listBranches(owner, repo);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  server.registerTool('get_branch', {
    description: 'Gets details of a specific branch',
    inputSchema: SCHEMAS.BRANCH.GET,
  }, async ({ owner, repo, branch }) => {
    try {
      const data = await githubServices.getBranch(owner, repo, branch);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  server.registerTool('create_branch', {
    description: 'Creates a new branch from a specific commit SHA',
    inputSchema: SCHEMAS.BRANCH.CREATE,
  }, async ({ owner, repo, newBranch, fromSha }) => {
    try {
      const data = await githubServices.createBranch(owner, repo, newBranch, fromSha);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  server.registerTool('delete_branch', {
    description: 'Deletes a branch from the repository',
    inputSchema: SCHEMAS.BRANCH.DELETE,
  }, async ({ owner, repo, branch }) => {
    try {
      const data = await githubServices.deleteBranch(owner, repo, branch);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  server.registerTool('get_default_branch', {
    description: 'Gets the default branch name for a repository',
    inputSchema: SCHEMAS.BRANCH.LIST,
  }, async ({ owner, repo }) => {
    try {
      const data = await githubServices.getDefaultBranch(owner, repo);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== COMMIT OPERATIONS =====
  
  server.registerTool('list_commits', {
    description: 'Lists commits in a repository',
    inputSchema: SCHEMAS.COMMIT.LIST,
  }, async ({ owner, repo, sha, path }) => {
    try {
      const data = await githubServices.listCommits(owner, repo, sha, path);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  server.registerTool('get_commit', {
    description: 'Gets details of a specific commit',
    inputSchema: SCHEMAS.COMMIT.GET,
  }, async ({ owner, repo, sha }) => {
    try {
      const data = await githubServices.getCommit(owner, repo, sha);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  server.registerTool('compare_commits', {
    description: 'Compares two commits',
    inputSchema: SCHEMAS.COMMIT.COMPARE,
  }, async ({ owner, repo, base, head }) => {
    try {
      const data = await githubServices.compareCommits(owner, repo, base, head);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== FILE OPERATIONS =====
  
  server.registerTool('get_file_contents', {
    description: 'Gets the contents of a file from the repository',
    inputSchema: SCHEMAS.FILE.GET_CONTENTS,
  }, async ({ owner, repo, path, ref }) => {
    try {
      const data = await githubServices.getFileContents(owner, repo, path, ref);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  server.registerTool('create_or_update_file', {
    description: 'Creates or updates a file in the repository',
    inputSchema: SCHEMAS.FILE.CREATE_OR_UPDATE,
  }, async ({ owner, repo, path, message, content, sha, branch }) => {
    try {
      const data = await githubServices.createOrUpdateFile(owner, repo, path, message, content, sha, branch);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  server.registerTool('delete_file', {
    description: 'Deletes a file from the repository',
    inputSchema: SCHEMAS.FILE.DELETE,
  }, async ({ owner, repo, path, message, sha, branch }) => {
    try {
      const data = await githubServices.deleteFile(owner, repo, path, message, sha, branch);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  server.registerTool('get_directory_contents', {
    description: 'Gets the contents of a directory in the repository',
    inputSchema: {
      owner: z.string().describe('Repository owner/organization'),
      repo: z.string().describe('Repository name'),
      path: z.string().optional().describe('Directory path (default: root)'),
      ref: z.string().optional().describe('Branch, tag, or commit SHA (default: default branch)'),
    },
  }, async ({ owner, repo, path, ref }) => {
    try {
      const data = await githubServices.getDirectoryContents(owner, repo, path, ref);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== TREE OPERATIONS =====
  
  server.registerTool('get_tree', {
    description: 'Gets a git tree object',
    inputSchema: SCHEMAS.TREE.GET,
  }, async ({ owner, repo, treeSha, recursive }) => {
    try {
      const data = await githubServices.getTree(owner, repo, treeSha, recursive);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== BLOB OPERATIONS =====
  
  server.registerTool('get_blob', {
    description: 'Gets a git blob object',
    inputSchema: SCHEMAS.BLOB.GET,
  }, async ({ owner, repo, fileSha }) => {
    try {
      const data = await githubServices.getBlob(owner, repo, fileSha);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  server.registerTool('create_blob', {
    description: 'Creates a git blob object',
    inputSchema: SCHEMAS.BLOB.CREATE,
  }, async ({ owner, repo, content, encoding }) => {
    try {
      const data = await githubServices.createBlob(owner, repo, content, encoding);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== REPOSITORY ADVISORIES =====
  
  server.registerTool('list_repository_advisories', {
    description: 'Lists security advisories for a repository',
    inputSchema: SCHEMAS.REPOSITORY.GET_REPO,
  }, async ({ owner, repo }) => {
    try {
      const data = await githubServices.listRepositoryAdvisories(owner, repo);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  server.registerTool('get_repository_advisory', {
    description: 'Gets a specific security advisory',
    inputSchema: {
      owner: z.string().describe('Repository owner/organization'),
      repo: z.string().describe('Repository name'),
      ghsaId: z.string().describe('GHSA ID of the advisory'),
    },
  }, async ({ owner, repo, ghsaId }) => {
    try {
      const data = await githubServices.getRepositoryAdvisory(owner, repo, ghsaId);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== SEARCH OPERATIONS =====
  
  server.registerTool('search_repositories', {
    description: 'Searches for repositories on GitHub',
    inputSchema: SCHEMAS.SEARCH.REPOSITORIES,
  }, async ({ query, sort, order }) => {
    try {
      const data = await githubServices.searchRepositories(query, sort, order);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  server.registerTool('search_code', {
    description: 'Searches for code on GitHub',
    inputSchema: SCHEMAS.SEARCH.CODE,
  }, async ({ query, sort, order }) => {
    try {
      const data = await githubServices.searchCode(query, sort, order);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  server.registerTool('search_issues', {
    description: 'Searches for issues and pull requests on GitHub',
    inputSchema: SCHEMAS.SEARCH.ISSUES,
  }, async ({ query, sort, order }) => {
    try {
      const data = await githubServices.searchIssues(query, sort, order);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  server.registerTool('search_commits', {
    description: 'Searches for commits on GitHub',
    inputSchema: SCHEMAS.SEARCH.COMMITS,
  }, async ({ query, sort, order }) => {
    try {
      const data = await githubServices.searchCommits(query, sort, order);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== TAGS OPERATIONS =====
  
  server.registerTool('list_tags', {
    description: 'Lists all tags in a repository',
    inputSchema: SCHEMAS.REPOSITORY.GET_REPO,
  }, async ({ owner, repo }) => {
    try {
      const data = await githubServices.listTags(owner, repo);
      return formatSuccess(data);
    } catch (error) {
      return formatError(error);
    }
  });

  // ===== DIFF OPERATIONS =====
  
  server.registerTool('get_pull_request_diff', {
    description: 'Gets the diff for a pull request',
    inputSchema: SCHEMAS.PULL_REQUEST.GET,
  }, async ({ owner, repo, prNumber }) => {
    try {
      const data = await githubServices.getPullRequestDiff(owner, repo, prNumber);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });

  server.registerTool('get_commit_diff', {
    description: 'Gets the diff for a commit',
    inputSchema: SCHEMAS.COMMIT.GET,
  }, async ({ owner, repo, sha }) => {
    try {
      const data = await githubServices.getCommitDiff(owner, repo, sha);
      return formatText(data);
    } catch (error) {
      return formatError(error);
    }
  });
}

export { registerGitHubTools };
