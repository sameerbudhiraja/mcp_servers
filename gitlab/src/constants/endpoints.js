// GitLab API v4 Endpoints
// https://docs.gitlab.com/ee/api/api_resources.html

const ENDPOINTS = {
  // Project Endpoints
  PROJECT: {
    LIST: '/projects',
    DETAIL: '/projects/{id}',
    CREATE: '/projects',
    FORKS: '/projects/{id}/forks',
  },

  // Merge Request Endpoints
  MERGE_REQUEST: {
    LIST: '/projects/{id}/merge_requests',
    DETAIL: '/projects/{id}/merge_requests/{merge_request_iid}',
    COMMITS: '/projects/{id}/merge_requests/{merge_request_iid}/commits',
    CHANGES: '/projects/{id}/merge_requests/{merge_request_iid}/changes',
    COMMENTS: '/projects/{id}/merge_requests/{merge_request_iid}/notes',
  },

  // Branch Endpoints
  BRANCH: {
    LIST: '/projects/{id}/repository/branches',
    DETAIL: '/projects/{id}/repository/branches/{branch}',
    CREATE: '/projects/{id}/repository/branches',
    DELETE: '/projects/{id}/repository/branches/{branch}',
  },

  // Commit Endpoints
  COMMIT: {
    LIST: '/projects/{id}/repository/commits',
    DETAIL: '/projects/{id}/repository/commits/{sha}',
    DIFF: '/projects/{id}/repository/commits/{sha}/diff',
    COMMENTS: '/projects/{id}/repository/commits/{sha}/comments',
  },

  // File Endpoints
  FILE: {
    GET: '/projects/{id}/repository/files/{file_path}',
    RAW: '/projects/{id}/repository/files/{file_path}/raw',
    CREATE: '/projects/{id}/repository/files/{file_path}',
    UPDATE: '/projects/{id}/repository/files/{file_path}',
    DELETE: '/projects/{id}/repository/files/{file_path}',
    TREE: '/projects/{id}/repository/tree',
  },

  // Issue Endpoints
  ISSUE: {
    LIST: '/projects/{id}/issues',
    DETAIL: '/projects/{id}/issues/{issue_iid}',
    CREATE: '/projects/{id}/issues',
    UPDATE: '/projects/{id}/issues/{issue_iid}',
    COMMENTS: '/projects/{id}/issues/{issue_iid}/notes',
  },

  // Search Endpoints
  SEARCH: {
    GLOBAL: '/search',
    PROJECT_SCOPE: '/projects/{id}/search',
  },
};

export default ENDPOINTS;
