// Tool definitions for all GitLab MCP tools
// Contains name, description, and input schema for each tool

import { z } from 'zod';

// Complete tool definitions with metadata
// Each tool has: name, description, inputSchema

const TOOL_DEFINITIONS = {
  // ===== GITLAB API TOOLS =====
  GITLAB: {
    // Project Operations
    PROJECT: {
      LIST_PROJECTS: {
        name: 'gitlab_list_projects',
        description: 'Lists all accessible projects',
        inputSchema: {
          membership: z.boolean().optional().describe('Limit to projects where user is a member (default: false)'),
          owned: z.boolean().optional().describe('Limit to projects owned by user (default: false)'),
          starred: z.boolean().optional().describe('Limit to starred projects (default: false)'),
        },
      },
      GET_PROJECT: {
        name: 'gitlab_get_project',
        description: 'Gets details of a specific project',
        inputSchema: {
          projectId: z.string().describe('Project ID or URL-encoded path'),
        },
      },
      CREATE_PROJECT: {
        name: 'gitlab_create_project',
        description: 'Creates a new project',
        inputSchema: {
          name: z.string().describe('Project name'),
          description: z.string().optional().describe('Project description'),
          visibility: z.enum(['private', 'internal', 'public']).optional().describe('Project visibility (default: private)'),
          initializeWithReadme: z.boolean().optional().describe('Initialize with README (default: false)'),
        },
      },
      LIST_PROJECT_FORKS: {
        name: 'gitlab_list_project_forks',
        description: 'Lists all forks of a project',
        inputSchema: {
          projectId: z.string().describe('Project ID or URL-encoded path'),
        },
      },
    },

    // Merge Request Operations
    MERGE_REQUEST: {
      LIST_MERGE_REQUESTS: {
        name: 'gitlab_list_merge_requests',
        description: 'Lists merge requests for a project',
        inputSchema: {
          projectId: z.string().describe('Project ID or URL-encoded path'),
          state: z.enum(['opened', 'closed', 'locked', 'merged', 'all']).optional().describe('MR state filter (default: opened)'),
        },
      },
      GET_MERGE_REQUEST: {
        name: 'gitlab_get_merge_request',
        description: 'Gets details of a specific merge request',
        inputSchema: {
          projectId: z.string().describe('Project ID or URL-encoded path'),
          mergeRequestIid: z.number().describe('Merge request IID (internal ID)'),
        },
      },
      GET_MERGE_REQUEST_DIFF: {
        name: 'gitlab_get_merge_request_diff',
        description: 'Gets the diff/changes for a merge request',
        inputSchema: {
          projectId: z.string().describe('Project ID or URL-encoded path'),
          mergeRequestIid: z.number().describe('Merge request IID (internal ID)'),
        },
      },
      LIST_MR_COMMITS: {
        name: 'gitlab_list_mr_commits',
        description: 'Lists commits in a merge request',
        inputSchema: {
          projectId: z.string().describe('Project ID or URL-encoded path'),
          mergeRequestIid: z.number().describe('Merge request IID (internal ID)'),
        },
      },
      LIST_MR_COMMENTS: {
        name: 'gitlab_list_mr_comments',
        description: 'Lists comments/notes on a merge request',
        inputSchema: {
          projectId: z.string().describe('Project ID or URL-encoded path'),
          mergeRequestIid: z.number().describe('Merge request IID (internal ID)'),
        },
      },
    },

    // Branch Operations
    BRANCH: {
      LIST_BRANCHES: {
        name: 'gitlab_list_branches',
        description: 'Lists all branches in a repository',
        inputSchema: {
          projectId: z.string().describe('Project ID or URL-encoded path'),
        },
      },
      GET_BRANCH: {
        name: 'gitlab_get_branch',
        description: 'Gets details of a specific branch',
        inputSchema: {
          projectId: z.string().describe('Project ID or URL-encoded path'),
          branchName: z.string().describe('Branch name'),
        },
      },
      CREATE_BRANCH: {
        name: 'gitlab_create_branch',
        description: 'Creates a new branch',
        inputSchema: {
          projectId: z.string().describe('Project ID or URL-encoded path'),
          branchName: z.string().describe('Name for the new branch'),
          ref: z.string().describe('Source branch name, tag, or commit SHA'),
        },
      },
      DELETE_BRANCH: {
        name: 'gitlab_delete_branch',
        description: 'Deletes a branch from the repository',
        inputSchema: {
          projectId: z.string().describe('Project ID or URL-encoded path'),
          branchName: z.string().describe('Branch name to delete'),
        },
      },
    },

    // Commit Operations
    COMMIT: {
      LIST_COMMITS: {
        name: 'gitlab_list_commits',
        description: 'Lists commits in a repository',
        inputSchema: {
          projectId: z.string().describe('Project ID or URL-encoded path'),
          refName: z.string().optional().describe('Branch name, tag, or commit SHA (default: default branch)'),
        },
      },
      GET_COMMIT: {
        name: 'gitlab_get_commit',
        description: 'Gets details of a specific commit',
        inputSchema: {
          projectId: z.string().describe('Project ID or URL-encoded path'),
          sha: z.string().describe('Commit SHA'),
        },
      },
      GET_COMMIT_DIFF: {
        name: 'gitlab_get_commit_diff',
        description: 'Gets the diff for a commit',
        inputSchema: {
          projectId: z.string().describe('Project ID or URL-encoded path'),
          sha: z.string().describe('Commit SHA'),
        },
      },
      LIST_COMMIT_COMMENTS: {
        name: 'gitlab_list_commit_comments',
        description: 'Lists comments on a commit',
        inputSchema: {
          projectId: z.string().describe('Project ID or URL-encoded path'),
          sha: z.string().describe('Commit SHA'),
        },
      },
    },

    // File Operations
    FILE: {
      GET_FILE: {
        name: 'gitlab_get_file',
        description: 'Gets the contents of a file from the repository',
        inputSchema: {
          projectId: z.string().describe('Project ID or URL-encoded path'),
          filePath: z.string().describe('URL-encoded file path'),
          ref: z.string().optional().describe('Branch name, tag, or commit SHA (default: default branch)'),
        },
      },
      GET_DIRECTORY: {
        name: 'gitlab_get_directory',
        description: 'Gets the contents/tree of a directory in the repository',
        inputSchema: {
          projectId: z.string().describe('Project ID or URL-encoded path'),
          path: z.string().optional().describe('Directory path (default: root)'),
          ref: z.string().optional().describe('Branch name, tag, or commit SHA (default: default branch)'),
        },
      },
      CREATE_FILE: {
        name: 'gitlab_create_file',
        description: 'Creates a new file in the repository',
        inputSchema: {
          projectId: z.string().describe('Project ID or URL-encoded path'),
          filePath: z.string().describe('URL-encoded file path'),
          branch: z.string().describe('Branch name'),
          content: z.string().describe('File content'),
          commitMessage: z.string().describe('Commit message'),
        },
      },
      UPDATE_FILE: {
        name: 'gitlab_update_file',
        description: 'Updates an existing file in the repository',
        inputSchema: {
          projectId: z.string().describe('Project ID or URL-encoded path'),
          filePath: z.string().describe('URL-encoded file path'),
          branch: z.string().describe('Branch name'),
          content: z.string().describe('New file content'),
          commitMessage: z.string().describe('Commit message'),
        },
      },
    },

    // Issue Operations
    ISSUE: {
      LIST_ISSUES: {
        name: 'gitlab_list_issues',
        description: 'Lists issues for a project',
        inputSchema: {
          projectId: z.string().describe('Project ID or URL-encoded path'),
          state: z.enum(['opened', 'closed', 'all']).optional().describe('Issue state filter (default: opened)'),
        },
      },
      GET_ISSUE: {
        name: 'gitlab_get_issue',
        description: 'Gets details of a specific issue',
        inputSchema: {
          projectId: z.string().describe('Project ID or URL-encoded path'),
          issueIid: z.number().describe('Issue IID (internal ID)'),
        },
      },
      CREATE_ISSUE: {
        name: 'gitlab_create_issue',
        description: 'Creates a new issue',
        inputSchema: {
          projectId: z.string().describe('Project ID or URL-encoded path'),
          title: z.string().describe('Issue title'),
          description: z.string().optional().describe('Issue description'),
        },
      },
      UPDATE_ISSUE: {
        name: 'gitlab_update_issue',
        description: 'Updates an existing issue',
        inputSchema: {
          projectId: z.string().describe('Project ID or URL-encoded path'),
          issueIid: z.number().describe('Issue IID (internal ID)'),
          title: z.string().optional().describe('New issue title'),
          description: z.string().optional().describe('New issue description'),
          stateEvent: z.enum(['close', 'reopen']).optional().describe('State event'),
        },
      },
      LIST_ISSUE_COMMENTS: {
        name: 'gitlab_list_issue_comments',
        description: 'Lists comments/notes on an issue',
        inputSchema: {
          projectId: z.string().describe('Project ID or URL-encoded path'),
          issueIid: z.number().describe('Issue IID (internal ID)'),
        },
      },
    },

    // Search Operations
    SEARCH: {
      SEARCH_CODE: {
        name: 'gitlab_search_code',
        description: 'Searches for code across projects',
        inputSchema: {
          searchQuery: z.string().describe('Search query'),
          projectId: z.string().optional().describe('Limit search to specific project ID'),
        },
      },
      SEARCH_PROJECTS: {
        name: 'gitlab_search_projects',
        description: 'Searches for projects by name',
        inputSchema: {
          searchQuery: z.string().describe('Search query'),
        },
      },
    },
  },
};

export { TOOL_DEFINITIONS };
