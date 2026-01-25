// List of Bitbucket Cloud API v2 Endpoints
// https://developer.atlassian.com/cloud/bitbucket/rest/intro/

const ENDPOINTS = {
  // Repository Endpoints
  REPOSITORY: {
    USER_REPOS: '/repositories/{workspace}',
    REPO: '/repositories/{workspace}/{repo_slug}',
    FORKS: '/repositories/{workspace}/{repo_slug}/forks',
  },

  // Issue Endpoints
  ISSUE: {
    LIST: '/repositories/{workspace}/{repo_slug}/issues',
    DETAIL: '/repositories/{workspace}/{repo_slug}/issues/{issue_id}',
    COMMENTS: '/repositories/{workspace}/{repo_slug}/issues/{issue_id}/comments',
  },

  // Pull Request Endpoints
  PULL_REQUEST: {
    LIST: '/repositories/{workspace}/{repo_slug}/pullrequests',
    DETAIL: '/repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}',
    COMMENTS: '/repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/comments',
    COMMITS: '/repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/commits',
    DIFF: '/repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}/diff',
  },

  // Branch Endpoints
  BRANCH: {
    LIST: '/repositories/{workspace}/{repo_slug}/refs/branches',
    DETAIL: '/repositories/{workspace}/{repo_slug}/refs/branches/{name}',
    CREATE: '/repositories/{workspace}/{repo_slug}/refs/branches',
    DELETE: '/repositories/{workspace}/{repo_slug}/refs/branches/{name}',
  },

  // Commit Endpoints
  COMMIT: {
    LIST: '/repositories/{workspace}/{repo_slug}/commits',
    DETAIL: '/repositories/{workspace}/{repo_slug}/commit/{commit}',
    DIFF: '/repositories/{workspace}/{repo_slug}/diff/{spec}',
  },

  // File/Content Endpoints
  FILE: {
    CONTENTS: '/repositories/{workspace}/{repo_slug}/src/{commit}/{path}',
    DIRECTORY: '/repositories/{workspace}/{repo_slug}/src/{commit}/{path}',
  },

  // Search Endpoints
  SEARCH: {
    CODE: '/workspaces/{workspace}/search/code',
    REPOSITORIES: '/repositories/{workspace}',
  },
};

export default ENDPOINTS;
