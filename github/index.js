import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import {
  // Repository Operations
  getMyRepos,
  getRepo,
  listForks,
  getRepoTopics,
  createRepo,
  // Issue Operations
  listIssues,
  getIssue,
  listIssueComments,
  // Pull Request Operations
  listPullRequests,
  getPullRequest,
  listPRReviews,
  listPRFiles,
  listPRComments,
  // Branch Operations
  listBranches,
  getBranch,
  createBranch,
  deleteBranch,
  getDefaultBranch,
  // Commit Operations
  listCommits,
  getCommit,
  compareCommits,
  // File Operations
  getFileContents,
  createOrUpdateFile,
  deleteFile,
  getDirectoryContents,
  // Tree Operations
  getTree,
  // Blob Operations
  getBlob,
  createBlob,
  // Repository Advisories
  listRepositoryAdvisories,
  getRepositoryAdvisory,
  // Search Operations
  searchRepositories,
  searchCode,
  searchIssues,
  searchCommits,
  // Tags Operations
  listTags,
  // Diff Operations
  getPullRequestDiff,
  getCommitDiff
} from "./src/github.js";

import {
  // Local Git CLI Operations
  gitInit,
  gitStatus,
  gitAdd,
  gitCommit,
  gitPush,
  gitPull,
  gitClone,
  gitRemoteAdd,
  gitRemoteList,
  gitRemoteRemove,
  gitLog,
  gitDiff,
  gitReset,
  gitCheckout,
  gitBranchList,
  gitBranchDelete,
  gitStash,
  gitTag,
  gitFetch,
  gitMerge
} from "./src/git.js";

const git_mcp_server = new McpServer({
  version: "1.0.0",
  name: "git-commands",
  description: "MCP server for GitHub API operations and local Git CLI commands"
});

// REPOSITORY OPERATIONS 

