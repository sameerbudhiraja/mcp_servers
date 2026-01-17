// List of Github.com API Endpoints
// https://docs.github.com/en/rest/overview/resources-in-the-rest-api

const ENDPOINTS = {
  // Repository Endpoints
  REPOSITORY: {
    USER_REPOS: '/user/repos',
    REPO: '/repos/{owner}/{repo}',
    FORKS: '/repos/{owner}/{repo}/forks',
    TOPICS: '/repos/{owner}/{repo}/topics',
  },

  // Issue Endpoints
  ISSUE: {
    LIST: '/repos/{owner}/{repo}/issues',
    DETAIL: '/repos/{owner}/{repo}/issues/{issue_number}',
    COMMENTS: '/repos/{owner}/{repo}/issues/{issue_number}/comments',
  },

  // Pull Request Endpoints
  PULL_REQUEST: {
    LIST: '/repos/{owner}/{repo}/pulls',
    DETAIL: '/repos/{owner}/{repo}/pulls/{pull_number}',
    REVIEWS: '/repos/{owner}/{repo}/pulls/{pull_number}/reviews',
    FILES: '/repos/{owner}/{repo}/pulls/{pull_number}/files',
    COMMENTS: '/repos/{owner}/{repo}/pulls/{pull_number}/comments',
  },

  // Branch Endpoints
  BRANCH: {
    LIST: '/repos/{owner}/{repo}/branches',
    DETAIL: '/repos/{owner}/{repo}/branches/{branch}',
    CREATE: '/repos/{owner}/{repo}/git/refs',
    DELETE: '/repos/{owner}/{repo}/git/refs/heads/{branch}',
  },

  // Commit Endpoints
  COMMIT: {
    LIST: '/repos/{owner}/{repo}/commits',
    DETAIL: '/repos/{owner}/{repo}/commits/{sha}',
    COMPARE: '/repos/{owner}/{repo}/compare/{base}...{head}',
  },

  // File/Content Endpoints
  FILE: {
    CONTENTS: '/repos/{owner}/{repo}/contents/{path}',
  },

  // Git Data Endpoints
  GIT: {
    TREE: '/repos/{owner}/{repo}/git/trees/{tree_sha}',
    BLOB: '/repos/{owner}/{repo}/git/blobs/{file_sha}',
    BLOBS: '/repos/{owner}/{repo}/git/blobs',
  },

  // Security Endpoints
  SECURITY: {
    ADVISORIES: '/repos/{owner}/{repo}/security-advisories',
    ADVISORY: '/repos/{owner}/{repo}/security-advisories/{ghsa_id}',
  },

  // Search Endpoints
  SEARCH: {
    REPOSITORIES: '/search/repositories',
    CODE: '/search/code',
    ISSUES: '/search/issues',
    COMMITS: '/search/commits',
  },

  // Tags Endpoints
  TAG: {
    LIST: '/repos/{owner}/{repo}/tags',
  },
};

export default ENDPOINTS;