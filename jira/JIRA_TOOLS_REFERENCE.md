# Jira MCP Server - Tools Reference

Complete reference for all 31 Jira MCP tools across 9 categories.

## Table of Contents

- [Authentication](#authentication)
- [Project Operations](#project-operations)
- [Issue Operations](#issue-operations)
- [Comment Operations](#comment-operations)
- [Search Operations](#search-operations)
- [Workflow \u0026 Transition Operations](#workflow--transition-operations)
- [User Operations](#user-operations)
- [Sprint Operations](#sprint-operations)
- [Attachment Operations](#attachment-operations)
- [Worklog Operations](#worklog-operations)
- [Filter Operations](#filter-operations)

---

## Authentication

All Jira API requests use **Basic Authentication**:

| Header | Value | Purpose |
|--------|-------|---------|
| `Authorization` | `Basic base64(email:api_token)` | API Token authentication |
| `Content-Type` | `application/json` | JSON request/response format |
| `Accept` | `application/json` | JSON response format |

### Required Credentials
- **JIRA_EMAIL**: Your Atlassian account email
- **JIRA_API_TOKEN**: API token from Atlassian
- **JIRA_BASE_URL**: Your Jira instance URL (e.g., `https://your-domain.atlassian.net`)

---

## Project Operations

### jira_list_projects

Lists all accessible projects for the authenticated user.

| Property | Details |
|----------|---------|
| **API Endpoint** | `GET /rest/api/3/project` |
| **Input** | `startAt` (number, optional), `maxResults` (number, optional, default: 50) |
| **Output** | Array of project objects |
| **Required Scopes** | Browse projects permission |

**Example Input:**
```json
{
  "startAt": 0,
  "maxResults": 50
}
```

**Example Output:**
```json
[
  {
    "id": "10000",
    "key": "PROJ",
    "name": "My Project",
    "projectTypeKey": "software",
    "lead": { "displayName": "John Doe" }
  }
]
```

---

### jira_get_project

Gets details of a specific project.

| Property | Details |
|----------|---------|
| **API Endpoint** | `GET /rest/api/3/project/{projectIdOrKey}` |
| **Input** | `projectIdOrKey` (string, required) - Project ID or key |
| **Output** | Project object with full details |
| **Required Scopes** | Browse projects permission |

**Example Input:**
```json
{
  "projectIdOrKey": "PROJ"
}
```

---

### jira_create_project

Creates a new Jira project.

| Property | Details |
|----------|---------|
| **API Endpoint** | `POST /rest/api/3/project` |
| **Input** | `key` (string), `name` (string), `projectTypeKey` (string), `leadAccountId` (string), `description` (optional) |
| **Output** | Created project object |
| **Required Scopes** | Administer Jira permission |

**Example Input:**
```json
{
  "key": "NEWPROJ",
  "name": "New Project",
  "projectTypeKey": "software",
  "leadAccountId": "5b10a2844c20165700ede21g",
  "description": "A new software project"
}
```

**Project Type Keys:**
- `software` - Software project
- `service_desk` - Service desk project
- `business` - Business project

---

## Issue Operations

### jira_create_issue

Creates a new Jira issue.

| Property | Details |
|----------|---------|
| **API Endpoint** | `POST /rest/api/3/issue` |
| **Input** | `projectKey` (string), `summary` (string), `issueType` (string), `description` (optional), `assigneeAccountId` (optional), `priority` (optional), `labels` (array, optional) |
| **Output** | Created issue object with key and ID |
| **Required Scopes** | Create issues permission |

**Example Input:**
```json
{
  "projectKey": "PROJ",
  "summary": "Fix login bug",
  "issueType": "Bug",
  "description": "Users cannot login with special characters in password",
  "priority": "High",
  "labels": ["security", "urgent"]
}
```

**Common Issue Types:**
- `Bug`
- `Task`
- `Story`
- `Epic`
- `Subtask`

**Priority Levels:**
- `Highest`
- `High`
- `Medium`
- `Low`
- `Lowest`

---

### jira_get_issue

Gets details of a specific issue.

| Property | Details |
|----------|---------|
| **API Endpoint** | `GET /rest/api/3/issue/{issueIdOrKey}` |
| **Input** | `issueIdOrKey` (string), `fields` (array, optional), `expand` (array, optional) |
| **Output** | Issue object with full details |
| **Required Scopes** | Browse projects permission |

**Example Input:**
```json
{
  "issueIdOrKey": "PROJ-123",
  "expand": ["changelog", "renderedFields"]
}
```

---

### jira_update_issue

Updates an existing issue.

| Property | Details |
|----------|---------|
| **API Endpoint** | `PUT /rest/api/3/issue/{issueIdOrKey}` |
| **Input** | `issueIdOrKey` (string), `summary` (optional), `description` (optional), `priority` (optional), `labels` (optional) |
| **Output** | Success confirmation |
| **Required Scopes** | Edit issues permission |

**Example Input:**
```json
{
  "issueIdOrKey": "PROJ-123",
  "summary": "Updated summary",
  "priority": "Medium"
}
```

---

### jira_delete_issue

Deletes an issue.

| Property | Details |
|----------|---------|
| **API Endpoint** | `DELETE /rest/api/3/issue/{issueIdOrKey}` |
| **Input** | `issueIdOrKey` (string), `deleteSubtasks` (boolean, optional, default: false) |
| **Output** | Success confirmation |
| **Required Scopes** | Delete issues permission |

**Example Input:**
```json
{
  "issueIdOrKey": "PROJ-123",
  "deleteSubtasks": true
}
```

---

### jira_assign_issue

Assigns an issue to a user.

| Property | Details |
|----------|---------|
| **API Endpoint** | `PUT /rest/api/3/issue/{issueIdOrKey}/assignee` |
| **Input** | `issueIdOrKey` (string), `accountId` (string) - Use "-1" to unassign |
| **Output** | Success confirmation |
| **Required Scopes** | Assign issues permission |

**Example Input:**
```json
{
  "issueIdOrKey": "PROJ-123",
  "accountId": "5b10a2844c20165700ede21g"
}
```

---

### jira_get_issue_changelog

Gets the change history for an issue.

| Property | Details |
|----------|---------|
| **API Endpoint** | `GET /rest/api/3/issue/{issueIdOrKey}/changelog` |
| **Input** | `issueIdOrKey` (string), `startAt` (number, optional), `maxResults` (number, optional) |
| **Output** | Changelog object with history entries |
| **Required Scopes** | Browse projects permission |

---

### jira_bulk_create_issues

Creates multiple issues in a single request.

| Property | Details |
|----------|---------|
| **API Endpoint** | `POST /rest/api/3/issue/bulk` |
| **Input** | `issues` (array) - Array of issue objects with projectKey, summary, issueType, description |
| **Output** | Array of created issue objects |
| **Required Scopes** | Create issues permission |

**Example Input:**
```json
{
  "issues": [
    {
      "projectKey": "PROJ",
      "summary": "First issue",
      "issueType": "Task"
    },
    {
      "projectKey": "PROJ",
      "summary": "Second issue",
      "issueType": "Bug",
      "description": "Bug description"
    }
  ]
}
```

---

### jira_get_create_metadata

Gets metadata required for creating issues (available issue types, fields, etc.).

| Property | Details |
|----------|---------|
| **API Endpoint** | `GET /rest/api/3/issue/createmeta` |
| **Input** | `projectKeys` (array, optional), `issueTypeNames` (array, optional) |
| **Output** | Metadata object with projects and issue types |
| **Required Scopes** | Browse projects permission |

---

## Comment Operations

### jira_add_comment

Adds a comment to an issue.

| Property | Details |
|----------|---------|
| **API Endpoint** | `POST /rest/api/3/issue/{issueIdOrKey}/comment` |
| **Input** | `issueIdOrKey` (string), `body` (string) |
| **Output** | Created comment object |
| **Required Scopes** | Add comments permission |

**Example Input:**
```json
{
  "issueIdOrKey": "PROJ-123",
  "body": "This is a comment on the issue"
}
```

---

### jira_get_comments

Gets all comments on an issue.

| Property | Details |
|----------|---------|
| **API Endpoint** | `GET /rest/api/3/issue/{issueIdOrKey}/comment` |
| **Input** | `issueIdOrKey` (string), `startAt` (number, optional), `maxResults` (number, optional) |
| **Output** | Object with comments array |
| **Required Scopes** | Browse projects permission |

---

### jira_update_comment

Updates an existing comment.

| Property | Details |
|----------|---------|
| **API Endpoint** | `PUT /rest/api/3/issue/{issueIdOrKey}/comment/{commentId}` |
| **Input** | `issueIdOrKey` (string), `commentId` (string), `body` (string) |
| **Output** | Updated comment object |
| **Required Scopes** | Edit own/all comments permission |

---

### jira_delete_comment

Deletes a comment from an issue.

| Property | Details |
|----------|---------|
| **API Endpoint** | `DELETE /rest/api/3/issue/{issueIdOrKey}/comment/{commentId}` |
| **Input** | `issueIdOrKey` (string), `commentId` (string) |
| **Output** | Success confirmation |
| **Required Scopes** | Delete own/all comments permission |

---

## Search Operations

### jira_search_issues

Searches for issues using JQL (Jira Query Language).

| Property | Details |
|----------|---------|
| **API Endpoint** | `POST /rest/api/3/search` |
| **Input** | `jql` (string), `startAt` (number, optional), `maxResults` (number, optional, default: 50), `fields` (array, optional) |
| **Output** | Search results with issues array |
| **Required Scopes** | Browse projects permission |

**Example Input:**
```json
{
  "jql": "project = PROJ AND status = Open",
  "maxResults": 100,
  "fields": ["summary", "status", "assignee"]
}
```

**Common JQL Examples:**
- `project = PROJ` - All issues in project PROJ
- `assignee = currentUser()` - Issues assigned to you
- `status = "In Progress"` - Issues in progress
- `priority = High AND status != Done` - High priority incomplete issues
- `created >= -7d` - Issues created in last 7 days

---

### jira_search_issues_paginated

Searches for issues with cursor-based pagination.

| Property | Details |
|----------|---------|
| **API Endpoint** | `POST /rest/api/3/search` |
| **Input** | `jql` (string), `maxResults` (number, optional, default: 50), `nextPageToken` (string, optional) |
| **Output** | Search results with nextPageToken for pagination |
| **Required Scopes** | Browse projects permission |

---

## Workflow & Transition Operations

### jira_get_transitions

Gets available workflow transitions for an issue.

| Property | Details |
|----------|---------|
| **API Endpoint** | `GET /rest/api/3/issue/{issueIdOrKey}/transitions` |
| **Input** | `issueIdOrKey` (string) |
| **Output** | Object with available transitions array |
| **Required Scopes** | Browse projects permission |

**Example Output:**
```json
{
  "transitions": [
    {
      "id": "11",
      "name": "To Do"
    },
    {
      "id": "21",
      "name": "In Progress"
    },
    {
      "id": "31",
      "name": "Done"
    }
  ]
}
```

---

### jira_transition_issue

Transitions an issue to a new status.

| Property | Details |
|----------|---------|
| **API Endpoint** | `POST /rest/api/3/issue/{issueIdOrKey}/transitions` |
| **Input** | `issueIdOrKey` (string), `transitionId` (string), `comment` (optional), `fields` (object, optional) |
| **Output** | Success confirmation |
| **Required Scopes** | Transition issues permission |

**Example Input:**
```json
{
  "issueIdOrKey": "PROJ-123",
  "transitionId": "21",
  "comment": "Moving to In Progress"
}
```

---

## User Operations

### jira_search_users

Searches for users in Jira.

| Property | Details |
|----------|---------|
| **API Endpoint** | `GET /rest/api/3/user/search` |
| **Input** | `query` (string) - Email, display name, or username, `maxResults` (number, optional, default: 50) |
| **Output** | Array of user objects |
| **Required Scopes** | Browse users permission |

**Example Input:**
```json
{
  "query": "john.doe@example.com",
  "maxResults": 10
}
```

---

### jira_get_current_user

Gets the currently authenticated user.

| Property | Details |
|----------|---------|
| **API Endpoint** | `GET /rest/api/3/myself` |
| **Input** | None |
| **Output** | User object with account details |
| **Required Scopes** | Valid authentication |

---

## Sprint Operations

### jira_get_sprint

Gets details of a specific sprint.

| Property | Details |
|----------|---------|
| **API Endpoint** | `GET /rest/agile/1.0/sprint/{sprintId}` |
| **Input** | `sprintId` (number) |
| **Output** | Sprint object with details |
| **Required Scopes** | View board permission |

---

### jira_get_sprint_issues

Gets all issues in a sprint.

| Property | Details |
|----------|---------|
| **API Endpoint** | `GET /rest/agile/1.0/sprint/{sprintId}/issue` |
| **Input** | `sprintId` (number), `startAt` (number, optional), `maxResults` (number, optional) |
| **Output** | Object with issues array |
| **Required Scopes** | View board permission |

---

## Attachment Operations

### jira_add_attachment

Adds a file attachment to an issue.

| Property | Details |
|----------|---------|
| **API Endpoint** | `POST /rest/api/3/issue/{issueIdOrKey}/attachments` |
| **Input** | `issueIdOrKey` (string), `filePath` (string) - Local file path |
| **Output** | Created attachment object |
| **Required Scopes** | Create attachments permission |
| **Headers** | `X-Atlassian-Token: no-check` (required) |

**Example Input:**
```json
{
  "issueIdOrKey": "PROJ-123",
  "filePath": "/path/to/file.pdf"
}
```

---

### jira_get_attachments

Gets all attachments for an issue.

| Property | Details |
|----------|---------|
| **API Endpoint** | `GET /rest/api/3/issue/{issueIdOrKey}` (fields: attachment) |
| **Input** | `issueIdOrKey` (string) |
| **Output** | Array of attachment objects |
| **Required Scopes** | Browse projects permission |

---

### jira_delete_attachment

Deletes an attachment.

| Property | Details |
|----------|---------|
| **API Endpoint** | `DELETE /rest/api/3/attachment/{attachmentId}` |
| **Input** | `attachmentId` (string) |
| **Output** | Success confirmation |
| **Required Scopes** | Delete own/all attachments permission |

---

## Worklog Operations

### jira_add_worklog

Adds a worklog entry (time tracking) to an issue.

| Property | Details |
|----------|---------|
| **API Endpoint** | `POST /rest/api/3/issue/{issueIdOrKey}/worklog` |
| **Input** | `issueIdOrKey` (string), `timeSpent` (string e.g., "3h 30m"), `started` (ISO 8601, optional), `comment` (optional) |
| **Output** | Created worklog object |
| **Required Scopes** | Work on issues permission |

**Example Input:**
```json
{
  "issueIdOrKey": "PROJ-123",
  "timeSpent": "2h 30m",
  "started": "2026-02-08T09:00:00.000+0000",
  "comment": "Fixed authentication bug"
}
```

**Time Format Examples:**
- `3h` - 3 hours
- `30m` - 30 minutes
- `1d 2h` - 1 day 2 hours
- `1w 3d` - 1 week 3 days

---

### jira_get_worklogs

Gets all worklog entries for an issue.

| Property | Details |
|----------|---------|
| **API Endpoint** | `GET /rest/api/3/issue/{issueIdOrKey}/worklog` |
| **Input** | `issueIdOrKey` (string) |
| **Output** | Object with worklogs array |
| **Required Scopes** | Browse projects permission |

---

### jira_delete_worklog

Deletes a worklog entry.

| Property | Details |
|----------|---------|
| **API Endpoint** | `DELETE /rest/api/3/issue/{issueIdOrKey}/worklog/{worklogId}` |
| **Input** | `issueIdOrKey` (string), `worklogId` (string) |
| **Output** | Success confirmation |
| **Required Scopes** | Delete own/all worklogs permission |

---

## Filter Operations

### jira_get_filters

Gets saved filters for the user.

| Property | Details |
|----------|---------|
| **API Endpoint** | `GET /rest/api/3/filter/my` |
| **Input** | `maxResults` (number, optional), `expand` (string, optional) |
| **Output** | Array of filter objects |
| **Required Scopes** | Valid authentication |

---

### jira_search_by_filter

Searches for issues using a saved filter.

| Property | Details |
|----------|---------|
| **API Endpoint** | `GET /rest/api/3/filter/{filterId}/search` |
| **Input** | `filterId` (string), `startAt` (number, optional), `maxResults` (number, optional) |
| **Output** | Search results with issues array |
| **Required Scopes** | Filter view permission |

---

## Notes

- All endpoints use the base URL from `JIRA_BASE_URL` environment variable
- Default timeout is 30000ms (configurable via `JIRA_TIMEOUT`)
- All requests require valid API token authentication
- Issue keys are in format `PROJECT-123` (project key + number)
- Use account IDs (not usernames) for user operations
- JQL is case-insensitive for keywords but case-sensitive for values
- Worklog time format uses Jira time tracking syntax (w, d, h, m)
- Attachments require multipart/form-data content type
- Sprint operations use Jira Agile API (different base path)