git_mcp_server.registerTool(
  "get_my_repositories",
  {
    description: "Fetches all repositories for the authenticated user",
    inputSchema: {}
  },
  async () => {
    const data = await getMyRepos();
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "get_repo_details",
  {
    description: "Gets details of a specific repository",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
    }
  },
  async ({ owner, repo }) => {
    const data = await getRepo(owner, repo);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "list_repo_forks",
  {
    description: "Lists all forks of a repository",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
    }
  },
  async ({ owner, repo }) => {
    const data = await listForks(owner, repo);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "get_repo_topics",
  {
    description: "Gets repository topics/tags",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
    }
  },
  async ({ owner, repo }) => {
    const data = await getRepoTopics(owner, repo);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "create_repo",
  {
    description: "Creates a new repository for the authenticated user",
    inputSchema: {
      name: z.string().describe("Repository name"),
      description: z.string().optional().describe("Repository description"),
      isPrivate: z.boolean().optional().describe("Whether the repository is private (default: false)"),
      autoInit: z.boolean().optional().describe("Initialize with a README (default: false)")
    }
  },
  async ({ name, description, isPrivate, autoInit }) => {
    const data = await createRepo(name, description, isPrivate, autoInit);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

// ISSUE OPERATIONS 

git_mcp_server.registerTool(
  "list_repo_issues",
  {
    description: "Lists issues for a specific repository",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
      state: z.string().optional().describe("Issue state: open, closed, or all (default: open)")
    }
  },
  async ({ owner, repo, state }) => {
    const data = await listIssues(owner, repo, state);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "get_issue",
  {
    description: "Gets details of a specific issue",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
      issueNumber: z.number().describe("Issue number")
    }
  },
  async ({ owner, repo, issueNumber }) => {
    const data = await getIssue(owner, repo, issueNumber);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "list_issue_comments",
  {
    description: "Lists all comments on an issue",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
      issueNumber: z.number().describe("Issue number")
    }
  },
  async ({ owner, repo, issueNumber }) => {
    const data = await listIssueComments(owner, repo, issueNumber);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

// PULL REQUEST OPERATIONS

git_mcp_server.registerTool(
  "list_pull_requests",
  {
    description: "Lists pull requests for a repository",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
      state: z.string().optional().describe("PR state: open, closed, or all (default: open)")
    }
  },
  async ({ owner, repo, state }) => {
    const data = await listPullRequests(owner, repo, state);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "get_pull_request",
  {
    description: "Gets details of a specific pull request",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
      prNumber: z.number().describe("Pull request number")
    }
  },
  async ({ owner, repo, prNumber }) => {
    const data = await getPullRequest(owner, repo, prNumber);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "list_pr_reviews",
  {
    description: "Lists reviews for a pull request",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
      prNumber: z.number().describe("Pull request number")
    }
  },
  async ({ owner, repo, prNumber }) => {
    const data = await listPRReviews(owner, repo, prNumber);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "list_pr_files",
  {
    description: "Lists files changed in a pull request",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
      prNumber: z.number().describe("Pull request number")
    }
  },
  async ({ owner, repo, prNumber }) => {
    const data = await listPRFiles(owner, repo, prNumber);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "list_pr_comments",
  {
    description: "Lists comments on a pull request",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
      prNumber: z.number().describe("Pull request number")
    }
  },
  async ({ owner, repo, prNumber }) => {
    const data = await listPRComments(owner, repo, prNumber);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

// BRANCH OPERATIONS 

git_mcp_server.registerTool(
  "list_branches",
  {
    description: "Lists all branches in a repository",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name")
    }
  },
  async ({ owner, repo }) => {
    const data = await listBranches(owner, repo);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "get_branch",
  {
    description: "Gets details of a specific branch",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
      branch: z.string().describe("Branch name")
    }
  },
  async ({ owner, repo, branch }) => {
    const data = await getBranch(owner, repo, branch);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "create_branch",
  {
    description: "Creates a new branch from a specific commit SHA",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
      newBranch: z.string().describe("Name for the new branch"),
      fromSha: z.string().describe("SHA of the commit to branch from")
    }
  },
  async ({ owner, repo, newBranch, fromSha }) => {
    const data = await createBranch(owner, repo, newBranch, fromSha);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "delete_branch",
  {
    description: "Deletes a branch from the repository",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
      branch: z.string().describe("Branch name to delete")
    }
  },
  async ({ owner, repo, branch }) => {
    const data = await deleteBranch(owner, repo, branch);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "get_default_branch",
  {
    description: "Gets the default branch name for a repository",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name")
    }
  },
  async ({ owner, repo }) => {
    const data = await getDefaultBranch(owner, repo);
    return { content: [{ type: "text", text: data }] };
  }
);

// COMMIT OPERATIONS 

git_mcp_server.registerTool(
  "list_commits",
  {
    description: "Lists commits in a repository",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
      sha: z.string().optional().describe("SHA or branch to start listing from"),
      path: z.string().optional().describe("Only commits containing this file path")
    }
  },
  async ({ owner, repo, sha, path }) => {
    const data = await listCommits(owner, repo, sha, path);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "get_commit",
  {
    description: "Gets details of a specific commit",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
      sha: z.string().describe("Commit SHA")
    }
  },
  async ({ owner, repo, sha }) => {
    const data = await getCommit(owner, repo, sha);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "compare_commits",
  {
    description: "Compares two commits",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
      base: z.string().describe("Base commit SHA or branch"),
      head: z.string().describe("Head commit SHA or branch")
    }
  },
  async ({ owner, repo, base, head }) => {
    const data = await compareCommits(owner, repo, base, head);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

// FILE OPERATIONS

git_mcp_server.registerTool(
  "get_file_contents",
  {
    description: "Gets the contents of a file from the repository",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
      path: z.string().describe("File path"),
      ref: z.string().optional().describe("Branch, tag, or commit SHA (default: default branch)")
    }
  },
  async ({ owner, repo, path, ref }) => {
    const data = await getFileContents(owner, repo, path, ref);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "create_or_update_file",
  {
    description: "Creates or updates a file in the repository",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
      path: z.string().describe("File path"),
      message: z.string().describe("Commit message"),
      content: z.string().describe("File content (base64 encoded)"),
      sha: z.string().optional().describe("Blob SHA of the file being replaced (required for updates)"),
      branch: z.string().optional().describe("Branch name (default: default branch)")
    }
  },
  async ({ owner, repo, path, message, content, sha, branch }) => {
    const data = await createOrUpdateFile(owner, repo, path, message, content, sha, branch);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "delete_file",
  {
    description: "Deletes a file from the repository",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
      path: z.string().describe("File path"),
      message: z.string().describe("Commit message"),
      sha: z.string().describe("Blob SHA of the file being deleted"),
      branch: z.string().optional().describe("Branch name (default: default branch)")
    }
  },
  async ({ owner, repo, path, message, sha, branch }) => {
    const data = await deleteFile(owner, repo, path, message, sha, branch);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "get_directory_contents",
  {
    description: "Gets the contents of a directory in the repository",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
      path: z.string().optional().describe("Directory path (default: root)"),
      ref: z.string().optional().describe("Branch, tag, or commit SHA (default: default branch)")
    }
  },
  async ({ owner, repo, path, ref }) => {
    const data = await getDirectoryContents(owner, repo, path, ref);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

// TREE OPERATIONS

git_mcp_server.registerTool(
  "get_tree",
  {
    description: "Gets a git tree object",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
      treeSha: z.string().describe("SHA of the tree"),
      recursive: z.boolean().optional().describe("Get tree recursively (default: false)")
    }
  },
  async ({ owner, repo, treeSha, recursive }) => {
    const data = await getTree(owner, repo, treeSha, recursive);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

// BLOB OPERATIONS

git_mcp_server.registerTool(
  "get_blob",
  {
    description: "Gets a git blob object",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
      fileSha: z.string().describe("SHA of the blob")
    }
  },
  async ({ owner, repo, fileSha }) => {
    const data = await getBlob(owner, repo, fileSha);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "create_blob",
  {
    description: "Creates a git blob object",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
      content: z.string().describe("Blob content"),
      encoding: z.string().optional().describe("Encoding (default: utf-8)")
    }
  },
  async ({ owner, repo, content, encoding }) => {
    const data = await createBlob(owner, repo, content, encoding);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

// REPOSITORY ADVISORIES

git_mcp_server.registerTool(
  "list_repository_advisories",
  {
    description: "Lists security advisories for a repository",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name")
    }
  },
  async ({ owner, repo }) => {
    const data = await listRepositoryAdvisories(owner, repo);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "get_repository_advisory",
  {
    description: "Gets a specific security advisory",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
      ghsaId: z.string().describe("GHSA ID of the advisory")
    }
  },
  async ({ owner, repo, ghsaId }) => {
    const data = await getRepositoryAdvisory(owner, repo, ghsaId);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

// SEARCH OPERATIONS

git_mcp_server.registerTool(
  "search_repositories",
  {
    description: "Searches for repositories on GitHub",
    inputSchema: {
      query: z.string().describe("Search query"),
      sort: z.string().optional().describe("Sort field: stars, forks, updated"),
      order: z.string().optional().describe("Sort order: asc or desc (default: desc)")
    }
  },
  async ({ query, sort, order }) => {
    const data = await searchRepositories(query, sort, order);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "search_code",
  {
    description: "Searches for code on GitHub",
    inputSchema: {
      query: z.string().describe("Search query"),
      sort: z.string().optional().describe("Sort field: indexed"),
      order: z.string().optional().describe("Sort order: asc or desc (default: desc)")
    }
  },
  async ({ query, sort, order }) => {
    const data = await searchCode(query, sort, order);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "search_issues",
  {
    description: "Searches for issues and pull requests on GitHub",
    inputSchema: {
      query: z.string().describe("Search query"),
      sort: z.string().optional().describe("Sort field: comments, created, updated"),
      order: z.string().optional().describe("Sort order: asc or desc (default: desc)")
    }
  },
  async ({ query, sort, order }) => {
    const data = await searchIssues(query, sort, order);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "search_commits",
  {
    description: "Searches for commits on GitHub",
    inputSchema: {
      query: z.string().describe("Search query"),
      sort: z.string().optional().describe("Sort field: author-date, committer-date"),
      order: z.string().optional().describe("Sort order: asc or desc (default: desc)")
    }
  },
  async ({ query, sort, order }) => {
    const data = await searchCommits(query, sort, order);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

// TAGS OPERATIONS

git_mcp_server.registerTool(
  "list_tags",
  {
    description: "Lists all tags in a repository",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name")
    }
  },
  async ({ owner, repo }) => {
    const data = await listTags(owner, repo);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

// DIFF OPERATIONS

git_mcp_server.registerTool(
  "get_pull_request_diff",
  {
    description: "Gets the diff for a pull request",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
      prNumber: z.number().describe("Pull request number")
    }
  },
  async ({ owner, repo, prNumber }) => {
    const data = await getPullRequestDiff(owner, repo, prNumber);
    return { content: [{ type: "text", text: data }] };
  }
);

git_mcp_server.registerTool(
  "get_commit_diff",
  {
    description: "Gets the diff for a commit",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
      sha: z.string().describe("Commit SHA")
    }
  },
  async ({ owner, repo, sha }) => {
    const data = await getCommitDiff(owner, repo, sha);
    return { content: [{ type: "text", text: data }] };
  }
);

// LOCAL GIT CLI OPERATIONS

git_mcp_server.registerTool(
  "git_init",
  {
    description: "Initialize a new Git repository in the specified directory",
    inputSchema: {
      repoPath: z.string().describe("Path where to initialize the repository")
    }
  },
  async ({ repoPath }) => {
    const data = await gitInit(repoPath);
    return { content: [{ type: "text", text: data }] };
  }
);

git_mcp_server.registerTool(
  "git_status",
  {
    description: "Get the status of a Git repository",
    inputSchema: {
      repoPath: z.string().describe("Path to the repository")
    }
  },
  async ({ repoPath }) => {
    const data = await gitStatus(repoPath);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "git_add",
  {
    description: "Stage files for commit (use '.' to add all files)",
    inputSchema: {
      repoPath: z.string().describe("Path to the repository"),
      files: z.union([z.string(), z.array(z.string())]).describe("File(s) to add (use '.' for all files)")
    }
  },
  async ({ repoPath, files }) => {
    const data = await gitAdd(repoPath, files);
    return { content: [{ type: "text", text: data }] };
  }
);

git_mcp_server.registerTool(
  "git_commit",
  {
    description: "Create a commit with the staged changes",
    inputSchema: {
      repoPath: z.string().describe("Path to the repository"),
      message: z.string().describe("Commit message")
    }
  },
  async ({ repoPath, message }) => {
    const data = await gitCommit(repoPath, message);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "git_push",
  {
    description: "Push commits to a remote repository",
    inputSchema: {
      repoPath: z.string().describe("Path to the repository"),
      remote: z.string().describe("Remote name (e.g., 'origin')"),
      branch: z.string().describe("Branch name (e.g., 'main')"),
      setUpstream: z.boolean().optional().describe("Set upstream tracking (default: false)")
    }
  },
  async ({ repoPath, remote, branch, setUpstream }) => {
    const data = await gitPush(repoPath, remote, branch, setUpstream);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "git_pull",
  {
    description: "Pull changes from a remote repository",
    inputSchema: {
      repoPath: z.string().describe("Path to the repository"),
      remote: z.string().describe("Remote name (e.g., 'origin')"),
      branch: z.string().describe("Branch name (e.g., 'main')")
    }
  },
  async ({ repoPath, remote, branch }) => {
    const data = await gitPull(repoPath, remote, branch);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "git_clone",
  {
    description: "Clone a repository from a URL",
    inputSchema: {
      url: z.string().describe("Repository URL"),
      targetPath: z.string().describe("Target directory path")
    }
  },
  async ({ url, targetPath }) => {
    const data = await gitClone(url, targetPath);
    return { content: [{ type: "text", text: data }] };
  }
);

git_mcp_server.registerTool(
  "git_remote_add",
  {
    description: "Add a remote repository",
    inputSchema: {
      repoPath: z.string().describe("Path to the repository"),
      name: z.string().describe("Remote name (e.g., 'origin')"),
      url: z.string().describe("Remote URL")
    }
  },
  async ({ repoPath, name, url }) => {
    const data = await gitRemoteAdd(repoPath, name, url);
    return { content: [{ type: "text", text: data }] };
  }
);

git_mcp_server.registerTool(
  "git_remote_list",
  {
    description: "List all remote repositories",
    inputSchema: {
      repoPath: z.string().describe("Path to the repository")
    }
  },
  async ({ repoPath }) => {
    const data = await gitRemoteList(repoPath);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "git_remote_remove",
  {
    description: "Remove a remote repository",
    inputSchema: {
      repoPath: z.string().describe("Path to the repository"),
      name: z.string().describe("Remote name to remove")
    }
  },
  async ({ repoPath, name }) => {
    const data = await gitRemoteRemove(repoPath, name);
    return { content: [{ type: "text", text: data }] };
  }
);

git_mcp_server.registerTool(
  "git_log",
  {
    description: "Get commit history",
    inputSchema: {
      repoPath: z.string().describe("Path to the repository"),
      maxCount: z.number().optional().describe("Maximum number of commits to retrieve (default: 10)")
    }
  },
  async ({ repoPath, maxCount }) => {
    const data = await gitLog(repoPath, maxCount);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "git_diff",
  {
    description: "Show changes (diff) in the repository",
    inputSchema: {
      repoPath: z.string().describe("Path to the repository"),
      options: z.record(z.any()).optional().describe("Diff options (e.g., { '--cached': null } for staged changes)")
    }
  },
  async ({ repoPath, options }) => {
    const data = await gitDiff(repoPath, options);
    return { content: [{ type: "text", text: data }] };
  }
);

git_mcp_server.registerTool(
  "git_reset",
  {
    description: "Reset to a specific commit",
    inputSchema: {
      repoPath: z.string().describe("Path to the repository"),
      mode: z.string().optional().describe("Reset mode: 'soft', 'mixed', or 'hard' (default: 'mixed')"),
      commit: z.string().optional().describe("Commit reference (default: 'HEAD')")
    }
  },
  async ({ repoPath, mode, commit }) => {
    const data = await gitReset(repoPath, mode, commit);
    return { content: [{ type: "text", text: data }] };
  }
);

git_mcp_server.registerTool(
  "git_checkout",
  {
    description: "Switch to a branch or create a new branch",
    inputSchema: {
      repoPath: z.string().describe("Path to the repository"),
      branch: z.string().describe("Branch name"),
      createNew: z.boolean().optional().describe("Create new branch (default: false)")
    }
  },
  async ({ repoPath, branch, createNew }) => {
    const data = await gitCheckout(repoPath, branch, createNew);
    return { content: [{ type: "text", text: data }] };
  }
);

git_mcp_server.registerTool(
  "git_branch_list",
  {
    description: "List all local branches",
    inputSchema: {
      repoPath: z.string().describe("Path to the repository")
    }
  },
  async ({ repoPath }) => {
    const data = await gitBranchList(repoPath);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "git_branch_delete",
  {
    description: "Delete a local branch",
    inputSchema: {
      repoPath: z.string().describe("Path to the repository"),
      branch: z.string().describe("Branch name to delete"),
      force: z.boolean().optional().describe("Force delete (default: false)")
    }
  },
  async ({ repoPath, branch, force }) => {
    const data = await gitBranchDelete(repoPath, branch, force);
    return { content: [{ type: "text", text: data }] };
  }
);

git_mcp_server.registerTool(
  "git_stash",
  {
    description: "Stash changes in the working directory",
    inputSchema: {
      repoPath: z.string().describe("Path to the repository"),
      action: z.string().optional().describe("Stash action: 'save', 'pop', 'list', 'clear' (default: 'save')")
    }
  },
  async ({ repoPath, action }) => {
    const data = await gitStash(repoPath, action);
    return { content: [{ type: "text", text: typeof data === 'string' ? data : JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "git_tag",
  {
    description: "Create a tag",
    inputSchema: {
      repoPath: z.string().describe("Path to the repository"),
      tagName: z.string().describe("Tag name"),
      message: z.string().optional().describe("Tag message (optional, for annotated tags)")
    }
  },
  async ({ repoPath, tagName, message }) => {
    const data = await gitTag(repoPath, tagName, message);
    return { content: [{ type: "text", text: data }] };
  }
);

git_mcp_server.registerTool(
  "git_fetch",
  {
    description: "Fetch from a remote repository",
    inputSchema: {
      repoPath: z.string().describe("Path to the repository"),
      remote: z.string().optional().describe("Remote name (default: 'origin')")
    }
  },
  async ({ repoPath, remote }) => {
    const data = await gitFetch(repoPath, remote);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

git_mcp_server.registerTool(
  "git_merge",
  {
    description: "Merge a branch into the current branch",
    inputSchema: {
      repoPath: z.string().describe("Path to the repository"),
      branch: z.string().describe("Branch to merge into current branch")
    }
  },
  async ({ repoPath, branch }) => {
    const data = await gitMerge(repoPath, branch);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

// SERVER STARTUP

async function main() {
  const transport = new StdioServerTransport();
  await git_mcp_server.connect(transport);
  console.error("MCP server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
