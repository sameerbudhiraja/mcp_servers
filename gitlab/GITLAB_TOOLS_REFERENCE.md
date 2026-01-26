# GitLab MCP Server - Tools Reference

Complete reference for all 28 GitLab MCP tools.

## Table of Contents

- [Project Operations](#project-operations)
- [Merge Request Operations](#merge-request-operations)
- [Branch Operations](#branch-operations)
- [Commit Operations](#commit-operations)
- [File Operations](#file-operations)
- [Issue Operations](#issue-operations)
- [Search Operations](#search-operations)

---

## Project Operations

### gitlab_list_projects

Lists all accessible projects for the authenticated user.

**API Endpoint:** `GET /projects`

**Input Parameters:**
- `membership` (boolean, optional): Limit to projects where user is a member
- `owned` (boolean, optional): Limit to projects owned by user
- `starred` (boolean, optional): Limit to starred projects

**Output:** Array of project objects

**Required Token Scopes:** `api` or `read_api`

**Example Usage:**
```javascript
{
  "membership": true,
  "owned": false,
  "starred": false
}
```

---

### gitlab_get_project

Gets details of a specific project.

**API Endpoint:** `GET /projects/{id}`

**Input Parameters:**
- `projectId` (string, required): Project ID or URL-encoded path (e.g., "my-group/my-project")

**Output:** Project object with full details

**Required Token Scopes:** `api` or `read_api`

**Example Usage:**
```javascript
{
  "projectId": "12345"
}
```
or
```javascript
{
  "projectId": "my-group/my-project"
}
```

---

### gitlab_create_project

Creates a new project.

**API Endpoint:** `POST /projects`

**Input Parameters:**
- `name` (string, required): Project name
- `description` (string, optional): Project description
- `visibility` (enum, optional): Project visibility - `private`, `internal`, or `public` (default: private)
- `initializeWithReadme` (boolean, optional): Initialize with README (default: false)

**Output:** Created project object

**Required Token Scopes:** `api`

**Example Usage:**
```javascript
{
  "name": "My New Project",
  "description": "A test project",
  "visibility": "private",
  "initializeWithReadme": true
}
```

---

### gitlab_list_project_forks

Lists all forks of a project.

**API Endpoint:** `GET /projects/{id}/forks`

**Input Parameters:**
- `projectId` (string, required): Project ID or URL-encoded path

**Output:** Array of forked project objects

**Required Token Scopes:** `api` or `read_api`

**Example Usage:**
```javascript
{
  "projectId": "12345"
}
```

---

## Merge Request Operations

### gitlab_list_merge_requests

Lists merge requests for a project.

**API Endpoint:** `GET /projects/{id}/merge_requests`

**Input Parameters:**
- `projectId` (string, required): Project ID or URL-encoded path
- `state` (enum, optional): MR state - `opened`, `closed`, `locked`, `merged`, or `all` (default: opened)

**Output:** Array of merge request objects

**Required Token Scopes:** `api` or `read_api`

**Example Usage:**
```javascript
{
  "projectId": "12345",
  "state": "opened"
}
```

---

### gitlab_get_merge_request

Gets details of a specific merge request.

**API Endpoint:** `GET /projects/{id}/merge_requests/{merge_request_iid}`

**Input Parameters:**
- `projectId` (string, required): Project ID or URL-encoded path
- `mergeRequestIid` (number, required): Merge request IID (internal ID, not the global ID)

**Output:** Merge request object with full details

**Required Token Scopes:** `api` or `read_api`

**Example Usage:**
```javascript
{
  "projectId": "12345",
  "mergeRequestIid": 42
}
```

---

### gitlab_get_merge_request_diff

Gets the diff/changes for a merge request.

**API Endpoint:** `GET /projects/{id}/merge_requests/{merge_request_iid}/changes`

**Input Parameters:**
- `projectId` (string, required): Project ID or URL-encoded path
- `mergeRequestIid` (number, required): Merge request IID

**Output:** Merge request object with changes/diffs

**Required Token Scopes:** `api` or `read_api`

**Example Usage:**
```javascript
{
  "projectId": "12345",
  "mergeRequestIid": 42
}
```

---

### gitlab_list_mr_commits

Lists commits in a merge request.

**API Endpoint:** `GET /projects/{id}/merge_requests/{merge_request_iid}/commits`

**Input Parameters:**
- `projectId` (string, required): Project ID or URL-encoded path
- `mergeRequestIid` (number, required): Merge request IID

**Output:** Array of commit objects

**Required Token Scopes:** `api` or `read_api`

**Example Usage:**
```javascript
{
  "projectId": "12345",
  "mergeRequestIid": 42
}
```

---

### gitlab_list_mr_comments

Lists comments/notes on a merge request.

**API Endpoint:** `GET /projects/{id}/merge_requests/{merge_request_iid}/notes`

**Input Parameters:**
- `projectId` (string, required): Project ID or URL-encoded path
- `mergeRequestIid` (number, required): Merge request IID

**Output:** Array of note/comment objects

**Required Token Scopes:** `api` or `read_api`

**Example Usage:**
```javascript
{
  "projectId": "12345",
  "mergeRequestIid": 42
}
```

---

## Branch Operations

### gitlab_list_branches

Lists all branches in a repository.

**API Endpoint:** `GET /projects/{id}/repository/branches`

**Input Parameters:**
- `projectId` (string, required): Project ID or URL-encoded path

**Output:** Array of branch objects

**Required Token Scopes:** `api` or `read_api`

**Example Usage:**
```javascript
{
  "projectId": "12345"
}
```

---

### gitlab_get_branch

Gets details of a specific branch.

**API Endpoint:** `GET /projects/{id}/repository/branches/{branch}`

**Input Parameters:**
- `projectId` (string, required): Project ID or URL-encoded path
- `branchName` (string, required): Branch name

**Output:** Branch object with details

**Required Token Scopes:** `api` or `read_api`

**Example Usage:**
```javascript
{
  "projectId": "12345",
  "branchName": "main"
}
```

---

### gitlab_create_branch

Creates a new branch.

**API Endpoint:** `POST /projects/{id}/repository/branches`

**Input Parameters:**
- `projectId` (string, required): Project ID or URL-encoded path
- `branchName` (string, required): Name for the new branch
- `ref` (string, required): Source branch name, tag, or commit SHA

**Output:** Created branch object

**Required Token Scopes:** `api`

**Example Usage:**
```javascript
{
  "projectId": "12345",
  "branchName": "feature/new-feature",
  "ref": "main"
}
```

---

### gitlab_delete_branch

Deletes a branch from the repository.

**API Endpoint:** `DELETE /projects/{id}/repository/branches/{branch}`

**Input Parameters:**
- `projectId` (string, required): Project ID or URL-encoded path
- `branchName` (string, required): Branch name to delete

**Output:** Success confirmation

**Required Token Scopes:** `api`

**Example Usage:**
```javascript
{
  "projectId": "12345",
  "branchName": "feature/old-feature"
}
```

---

## Commit Operations

### gitlab_list_commits

Lists commits in a repository.

**API Endpoint:** `GET /projects/{id}/repository/commits`

**Input Parameters:**
- `projectId` (string, required): Project ID or URL-encoded path
- `refName` (string, optional): Branch name, tag, or commit SHA (default: default branch)

**Output:** Array of commit objects

**Required Token Scopes:** `api` or `read_api`

**Example Usage:**
```javascript
{
  "projectId": "12345",
  "refName": "main"
}
```

---

### gitlab_get_commit

Gets details of a specific commit.

**API Endpoint:** `GET /projects/{id}/repository/commits/{sha}`

**Input Parameters:**
- `projectId` (string, required): Project ID or URL-encoded path
- `sha` (string, required): Commit SHA

**Output:** Commit object with full details

**Required Token Scopes:** `api` or `read_api`

**Example Usage:**
```javascript
{
  "projectId": "12345",
  "sha": "a1b2c3d4e5f6"
}
```

---

### gitlab_get_commit_diff

Gets the diff for a commit.

**API Endpoint:** `GET /projects/{id}/repository/commits/{sha}/diff`

**Input Parameters:**
- `projectId` (string, required): Project ID or URL-encoded path
- `sha` (string, required): Commit SHA

**Output:** Array of diff objects

**Required Token Scopes:** `api` or `read_api`

**Example Usage:**
```javascript
{
  "projectId": "12345",
  "sha": "a1b2c3d4e5f6"
}
```

---

### gitlab_list_commit_comments

Lists comments on a commit.

**API Endpoint:** `GET /projects/{id}/repository/commits/{sha}/comments`

**Input Parameters:**
- `projectId` (string, required): Project ID or URL-encoded path
- `sha` (string, required): Commit SHA

**Output:** Array of comment objects

**Required Token Scopes:** `api` or `read_api`

**Example Usage:**
```javascript
{
  "projectId": "12345",
  "sha": "a1b2c3d4e5f6"
}
```

---

## File Operations

### gitlab_get_file

Gets the contents of a file from the repository.

**API Endpoint:** `GET /projects/{id}/repository/files/{file_path}`

**Input Parameters:**
- `projectId` (string, required): Project ID or URL-encoded path
- `filePath` (string, required): URL-encoded file path
- `ref` (string, optional): Branch name, tag, or commit SHA (default: default branch)

**Output:** File object with content (base64 encoded)

**Required Token Scopes:** `api` or `read_api`

**Example Usage:**
```javascript
{
  "projectId": "12345",
  "filePath": "src/main.js",
  "ref": "main"
}
```

---

### gitlab_get_directory

Gets the contents/tree of a directory in the repository.

**API Endpoint:** `GET /projects/{id}/repository/tree`

**Input Parameters:**
- `projectId` (string, required): Project ID or URL-encoded path
- `path` (string, optional): Directory path (default: root)
- `ref` (string, optional): Branch name, tag, or commit SHA (default: default branch)

**Output:** Array of tree objects (files and directories)

**Required Token Scopes:** `api` or `read_api`

**Example Usage:**
```javascript
{
  "projectId": "12345",
  "path": "src",
  "ref": "main"
}
```

---

### gitlab_create_file

Creates a new file in the repository.

**API Endpoint:** `POST /projects/{id}/repository/files/{file_path}`

**Input Parameters:**
- `projectId` (string, required): Project ID or URL-encoded path
- `filePath` (string, required): URL-encoded file path
- `branch` (string, required): Branch name
- `content` (string, required): File content
- `commitMessage` (string, required): Commit message

**Output:** Created file object

**Required Token Scopes:** `api`

**Example Usage:**
```javascript
{
  "projectId": "12345",
  "filePath": "src/new-file.js",
  "branch": "main",
  "content": "console.log('Hello World');",
  "commitMessage": "Add new file"
}
```

---

### gitlab_update_file

Updates an existing file in the repository.

**API Endpoint:** `PUT /projects/{id}/repository/files/{file_path}`

**Input Parameters:**
- `projectId` (string, required): Project ID or URL-encoded path
- `filePath` (string, required): URL-encoded file path
- `branch` (string, required): Branch name
- `content` (string, required): New file content
- `commitMessage` (string, required): Commit message

**Output:** Updated file object

**Required Token Scopes:** `api`

**Example Usage:**
```javascript
{
  "projectId": "12345",
  "filePath": "src/existing-file.js",
  "branch": "main",
  "content": "console.log('Updated content');",
  "commitMessage": "Update file"
}
```

---

## Issue Operations

### gitlab_list_issues

Lists issues for a project.

**API Endpoint:** `GET /projects/{id}/issues`

**Input Parameters:**
- `projectId` (string, required): Project ID or URL-encoded path
- `state` (enum, optional): Issue state - `opened`, `closed`, or `all` (default: opened)

**Output:** Array of issue objects

**Required Token Scopes:** `api` or `read_api`

**Example Usage:**
```javascript
{
  "projectId": "12345",
  "state": "opened"
}
```

---

### gitlab_get_issue

Gets details of a specific issue.

**API Endpoint:** `GET /projects/{id}/issues/{issue_iid}`

**Input Parameters:**
- `projectId` (string, required): Project ID or URL-encoded path
- `issueIid` (number, required): Issue IID (internal ID)

**Output:** Issue object with full details

**Required Token Scopes:** `api` or `read_api`

**Example Usage:**
```javascript
{
  "projectId": "12345",
  "issueIid": 42
}
```

---

### gitlab_create_issue

Creates a new issue.

**API Endpoint:** `POST /projects/{id}/issues`

**Input Parameters:**
- `projectId` (string, required): Project ID or URL-encoded path
- `title` (string, required): Issue title
- `description` (string, optional): Issue description

**Output:** Created issue object

**Required Token Scopes:** `api`

**Example Usage:**
```javascript
{
  "projectId": "12345",
  "title": "Bug: Application crashes on startup",
  "description": "Detailed description of the bug..."
}
```

---

### gitlab_update_issue

Updates an existing issue.

**API Endpoint:** `PUT /projects/{id}/issues/{issue_iid}`

**Input Parameters:**
- `projectId` (string, required): Project ID or URL-encoded path
- `issueIid` (number, required): Issue IID
- `title` (string, optional): New issue title
- `description` (string, optional): New issue description
- `stateEvent` (enum, optional): State event - `close` or `reopen`

**Output:** Updated issue object

**Required Token Scopes:** `api`

**Example Usage:**
```javascript
{
  "projectId": "12345",
  "issueIid": 42,
  "title": "Updated title",
  "stateEvent": "close"
}
```

---

### gitlab_list_issue_comments

Lists comments/notes on an issue.

**API Endpoint:** `GET /projects/{id}/issues/{issue_iid}/notes`

**Input Parameters:**
- `projectId` (string, required): Project ID or URL-encoded path
- `issueIid` (number, required): Issue IID

**Output:** Array of note/comment objects

**Required Token Scopes:** `api` or `read_api`

**Example Usage:**
```javascript
{
  "projectId": "12345",
  "issueIid": 42
}
```

---

## Search Operations

### gitlab_search_code

Searches for code across projects.

**API Endpoint:** `GET /search` or `GET /projects/{id}/search`

**Input Parameters:**
- `searchQuery` (string, required): Search query
- `projectId` (string, optional): Limit search to specific project ID

**Output:** Array of code search results

**Required Token Scopes:** `api` or `read_api`

**Example Usage:**
```javascript
{
  "searchQuery": "function authenticate",
  "projectId": "12345"
}
```

---

### gitlab_search_projects

Searches for projects by name.

**API Endpoint:** `GET /search`

**Input Parameters:**
- `searchQuery` (string, required): Search query

**Output:** Array of project search results

**Required Token Scopes:** `api` or `read_api`

**Example Usage:**
```javascript
{
  "searchQuery": "my-project"
}
```

---

## Notes

- All endpoints use the base URL configured in `GITLAB_BASE_URL` (default: https://gitlab.com/api/v4)
- Project IDs can be either numeric IDs or URL-encoded paths (e.g., "my-group/my-project")
- IID (Internal ID) is different from the global ID - use IID for merge requests and issues
- File paths should be URL-encoded when passed to file operations
- Content in file operations is typically base64 encoded by the GitLab API
- All operations require a valid Personal Access Token with appropriate scopes
