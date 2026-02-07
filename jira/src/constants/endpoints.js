/**
 * Jira REST API Endpoints
 * Base URL pattern: {baseUrl}/rest/api/{version}/
 */

export const ENDPOINTS = {
  // Project endpoints
  PROJECTS: '/rest/api/3/project',
  PROJECT_SEARCH: '/rest/api/3/project/search',
  PROJECT_BY_KEY: (projectIdOrKey) => `/rest/api/3/project/${projectIdOrKey}`,

  // Issue endpoints
  ISSUES: '/rest/api/3/issue',
  ISSUE_BY_KEY: (issueIdOrKey) => `/rest/api/3/issue/${issueIdOrKey}`,
  ISSUE_ASSIGNEE: (issueIdOrKey) => `/rest/api/3/issue/${issueIdOrKey}/assignee`,
  ISSUE_CHANGELOG: (issueIdOrKey) => `/rest/api/3/issue/${issueIdOrKey}/changelog`,
  BULK_CREATE_ISSUES: '/rest/api/3/issue/bulk',
  CREATE_METADATA: '/rest/api/3/issue/createmeta',

  // Comment endpoints
  ISSUE_COMMENTS: (issueIdOrKey) => `/rest/api/3/issue/${issueIdOrKey}/comment`,
  ISSUE_COMMENT_BY_ID: (issueIdOrKey, commentId) => `/rest/api/3/issue/${issueIdOrKey}/comment/${commentId}`,

  // Search endpoints
  SEARCH: '/rest/api/3/search',
  JQL_SEARCH: '/rest/api/3/search',

  // Transition endpoints
  ISSUE_TRANSITIONS: (issueIdOrKey) => `/rest/api/3/issue/${issueIdOrKey}/transitions`,

  // User endpoints
  USER_SEARCH: '/rest/api/3/user/search',
  CURRENT_USER: '/rest/api/3/myself',
  USER_BY_ACCOUNT_ID: '/rest/api/3/user',

  // Sprint endpoints (Agile API)
  SPRINT: (sprintId) => `/rest/agile/1.0/sprint/${sprintId}`,
  SPRINT_ISSUES: (sprintId) => `/rest/agile/1.0/sprint/${sprintId}/issue`,
  BOARD_SPRINTS: (boardId) => `/rest/agile/1.0/board/${boardId}/sprint`,

  // Attachment endpoints
  ISSUE_ATTACHMENTS: (issueIdOrKey) => `/rest/api/3/issue/${issueIdOrKey}/attachments`,
  ATTACHMENT_BY_ID: (attachmentId) => `/rest/api/3/attachment/${attachmentId}`,

  // Worklog endpoints
  ISSUE_WORKLOGS: (issueIdOrKey) => `/rest/api/3/issue/${issueIdOrKey}/worklog`,
  WORKLOG_BY_ID: (issueIdOrKey, worklogId) => `/rest/api/3/issue/${issueIdOrKey}/worklog/${worklogId}`,

  // Filter endpoints
  FILTERS: '/rest/api/3/filter/search',
  FILTER_BY_ID: (filterId) => `/rest/api/3/filter/${filterId}`,
};

export default ENDPOINTS;
