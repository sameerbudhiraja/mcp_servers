// Tool definitions for all MCP tools
// Contains name, description, and input schema for each tool

import { z } from 'zod';

// Complete tool definitions with metadata
// Each tool has: name, description, inputSchema

const TOOL_DEFINITIONS = {
  // ===== GIT CLI TOOLS =====
  GIT: {
    INIT: {
      name: 'git_init',
      description: 'Initialize a new Git repository in the specified directory',
      inputSchema: {
        repoPath: z.string().describe('Path where to initialize the repository'),
      },
    },
    STATUS: {
      name: 'git_status',
      description: 'Get the status of a Git repository',
      inputSchema: {
        repoPath: z.string().describe('Path to the repository'),
      },
    },
    ADD: {
      name: 'git_add',
      description: "Stage files for commit (use '.' to add all files)",
      inputSchema: {
        repoPath: z.string().describe('Path to the repository'),
        files: z.union([z.string(), z.array(z.string())]).describe("File(s) to add (use '.' for all files)"),
      },
    },
    COMMIT: {
      name: 'git_commit',
      description: 'Create a commit with the staged changes',
      inputSchema: {
        repoPath: z.string().describe('Path to the repository'),
        message: z.string().describe('Commit message'),
      },
    },
    PUSH: {
      name: 'git_push',
      description: 'Push commits to a remote repository',
      inputSchema: {
        repoPath: z.string().describe('Path to the repository'),
        remote: z.string().describe("Remote name (e.g., 'origin')"),
        branch: z.string().describe("Branch name (e.g., 'main')"),
        setUpstream: z.boolean().optional().describe('Set upstream tracking (default: false)'),
      },
    },
    PULL: {
      name: 'git_pull',
      description: 'Pull changes from a remote repository',
      inputSchema: {
        repoPath: z.string().describe('Path to the repository'),
        remote: z.string().describe("Remote name (e.g., 'origin')"),
        branch: z.string().describe("Branch name (e.g., 'main')"),
      },
    },
    CLONE: {
      name: 'git_clone',
      description: 'Clone a repository from a URL',
      inputSchema: {
        url: z.string().describe('Repository URL'),
        targetPath: z.string().describe('Target directory path'),
      },
    },
    REMOTE_ADD: {
      name: 'git_remote_add',
      description: 'Add a remote repository',
      inputSchema: {
        repoPath: z.string().describe('Path to the repository'),
        name: z.string().describe("Remote name (e.g., 'origin')"),
        url: z.string().describe('Remote URL'),
      },
    },
    REMOTE_LIST: {
      name: 'git_remote_list',
      description: 'List all remote repositories',
      inputSchema: {
        repoPath: z.string().describe('Path to the repository'),
      },
    },
    REMOTE_REMOVE: {
      name: 'git_remote_remove',
      description: 'Remove a remote repository',
      inputSchema: {
        repoPath: z.string().describe('Path to the repository'),
        name: z.string().describe("Remote name (e.g., 'origin')"),
      },
    },
    LOG: {
      name: 'git_log',
      description: 'Get commit history',
      inputSchema: {
        repoPath: z.string().describe('Path to the repository'),
        maxCount: z.number().optional().describe('Maximum number of commits to retrieve (default: 10)'),
      },
    },
    DIFF: {
      name: 'git_diff',
      description: 'Show changes (diff) in the repository',
      inputSchema: {
        repoPath: z.string().describe('Path to the repository'),
        options: z.record(z.any()).optional().describe("Diff options (e.g., { '--cached': null } for staged changes)"),
      },
    },
    RESET: {
      name: 'git_reset',
      description: 'Reset to a specific commit',
      inputSchema: {
        repoPath: z.string().describe('Path to the repository'),
        mode: z.string().optional().describe("Reset mode: 'soft', 'mixed', or 'hard' (default: 'mixed')"),
        commit: z.string().optional().describe("Commit reference (default: 'HEAD')"),
      },
    },
    CHECKOUT: {
      name: 'git_checkout',
      description: 'Switch to a branch or create a new branch',
      inputSchema: {
        repoPath: z.string().describe('Path to the repository'),
        branch: z.string().describe('Branch name'),
        createNew: z.boolean().optional().describe('Create new branch (default: false)'),
      },
    },
    BRANCH_LIST: {
      name: 'git_branch_list',
      description: 'List all local branches',
      inputSchema: {
        repoPath: z.string().describe('Path to the repository'),
      },
    },
    BRANCH_DELETE: {
      name: 'git_branch_delete',
      description: 'Delete a local branch',
      inputSchema: {
        repoPath: z.string().describe('Path to the repository'),
        branch: z.string().describe('Branch name to delete'),
        force: z.boolean().optional().describe('Force delete (default: false)'),
      },
    },
    STASH: {
      name: 'git_stash',
      description: 'Stash changes in the working directory',
      inputSchema: {
        repoPath: z.string().describe('Path to the repository'),
        action: z.string().optional().describe("Stash action: 'save', 'pop', 'list', 'clear' (default: 'save')"),
      },
    },
    TAG: {
      name: 'git_tag',
      description: 'Create a tag',
      inputSchema: {
        repoPath: z.string().describe('Path to the repository'),
        tagName: z.string().describe('Tag name'),
        message: z.string().optional().describe('Tag message (optional, for annotated tags)'),
      },
    },
    FETCH: {
      name: 'git_fetch',
      description: 'Fetch from a remote repository',
      inputSchema: {
        repoPath: z.string().describe('Path to the repository'),
        remote: z.string().optional().describe("Remote name (default: 'origin')"),
      },
    },
    MERGE: {
      name: 'git_merge',
      description: 'Merge a branch into the current branch',
      inputSchema: {
        repoPath: z.string().describe('Path to the repository'),
        branch: z.string().describe('Branch to merge into current branch'),
      },
    },
  },

  // ===== GITHUB API TOOLS =====
  GITHUB: {
    // Repository Operations
    REPOSITORY: {
      GET_MY_REPOSITORIES: {
        name: 'get_my_repositories',
        description: 'Fetches all repositories for the authenticated user',
        inputSchema: {},
      },
      GET_REPO_DETAILS: {
        name: 'get_repo_details',
        description: 'Gets details of a specific repository',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
        },
      },
      LIST_REPO_FORKS: {
        name: 'list_repo_forks',
        description: 'Lists all forks of a repository',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
        },
      },
      GET_REPO_TOPICS: {
        name: 'get_repo_topics',
        description: 'Gets repository topics/tags',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
        },
      },
      CREATE_REPO: {
        name: 'create_repo',
        description: 'Creates a new repository for the authenticated user',
        inputSchema: {
          name: z.string().describe('Repository name'),
          description: z.string().optional().describe('Repository description'),
          isPrivate: z.boolean().optional().describe('Whether the repository is private (default: false)'),
          autoInit: z.boolean().optional().describe('Initialize with a README (default: false)'),
        },
      },
      LIST_REPOSITORY_ADVISORIES: {
        name: 'list_repository_advisories',
        description: 'Lists security advisories for a repository',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
        },
      },
      GET_REPOSITORY_ADVISORY: {
        name: 'get_repository_advisory',
        description: 'Gets a specific security advisory',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
          ghsaId: z.string().describe('GHSA ID of the advisory'),
        },
      },
      LIST_TAGS: {
        name: 'list_tags',
        description: 'Lists all tags in a repository',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
        },
      },
    },

    // Issue Operations
    ISSUE: {
      LIST_REPO_ISSUES: {
        name: 'list_repo_issues',
        description: 'Lists issues for a specific repository',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
          state: z.string().optional().describe('Issue state: open, closed, or all (default: open)'),
        },
      },
      GET_ISSUE: {
        name: 'get_issue',
        description: 'Gets details of a specific issue',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
          issueNumber: z.number().describe('Issue number'),
        },
      },
      LIST_ISSUE_COMMENTS: {
        name: 'list_issue_comments',
        description: 'Lists all comments on an issue',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
          issueNumber: z.number().describe('Issue number'),
        },
      },
    },

    // Pull Request Operations
    PULL_REQUEST: {
      LIST_PULL_REQUESTS: {
        name: 'list_pull_requests',
        description: 'Lists pull requests for a repository',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
          state: z.string().optional().describe('PR state: open, closed, or all (default: open)'),
        },
      },
      GET_PULL_REQUEST: {
        name: 'get_pull_request',
        description: 'Gets details of a specific pull request',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
          prNumber: z.number().describe('Pull request number'),
        },
      },
      LIST_PR_REVIEWS: {
        name: 'list_pr_reviews',
        description: 'Lists reviews for a pull request',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
          prNumber: z.number().describe('Pull request number'),
        },
      },
      LIST_PR_FILES: {
        name: 'list_pr_files',
        description: 'Lists files changed in a pull request',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
          prNumber: z.number().describe('Pull request number'),
        },
      },
      LIST_PR_COMMENTS: {
        name: 'list_pr_comments',
        description: 'Lists comments on a pull request',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
          prNumber: z.number().describe('Pull request number'),
        },
      },
      GET_PULL_REQUEST_DIFF: {
        name: 'get_pull_request_diff',
        description: 'Gets the diff for a pull request',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
          prNumber: z.number().describe('Pull request number'),
        },
      },
    },

    // Branch Operations
    BRANCH: {
      LIST_BRANCHES: {
        name: 'list_branches',
        description: 'Lists all branches in a repository',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
        },
      },
      GET_BRANCH: {
        name: 'get_branch',
        description: 'Gets details of a specific branch',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
          branch: z.string().describe('Branch name'),
        },
      },
      CREATE_BRANCH: {
        name: 'create_branch',
        description: 'Creates a new branch from a specific commit SHA',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
          newBranch: z.string().describe('Name for the new branch'),
          fromSha: z.string().describe('SHA of the commit to branch from'),
        },
      },
      DELETE_BRANCH: {
        name: 'delete_branch',
        description: 'Deletes a branch from the repository',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
          branch: z.string().describe('Branch name to delete'),
        },
      },
      GET_DEFAULT_BRANCH: {
        name: 'get_default_branch',
        description: 'Gets the default branch name for a repository',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
        },
      },
    },

    // Commit Operations
    COMMIT: {
      LIST_COMMITS: {
        name: 'list_commits',
        description: 'Lists commits in a repository',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
          sha: z.string().optional().describe('SHA or branch to start listing from'),
          path: z.string().optional().describe('Only commits containing this file path'),
        },
      },
      GET_COMMIT: {
        name: 'get_commit',
        description: 'Gets details of a specific commit',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
          sha: z.string().describe('Commit SHA'),
        },
      },
      COMPARE_COMMITS: {
        name: 'compare_commits',
        description: 'Compares two commits',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
          base: z.string().describe('Base commit SHA or branch'),
          head: z.string().describe('Head commit SHA or branch'),
        },
      },
      GET_COMMIT_DIFF: {
        name: 'get_commit_diff',
        description: 'Gets the diff for a commit',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
          sha: z.string().describe('Commit SHA'),
        },
      },
    },

    // File Operations
    FILE: {
      GET_FILE_CONTENTS: {
        name: 'get_file_contents',
        description: 'Gets the contents of a file from the repository',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
          path: z.string().describe('File path'),
          ref: z.string().optional().describe('Branch, tag, or commit SHA (default: default branch)'),
        },
      },
      CREATE_OR_UPDATE_FILE: {
        name: 'create_or_update_file',
        description: 'Creates or updates a file in the repository',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
          path: z.string().describe('File path'),
          message: z.string().describe('Commit message'),
          content: z.string().describe('File content (base64 encoded)'),
          sha: z.string().optional().describe('Blob SHA of the file being replaced (required for updates)'),
          branch: z.string().optional().describe('Branch name (default: default branch)'),
        },
      },
      DELETE_FILE: {
        name: 'delete_file',
        description: 'Deletes a file from the repository',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
          path: z.string().describe('File path'),
          message: z.string().describe('Commit message'),
          sha: z.string().describe('Blob SHA of the file being deleted'),
          branch: z.string().optional().describe('Branch name (default: default branch)'),
        },
      },
      GET_DIRECTORY_CONTENTS: {
        name: 'get_directory_contents',
        description: 'Gets the contents of a directory in the repository',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
          path: z.string().optional().describe('Directory path (default: root)'),
          ref: z.string().optional().describe('Branch, tag, or commit SHA (default: default branch)'),
        },
      },
    },

    // Tree Operations
    TREE: {
      GET_TREE: {
        name: 'get_tree',
        description: 'Gets a git tree object',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
          treeSha: z.string().describe('SHA of the tree'),
          recursive: z.boolean().optional().describe('Get tree recursively (default: false)'),
        },
      },
    },

    // Blob Operations
    BLOB: {
      GET_BLOB: {
        name: 'get_blob',
        description: 'Gets a git blob object',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
          fileSha: z.string().describe('SHA of the blob'),
        },
      },
      CREATE_BLOB: {
        name: 'create_blob',
        description: 'Creates a git blob object',
        inputSchema: {
          owner: z.string().describe('Repository owner/organization'),
          repo: z.string().describe('Repository name'),
          content: z.string().describe('Blob content'),
          encoding: z.string().optional().describe('Encoding (default: utf-8)'),
        },
      },
    },

    // Search Operations
    SEARCH: {
      SEARCH_REPOSITORIES: {
        name: 'search_repositories',
        description: 'Searches for repositories on GitHub',
        inputSchema: {
          query: z.string().describe('Search query'),
          sort: z.string().optional().describe('Sort field: stars, forks, updated'),
          order: z.string().optional().describe('Sort order: asc or desc (default: desc)'),
        },
      },
      SEARCH_CODE: {
        name: 'search_code',
        description: 'Searches for code on GitHub',
        inputSchema: {
          query: z.string().describe('Search query'),
          sort: z.string().optional().describe('Sort field: indexed'),
          order: z.string().optional().describe('Sort order: asc or desc (default: desc)'),
        },
      },
      SEARCH_ISSUES: {
        name: 'search_issues',
        description: 'Searches for issues and pull requests on GitHub',
        inputSchema: {
          query: z.string().describe('Search query'),
          sort: z.string().optional().describe('Sort field: comments, created, updated'),
          order: z.string().optional().describe('Sort order: asc or desc (default: desc)'),
        },
      },
      SEARCH_COMMITS: {
        name: 'search_commits',
        description: 'Searches for commits on GitHub',
        inputSchema: {
          query: z.string().describe('Search query'),
          sort: z.string().optional().describe('Sort field: author-date, committer-date'),
          order: z.string().optional().describe('Sort order: asc or desc (default: desc)'),
        },
      },
    },
  },
};

