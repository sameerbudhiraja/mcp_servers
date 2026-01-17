// Zod validation schemas for all MCP tools

import { z } from 'zod';

const SCHEMAS = {
  // Repository Schemas
  REPOSITORY: {
    GET_REPO: { 
      description: 'Gets repository topics/tags',
      inputSchema: {
        owner: z.string().describe('Repository owner/organization'),
        repo: z.string().describe('Repository name'),
      },
    },
    CREATE_REPO: {
      name: z.string().describe('Repository name'),
      description: z.string().optional().describe('Repository description'),
      isPrivate: z.boolean().optional().describe('Whether the repository is private (default: false)'),
      autoInit: z.boolean().optional().describe('Initialize with a README (default: false)'),
    },
  },

  // Issue Schemas
  ISSUE: {
    LIST: {
      owner: z.string().describe('Repository owner/organization'),
      repo: z.string().describe('Repository name'),
      state: z.string().optional().describe('Issue state: open, closed, or all (default: open)'),
    },
    GET: {
      owner: z.string().describe('Repository owner/organization'),
      repo: z.string().describe('Repository name'),
      issueNumber: z.number().describe('Issue number'),
    },
  },

  // Pull Request Schemas
  PULL_REQUEST: {
    LIST: {
      owner: z.string().describe('Repository owner/organization'),
      repo: z.string().describe('Repository name'),
      state: z.string().optional().describe('PR state: open, closed, or all (default: open)'),
    },
    GET: {
      owner: z.string().describe('Repository owner/organization'),
      repo: z.string().describe('Repository name'),
      prNumber: z.number().describe('Pull request number'),
    },
  },

  // Branch Schemas
  BRANCH: {
    LIST: {
      owner: z.string().describe('Repository owner/organization'),
      repo: z.string().describe('Repository name'),
    },
    GET: {
      owner: z.string().describe('Repository owner/organization'),
      repo: z.string().describe('Repository name'),
      branch: z.string().describe('Branch name'),
    },
    CREATE: {
      owner: z.string().describe('Repository owner/organization'),
      repo: z.string().describe('Repository name'),
      newBranch: z.string().describe('Name for the new branch'),
      fromSha: z.string().describe('SHA of the commit to branch from'),
    },
    DELETE: {
      owner: z.string().describe('Repository owner/organization'),
      repo: z.string().describe('Repository name'),
      branch: z.string().describe('Branch name to delete'),
    },
  },

  // Commit Schemas
  COMMIT: {
    LIST: {
      owner: z.string().describe('Repository owner/organization'),
      repo: z.string().describe('Repository name'),
      sha: z.string().optional().describe('SHA or branch to start listing from'),
      path: z.string().optional().describe('Only commits containing this file path'),
    },
    GET: {
      owner: z.string().describe('Repository owner/organization'),
      repo: z.string().describe('Repository name'),
      sha: z.string().describe('Commit SHA'),
    },
    COMPARE: {
      owner: z.string().describe('Repository owner/organization'),
      repo: z.string().describe('Repository name'),
      base: z.string().describe('Base commit SHA or branch'),
      head: z.string().describe('Head commit SHA or branch'),
    },
  },

  // File Schemas
  FILE: {
    GET_CONTENTS: {
      owner: z.string().describe('Repository owner/organization'),
      repo: z.string().describe('Repository name'),
      path: z.string().describe('File path'),
      ref: z.string().optional().describe('Branch, tag, or commit SHA (default: default branch)'),
    },
    CREATE_OR_UPDATE: {
      owner: z.string().describe('Repository owner/organization'),
      repo: z.string().describe('Repository name'),
      path: z.string().describe('File path'),
      message: z.string().describe('Commit message'),
      content: z.string().describe('File content (base64 encoded)'),
      sha: z.string().optional().describe('Blob SHA of the file being replaced (required for updates)'),
      branch: z.string().optional().describe('Branch name (default: default branch)'),
    },
    DELETE: {
      owner: z.string().describe('Repository owner/organization'),
      repo: z.string().describe('Repository name'),
      path: z.string().describe('File path'),
      message: z.string().describe('Commit message'),
      sha: z.string().describe('Blob SHA of the file being deleted'),
      branch: z.string().optional().describe('Branch name (default: default branch)'),
    },
  },

  // Tree Schemas
  TREE: {
    GET: {
      owner: z.string().describe('Repository owner/organization'),
      repo: z.string().describe('Repository name'),
      treeSha: z.string().describe('SHA of the tree'),
      recursive: z.boolean().optional().describe('Get tree recursively (default: false)'),
    },
  },

  // Blob Schemas
  BLOB: {
    GET: {
      owner: z.string().describe('Repository owner/organization'),
      repo: z.string().describe('Repository name'),
      fileSha: z.string().describe('SHA of the blob'),
    },
    CREATE: {
      owner: z.string().describe('Repository owner/organization'),
      repo: z.string().describe('Repository name'),
      content: z.string().describe('Blob content'),
      encoding: z.string().optional().describe('Encoding (default: utf-8)'),
    },
  },

  // Search Schemas
  SEARCH: {
    REPOSITORIES: {
      query: z.string().describe('Search query'),
      sort: z.string().optional().describe('Sort field: stars, forks, updated'),
      order: z.string().optional().describe('Sort order: asc or desc (default: desc)'),
    },
    CODE: {
      query: z.string().describe('Search query'),
      sort: z.string().optional().describe('Sort field: indexed'),
      order: z.string().optional().describe('Sort order: asc or desc (default: desc)'),
    },
    ISSUES: {
      query: z.string().describe('Search query'),
      sort: z.string().optional().describe('Sort field: comments, created, updated'),
      order: z.string().optional().describe('Sort order: asc or desc (default: desc)'),
    },
    COMMITS: {
      query: z.string().describe('Search query'),
      sort: z.string().optional().describe('Sort field: author-date, committer-date'),
      order: z.string().optional().describe('Sort order: asc or desc (default: desc)'),
    },
  },

  // Git CLI Schemas
  GIT: {
    INIT: {
      repoPath: z.string().describe('Path where to initialize the repository'),
    },
    STATUS: {
      repoPath: z.string().describe('Path to the repository'),
    },
    ADD: {
      repoPath: z.string().describe('Path to the repository'),
      files: z.union([z.string(), z.array(z.string())]).describe("File(s) to add (use '.' for all files)"),
    },
    COMMIT: {
      repoPath: z.string().describe('Path to the repository'),
      message: z.string().describe('Commit message'),
    },
    PUSH: {
      repoPath: z.string().describe('Path to the repository'),
      remote: z.string().describe("Remote name (e.g., 'origin')"),
      branch: z.string().describe("Branch name (e.g., 'main')"),
      setUpstream: z.boolean().optional().describe('Set upstream tracking (default: false)'),
    },
    PULL: {
      repoPath: z.string().describe('Path to the repository'),
      remote: z.string().describe("Remote name (e.g., 'origin')"),
      branch: z.string().describe("Branch name (e.g., 'main')"),
    },
    CLONE: {
      url: z.string().describe('Repository URL'),
      targetPath: z.string().describe('Target directory path'),
    },
    REMOTE_ADD: {
      repoPath: z.string().describe('Path to the repository'),
      name: z.string().describe("Remote name (e.g., 'origin')"),
      url: z.string().describe('Remote URL'),
    },
    CHECKOUT: {
      repoPath: z.string().describe('Path to the repository'),
      branch: z.string().describe('Branch name'),
      createNew: z.boolean().optional().describe('Create new branch (default: false)'),
    },
    BRANCH_DELETE: {
      repoPath: z.string().describe('Path to the repository'),
      branch: z.string().describe('Branch name to delete'),
      force: z.boolean().optional().describe('Force delete (default: false)'),
    },
    RESET: {
      repoPath: z.string().describe('Path to the repository'),
      mode: z.string().optional().describe("Reset mode: 'soft', 'mixed', or 'hard' (default: 'mixed')"),
      commit: z.string().optional().describe("Commit reference (default: 'HEAD')"),
    },
    TAG: {
      repoPath: z.string().describe('Path to the repository'),
      tagName: z.string().describe('Tag name'),
      message: z.string().optional().describe('Tag message (optional, for annotated tags)'),
    },
    MERGE: {
      repoPath: z.string().describe('Path to the repository'),
      branch: z.string().describe('Branch to merge into current branch'),
    },
  },
};

export default SCHEMAS;
