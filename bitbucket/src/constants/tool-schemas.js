// Tool definitions for all Bitbucket MCP tools
// Contains name, description, and input schema for each tool

import { z } from 'zod';

// Complete tool definitions with metadata
// Each tool has: name, description, inputSchema

const TOOL_DEFINITIONS = {
  // ===== BITBUCKET API TOOLS =====
  BITBUCKET: {
    // Repository Operations
    REPOSITORY: {
      GET_MY_REPOSITORIES: {
        name: 'bitbucket_get_my_repositories',
        description: 'Fetches all repositories for the authenticated user workspace',
        inputSchema: {
          workspace: z.string().describe('Workspace ID or slug'),
        },
      },
      GET_REPO_DETAILS: {
        name: 'bitbucket_get_repo_details',
        description: 'Gets details of a specific repository',
        inputSchema: {
          workspace: z.string().describe('Workspace ID or slug'),
          repoSlug: z.string().describe('Repository slug'),
        },
      },
      LIST_REPO_FORKS: {
        name: 'bitbucket_list_repo_forks',
        description: 'Lists all forks of a repository',
        inputSchema: {
          workspace: z.string().describe('Workspace ID or slug'),
          repoSlug: z.string().describe('Repository slug'),
        },
      },
      CREATE_REPO: {
        name: 'bitbucket_create_repo',
        description: 'Creates a new repository in the workspace',
        inputSchema: {
          workspace: z.string().describe('Workspace ID or slug'),
          repoSlug: z.string().describe('Repository slug'),
          description: z.string().optional().describe('Repository description'),
          isPrivate: z.boolean().optional().describe('Whether the repository is private (default: false)'),
        },
      },
    },

    // Issue Operations
    ISSUE: {
      LIST_REPO_ISSUES: {
        name: 'bitbucket_list_repo_issues',
        description: 'Lists issues for a specific repository',
        inputSchema: {
          workspace: z.string().describe('Workspace ID or slug'),
          repoSlug: z.string().describe('Repository slug'),
          state: z.string().optional().describe('Issue state filter'),
        },
      },
      GET_ISSUE: {
        name: 'bitbucket_get_issue',
        description: 'Gets details of a specific issue',
        inputSchema: {
          workspace: z.string().describe('Workspace ID or slug'),
          repoSlug: z.string().describe('Repository slug'),
          issueId: z.number().describe('Issue ID'),
        },
      },
      LIST_ISSUE_COMMENTS: {
        name: 'bitbucket_list_issue_comments',
        description: 'Lists all comments on an issue',
        inputSchema: {
          workspace: z.string().describe('Workspace ID or slug'),
          repoSlug: z.string().describe('Repository slug'),
          issueId: z.number().describe('Issue ID'),
        },
      },
    },

    // Pull Request Operations
    PULL_REQUEST: {
      LIST_PULL_REQUESTS: {
        name: 'bitbucket_list_pull_requests',
        description: 'Lists pull requests for a repository',
        inputSchema: {
          workspace: z.string().describe('Workspace ID or slug'),
          repoSlug: z.string().describe('Repository slug'),
          state: z.string().optional().describe('PR state: OPEN, MERGED, DECLINED, or SUPERSEDED (default: OPEN)'),
        },
      },
      GET_PULL_REQUEST: {
        name: 'bitbucket_get_pull_request',
        description: 'Gets details of a specific pull request',
        inputSchema: {
          workspace: z.string().describe('Workspace ID or slug'),
          repoSlug: z.string().describe('Repository slug'),
          prId: z.number().describe('Pull request ID'),
        },
      },
      LIST_PR_COMMENTS: {
        name: 'bitbucket_list_pr_comments',
        description: 'Lists comments on a pull request',
        inputSchema: {
          workspace: z.string().describe('Workspace ID or slug'),
          repoSlug: z.string().describe('Repository slug'),
          prId: z.number().describe('Pull request ID'),
        },
      },
      LIST_PR_COMMITS: {
        name: 'bitbucket_list_pr_commits',
        description: 'Lists commits in a pull request',
        inputSchema: {
          workspace: z.string().describe('Workspace ID or slug'),
          repoSlug: z.string().describe('Repository slug'),
          prId: z.number().describe('Pull request ID'),
        },
      },
      GET_PULL_REQUEST_DIFF: {
        name: 'bitbucket_get_pull_request_diff',
        description: 'Gets the diff for a pull request',
        inputSchema: {
          workspace: z.string().describe('Workspace ID or slug'),
          repoSlug: z.string().describe('Repository slug'),
          prId: z.number().describe('Pull request ID'),
        },
      },
    },

    // Branch Operations
    BRANCH: {
      LIST_BRANCHES: {
        name: 'bitbucket_list_branches',
        description: 'Lists all branches in a repository',
        inputSchema: {
          workspace: z.string().describe('Workspace ID or slug'),
          repoSlug: z.string().describe('Repository slug'),
        },
      },
      GET_BRANCH: {
        name: 'bitbucket_get_branch',
        description: 'Gets details of a specific branch',
        inputSchema: {
          workspace: z.string().describe('Workspace ID or slug'),
          repoSlug: z.string().describe('Repository slug'),
          branchName: z.string().describe('Branch name'),
        },
      },
      CREATE_BRANCH: {
        name: 'bitbucket_create_branch',
        description: 'Creates a new branch from a specific commit',
        inputSchema: {
          workspace: z.string().describe('Workspace ID or slug'),
          repoSlug: z.string().describe('Repository slug'),
          branchName: z.string().describe('Name for the new branch'),
          target: z.string().describe('Target hash/commit to branch from'),
        },
      },
      DELETE_BRANCH: {
        name: 'bitbucket_delete_branch',
        description: 'Deletes a branch from the repository',
        inputSchema: {
          workspace: z.string().describe('Workspace ID or slug'),
          repoSlug: z.string().describe('Repository slug'),
          branchName: z.string().describe('Branch name to delete'),
        },
      },
    },

    // Commit Operations
    COMMIT: {
      LIST_COMMITS: {
        name: 'bitbucket_list_commits',
        description: 'Lists commits in a repository',
        inputSchema: {
          workspace: z.string().describe('Workspace ID or slug'),
          repoSlug: z.string().describe('Repository slug'),
          branch: z.string().optional().describe('Branch name to list commits from'),
        },
      },
      GET_COMMIT: {
        name: 'bitbucket_get_commit',
        description: 'Gets details of a specific commit',
        inputSchema: {
          workspace: z.string().describe('Workspace ID or slug'),
          repoSlug: z.string().describe('Repository slug'),
          commit: z.string().describe('Commit hash'),
        },
      },
      GET_COMMIT_DIFF: {
        name: 'bitbucket_get_commit_diff',
        description: 'Gets the diff for a commit',
        inputSchema: {
          workspace: z.string().describe('Workspace ID or slug'),
          repoSlug: z.string().describe('Repository slug'),
          spec: z.string().describe('Diff spec (e.g., commit hash)'),
        },
      },
    },

    // File Operations
    FILE: {
      GET_FILE_CONTENTS: {
        name: 'bitbucket_get_file_contents',
        description: 'Gets the contents of a file from the repository',
        inputSchema: {
          workspace: z.string().describe('Workspace ID or slug'),
          repoSlug: z.string().describe('Repository slug'),
          path: z.string().describe('File path'),
          commit: z.string().optional().describe('Commit hash (default: HEAD)'),
        },
      },
      GET_DIRECTORY_CONTENTS: {
        name: 'bitbucket_get_directory_contents',
        description: 'Gets the contents of a directory in the repository',
        inputSchema: {
          workspace: z.string().describe('Workspace ID or slug'),
          repoSlug: z.string().describe('Repository slug'),
          path: z.string().optional().describe('Directory path (default: root)'),
          commit: z.string().optional().describe('Commit hash (default: HEAD)'),
        },
      },
    },

    // Search Operations
    SEARCH: {
      SEARCH_CODE: {
        name: 'bitbucket_search_code',
        description: 'Searches for code in workspace repositories',
        inputSchema: {
          workspace: z.string().describe('Workspace ID or slug'),
          searchQuery: z.string().describe('Search query'),
        },
      },
    },
  },
};

export { TOOL_DEFINITIONS };