/**
 * Legacy SCHEMAS export for backward compatibility
 * @deprecated Use TOOL_DEFINITIONS instead
 */
const SCHEMAS = {
  REPOSITORY: {
    GET_REPO: TOOL_DEFINITIONS.GITHUB.REPOSITORY.GET_REPO_DETAILS.inputSchema,
    CREATE_REPO: TOOL_DEFINITIONS.GITHUB.REPOSITORY.CREATE_REPO.inputSchema,
  },
  ISSUE: {
    LIST: TOOL_DEFINITIONS.GITHUB.ISSUE.LIST_REPO_ISSUES.inputSchema,
    GET: TOOL_DEFINITIONS.GITHUB.ISSUE.GET_ISSUE.inputSchema,
  },
  PULL_REQUEST: {
    LIST: TOOL_DEFINITIONS.GITHUB.PULL_REQUEST.LIST_PULL_REQUESTS.inputSchema,
    GET: TOOL_DEFINITIONS.GITHUB.PULL_REQUEST.GET_PULL_REQUEST.inputSchema,
  },
  BRANCH: {
    LIST: TOOL_DEFINITIONS.GITHUB.BRANCH.LIST_BRANCHES.inputSchema,
    GET: TOOL_DEFINITIONS.GITHUB.BRANCH.GET_BRANCH.inputSchema,
    CREATE: TOOL_DEFINITIONS.GITHUB.BRANCH.CREATE_BRANCH.inputSchema,
    DELETE: TOOL_DEFINITIONS.GITHUB.BRANCH.DELETE_BRANCH.inputSchema,
  },
  COMMIT: {
    LIST: TOOL_DEFINITIONS.GITHUB.COMMIT.LIST_COMMITS.inputSchema,
    GET: TOOL_DEFINITIONS.GITHUB.COMMIT.GET_COMMIT.inputSchema,
    COMPARE: TOOL_DEFINITIONS.GITHUB.COMMIT.COMPARE_COMMITS.inputSchema,
  },
  FILE: {
    GET_CONTENTS: TOOL_DEFINITIONS.GITHUB.FILE.GET_FILE_CONTENTS.inputSchema,
    CREATE_OR_UPDATE: TOOL_DEFINITIONS.GITHUB.FILE.CREATE_OR_UPDATE_FILE.inputSchema,
    DELETE: TOOL_DEFINITIONS.GITHUB.FILE.DELETE_FILE.inputSchema,
  },
  TREE: {
    GET: TOOL_DEFINITIONS.GITHUB.TREE.GET_TREE.inputSchema,
  },
  BLOB: {
    GET: TOOL_DEFINITIONS.GITHUB.BLOB.GET_BLOB.inputSchema,
    CREATE: TOOL_DEFINITIONS.GITHUB.BLOB.CREATE_BLOB.inputSchema,
  },
  SEARCH: {
    REPOSITORIES: TOOL_DEFINITIONS.GITHUB.SEARCH.SEARCH_REPOSITORIES.inputSchema,
    CODE: TOOL_DEFINITIONS.GITHUB.SEARCH.SEARCH_CODE.inputSchema,
    ISSUES: TOOL_DEFINITIONS.GITHUB.SEARCH.SEARCH_ISSUES.inputSchema,
    COMMITS: TOOL_DEFINITIONS.GITHUB.SEARCH.SEARCH_COMMITS.inputSchema,
  },
  GIT: {
    INIT: TOOL_DEFINITIONS.GIT.INIT.inputSchema,
    STATUS: TOOL_DEFINITIONS.GIT.STATUS.inputSchema,
    ADD: TOOL_DEFINITIONS.GIT.ADD.inputSchema,
    COMMIT: TOOL_DEFINITIONS.GIT.COMMIT.inputSchema,
    PUSH: TOOL_DEFINITIONS.GIT.PUSH.inputSchema,
    PULL: TOOL_DEFINITIONS.GIT.PULL.inputSchema,
    CLONE: TOOL_DEFINITIONS.GIT.CLONE.inputSchema,
    REMOTE_ADD: TOOL_DEFINITIONS.GIT.REMOTE_ADD.inputSchema,
    CHECKOUT: TOOL_DEFINITIONS.GIT.CHECKOUT.inputSchema,
    BRANCH_DELETE: TOOL_DEFINITIONS.GIT.BRANCH_DELETE.inputSchema,
    RESET: TOOL_DEFINITIONS.GIT.RESET.inputSchema,
    TAG: TOOL_DEFINITIONS.GIT.TAG.inputSchema,
    MERGE: TOOL_DEFINITIONS.GIT.MERGE.inputSchema,
  },
};

// export default SCHEMAS;
export { TOOL_DEFINITIONS, SCHEMAS };
