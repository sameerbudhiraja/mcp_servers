# Bitbucket MCP Server - Tools Reference

Complete reference for all tools provided by the Bitbucket MCP server.

## Table of Contents

- [Repository Operations](#repository-operations)
- [Pull Request Operations](#pull-request-operations)
- [Branch Operations](#branch-operations)
- [Commit Operations](#commit-operations)
- [File Operations](#file-operations)
- [Issue Operations](#issue-operations)
- [Search Operations](#search-operations)

---

## Repository Operations

### bitbucket_get_my_repositories

Fetches all repositories for the authenticated user workspace.

**Input Parameters:**
- `workspace` (string, required) - Workspace ID or slug

**Output:** JSON array of repository objects

**Required Permissions:** `repository:read`

**Example:**
```json
{
  "workspace": "my-workspace"
}
```

---

### bitbucket_get_repo_details

Gets details of a specific repository.

**Input Parameters:**
- `workspace` (string, required) - Workspace ID or slug
- `repoSlug` (string, required) - Repository slug

**Output:** Repository object with full details

**Required Permissions:** `repository:read`

**Example:**
```json
{
  "workspace": "my-workspace",
  "repoSlug": "my-repo"
}
```

---

### bitbucket_list_repo_forks

Lists all forks of a repository.

**Input Parameters:**
- `workspace` (string, required) - Workspace ID or slug
- `repoSlug` (string, required) - Repository slug

**Output:** JSON array of fork repository objects

**Required Permissions:** `repository:read`

**Example:**
```json
{
  "workspace": "my-workspace",
  "repoSlug": "my-repo"
}
```

---

### bitbucket_create_repo

Creates a new repository in the workspace.

**Input Parameters:**
- `workspace` (string, required) - Workspace ID or slug
- `repoSlug` (string, required) - Repository slug
- `description` (string, optional) - Repository description
- `isPrivate` (boolean, optional) - Whether the repository is private (default: false)

**Output:** Created repository object

**Required Permissions:** `repository:write`

**Example:**
```json
{
  "workspace": "my-workspace",
  "repoSlug": "new-repo",
  "description": "My new repository",
  "isPrivate": true
}
```

---

## Pull Request Operations

### bitbucket_list_pull_requests

Lists pull requests for a repository.

**Input Parameters:**
- `workspace` (string, required) - Workspace ID or slug
- `repoSlug` (string, required) - Repository slug
- `state` (string, optional) - PR state: OPEN, MERGED, DECLINED, or SUPERSEDED (default: OPEN)

**Output:** JSON array of pull request objects

**Required Permissions:** `pullrequest:read`

**Example:**
```json
{
  "workspace": "my-workspace",
  "repoSlug": "my-repo",
  "state": "OPEN"
}
```

---

### bitbucket_get_pull_request

Gets details of a specific pull request.

**Input Parameters:**
- `workspace` (string, required) - Workspace ID or slug
- `repoSlug` (string, required) - Repository slug
- `prId` (number, required) - Pull request ID

**Output:** Pull request object with full details

**Required Permissions:** `pullrequest:read`

**Example:**
```json
{
  "workspace": "my-workspace",
  "repoSlug": "my-repo",
  "prId": 42
}
```

---

### bitbucket_list_pr_comments

Lists comments on a pull request.

**Input Parameters:**
- `workspace` (string, required) - Workspace ID or slug
- `repoSlug` (string, required) - Repository slug
- `prId` (number, required) - Pull request ID

**Output:** JSON array of comment objects

**Required Permissions:** `pullrequest:read`

**Example:**
```json
{
  "workspace": "my-workspace",
  "repoSlug": "my-repo",
  "prId": 42
}
```

---

### bitbucket_list_pr_commits

Lists commits in a pull request.

**Input Parameters:**
- `workspace` (string, required) - Workspace ID or slug
- `repoSlug` (string, required) - Repository slug
- `prId` (number, required) - Pull request ID

**Output:** JSON array of commit objects

**Required Permissions:** `pullrequest:read`

**Example:**
```json
{
  "workspace": "my-workspace",
  "repoSlug": "my-repo",
  "prId": 42
}
```

---

### bitbucket_get_pull_request_diff

Gets the diff for a pull request.

**Input Parameters:**
- `workspace` (string, required) - Workspace ID or slug
- `repoSlug` (string, required) - Repository slug
- `prId` (number, required) - Pull request ID

**Output:** Plain text diff

**Required Permissions:** `pullrequest:read`

**Example:**
```json
{
  "workspace": "my-workspace",
  "repoSlug": "my-repo",
  "prId": 42
}
```

---

## Branch Operations

### bitbucket_list_branches

Lists all branches in a repository.

**Input Parameters:**
- `workspace` (string, required) - Workspace ID or slug
- `repoSlug` (string, required) - Repository slug

**Output:** JSON array of branch objects

**Required Permissions:** `repository:read`

**Example:**
```json
{
  "workspace": "my-workspace",
  "repoSlug": "my-repo"
}
```

---

### bitbucket_get_branch

Gets details of a specific branch.

**Input Parameters:**
- `workspace` (string, required) - Workspace ID or slug
- `repoSlug` (string, required) - Repository slug
- `branchName` (string, required) - Branch name

**Output:** Branch object with details

**Required Permissions:** `repository:read`

**Example:**
```json
{
  "workspace": "my-workspace",
  "repoSlug": "my-repo",
  "branchName": "main"
}
```

---

### bitbucket_create_branch

Creates a new branch from a specific commit.

**Input Parameters:**
- `workspace` (string, required) - Workspace ID or slug
- `repoSlug` (string, required) - Repository slug
- `branchName` (string, required) - Name for the new branch
- `target` (string, required) - Target hash/commit to branch from

**Output:** Created branch object

**Required Permissions:** `repository:write`

**Example:**
```json
{
  "workspace": "my-workspace",
  "repoSlug": "my-repo",
  "branchName": "feature/new-feature",
  "target": "abc123def456"
}
```

---

### bitbucket_delete_branch

Deletes a branch from the repository.

**Input Parameters:**
- `workspace` (string, required) - Workspace ID or slug
- `repoSlug` (string, required) - Repository slug
- `branchName` (string, required) - Branch name to delete

**Output:** Success confirmation

**Required Permissions:** `repository:write`

**Example:**
```json
{
  "workspace": "my-workspace",
  "repoSlug": "my-repo",
  "branchName": "old-feature"
}
```

---

## Commit Operations

### bitbucket_list_commits

Lists commits in a repository.

**Input Parameters:**
- `workspace` (string, required) - Workspace ID or slug
- `repoSlug` (string, required) - Repository slug
- `branch` (string, optional) - Branch name to list commits from

**Output:** JSON array of commit objects

**Required Permissions:** `repository:read`

**Example:**
```json
{
  "workspace": "my-workspace",
  "repoSlug": "my-repo",
  "branch": "main"
}
```

---

### bitbucket_get_commit

Gets details of a specific commit.

**Input Parameters:**
- `workspace` (string, required) - Workspace ID or slug
- `repoSlug` (string, required) - Repository slug
- `commit` (string, required) - Commit hash

**Output:** Commit object with full details

**Required Permissions:** `repository:read`

**Example:**
```json
{
  "workspace": "my-workspace",
  "repoSlug": "my-repo",
  "commit": "abc123def456"
}
```

---

### bitbucket_get_commit_diff

Gets the diff for a commit.

**Input Parameters:**
- `workspace` (string, required) - Workspace ID or slug
- `repoSlug` (string, required) - Repository slug
- `spec` (string, required) - Diff spec (e.g., commit hash)

**Output:** Plain text diff

**Required Permissions:** `repository:read`

**Example:**
```json
{
  "workspace": "my-workspace",
  "repoSlug": "my-repo",
  "spec": "abc123def456"
}
```

---

## File Operations

### bitbucket_get_file_contents

Gets the contents of a file from the repository.

**Input Parameters:**
- `workspace` (string, required) - Workspace ID or slug
- `repoSlug` (string, required) - Repository slug
- `path` (string, required) - File path
- `commit` (string, optional) - Commit hash (default: HEAD)

**Output:** File contents

**Required Permissions:** `repository:read`

**Example:**
```json
{
  "workspace": "my-workspace",
  "repoSlug": "my-repo",
  "path": "src/index.js",
  "commit": "abc123def456"
}
```

---

### bitbucket_get_directory_contents

Gets the contents of a directory in the repository.

**Input Parameters:**
- `workspace` (string, required) - Workspace ID or slug
- `repoSlug` (string, required) - Repository slug
- `path` (string, optional) - Directory path (default: root)
- `commit` (string, optional) - Commit hash (default: HEAD)

**Output:** JSON array of file/directory objects

**Required Permissions:** `repository:read`

**Example:**
```json
{
  "workspace": "my-workspace",
  "repoSlug": "my-repo",
  "path": "src",
  "commit": "HEAD"
}
```

---

## Issue Operations

### bitbucket_list_repo_issues

Lists issues for a specific repository.

**Input Parameters:**
- `workspace` (string, required) - Workspace ID or slug
- `repoSlug` (string, required) - Repository slug
- `state` (string, optional) - Issue state filter

**Output:** JSON array of issue objects

**Required Permissions:** `issue:read`

**Example:**
```json
{
  "workspace": "my-workspace",
  "repoSlug": "my-repo",
  "state": "open"
}
```

---

### bitbucket_get_issue

Gets details of a specific issue.

**Input Parameters:**
- `workspace` (string, required) - Workspace ID or slug
- `repoSlug` (string, required) - Repository slug
- `issueId` (number, required) - Issue ID

**Output:** Issue object with full details

**Required Permissions:** `issue:read`

**Example:**
```json
{
  "workspace": "my-workspace",
  "repoSlug": "my-repo",
  "issueId": 123
}
```

---

### bitbucket_list_issue_comments

Lists all comments on an issue.

**Input Parameters:**
- `workspace` (string, required) - Workspace ID or slug
- `repoSlug` (string, required) - Repository slug
- `issueId` (number, required) - Issue ID

**Output:** JSON array of comment objects

**Required Permissions:** `issue:read`

**Example:**
```json
{
  "workspace": "my-workspace",
  "repoSlug": "my-repo",
  "issueId": 123
}
```

---

## Search Operations

### bitbucket_search_code

Searches for code in workspace repositories.

**Input Parameters:**
- `workspace` (string, required) - Workspace ID or slug
- `searchQuery` (string, required) - Search query

**Output:** JSON array of search result objects

**Required Permissions:** `repository:read`

**Example:**
```json
{
  "workspace": "my-workspace",
  "searchQuery": "function authenticate"
}
```

---

## Authentication

All tools require authentication via HTTP Basic Auth using:
- **Username**: Your Atlassian account email address
- **Password**: Bitbucket API token (not your account password)

### Creating an API Token

> [!IMPORTANT]
> **App passwords are deprecated.** As of September 9, 2025, app passwords can no longer be created. All existing app passwords will be disabled on June 9, 2026.

Create an API token at: https://bitbucket.org/account/settings/api-tokens/

**Required scopes:**
- Repositories: Read, Write
- Pull requests: Read, Write  
- Issues: Read, Write

**Important notes:**
- API tokens require an expiry date (maximum 1 year)
- You cannot view or modify an API token after creation
- Tokens are tied to your individual account - do not share them
- Use your Atlassian email as the username, not your Bitbucket username

## Error Handling

All tools return standardized error responses:

```json
{
  "error": true,
  "message": "Error description",
  "statusCode": 404,
  "details": {}
}
```

Common error codes:
- `401` - Authentication failed
- `403` - Forbidden / insufficient permissions
- `404` - Resource not found
- `429` - Rate limit exceeded

## Rate Limiting

Bitbucket Cloud API has rate limits. The server will return appropriate error messages when limits are exceeded. Consider implementing retry logic in your client application.
