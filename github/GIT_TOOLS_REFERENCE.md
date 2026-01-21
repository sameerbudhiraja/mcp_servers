# GitHub MCP Server - Tools Reference

Complete technical reference for all 57 tools available in the GitHub MCP Server.

---

## Table of Contents
- [HTTP Headers & Authentication](#http-headers--authentication)
- [Git CLI Tools (20)](#-git-cli-tools-20)
- [GitHub API Tools (37)](#-github-api-tools-37)
- [Token Permissions Matrix](#-token-permissions-matrix)

---

## HTTP Headers & Authentication

### GitHub API Headers

All GitHub API requests use the following headers configured in `src/services/github-client.js`:

| Header | Value | Purpose |
|--------|-------|---------|
| `Authorization` | `Bearer ${GIT_TOKEN}` | Authentication via Personal Access Token |
| `Accept` | `application/vnd.github+json` | Standard GitHub API JSON response format |
| `X-GitHub-Api-Version` | `2022-11-28` | API version (configurable via `GIT_API_VERSION`) |

### Special Accept Headers

Some operations use specific Accept headers:

| Operation | Accept Header | Purpose |
|-----------|---------------|---------|
| Get Repository Topics | `application/vnd.github.mercy-preview+json` | Topics preview API |
| Get Commit Diff | `application/vnd.github.v3.diff` | Raw diff format |
| Get PR Diff | `application/vnd.github.v3.diff` | Raw diff format |

### Request Configuration

| Setting | Default | Environment Variable |
|---------|---------|---------------------|
| Base URL | `https://api.github.com` | `GIT_BASE_URL` |
| Timeout | 30000ms | `GIT_TIMEOUT` |
| API Version | `2022-11-28` | `GIT_API_VERSION` |

---

## 💻 Git CLI Tools (20)

These tools execute local Git commands via the `simple-git` library. They operate on the local filesystem.

### Repository Initialization & Status

#### `git_init`
Initialize a new Git repository.

| Property | Details |
|----------|---------|
| **Input** | `repoPath` (string) - Path where to initialize the repository |
| **Output** | String - Success message |
| **Git Operation** | `git init` |
| **Permissions** | Local filesystem access only |

```javascript
// Input
{ "repoPath": "/path/to/project" }

// Output
"Initialized empty Git repository in /path/to/project"
```

---

#### `git_status`
Get the status of a Git repository.

| Property | Details |
|----------|---------|
| **Input** | `repoPath` (string) - Path to the repository |
| **Output** | Object - Status object with modified, staged, untracked files |
| **Git Operation** | `git status` |
| **Permissions** | Local filesystem access only |

```javascript
// Input
{ "repoPath": "/path/to/project" }

// Output
{
  "current": "main",
  "tracking": "origin/main",
  "modified": ["file1.js"],
  "staged": [],
  "not_added": ["newfile.txt"]
}
```

---

### Staging & Committing

#### `git_add`
Stage files for commit.

| Property | Details |
|----------|---------|
| **Input** | `repoPath` (string), `files` (string or array) - Use `'.'` for all files |
| **Output** | String - Success message |
| **Git Operation** | `git add <files>` |
| **Permissions** | Local filesystem access only |

```javascript
// Input - Stage all files
{ "repoPath": "/path/to/project", "files": "." }

// Input - Stage specific files
{ "repoPath": "/path/to/project", "files": ["file1.js", "file2.js"] }

// Output
"Added . to staging area"
```

---

#### `git_commit`
Create a commit with staged changes.

| Property | Details |
|----------|---------|
| **Input** | `repoPath` (string), `message` (string) - Commit message |
| **Output** | Object - Commit result with hash and summary |
| **Git Operation** | `git commit -m "<message>"` |
| **Permissions** | Local filesystem access only |

```javascript
// Input
{ "repoPath": "/path/to/project", "message": "Add new feature" }

// Output
{
  "branch": "main",
  "commit": "abc1234",
  "summary": { "changes": 3, "insertions": 45, "deletions": 12 }
}
```

---

### Remote Operations

#### `git_push`
Push commits to a remote repository.

| Property | Details |
|----------|---------|
| **Input** | `repoPath`, `remote`, `branch`, `setUpstream` (optional boolean) |
| **Output** | Object - Push result |
| **Git Operation** | `git push <remote> <branch>` or `git push --set-upstream <remote> <branch>` |
| **Permissions** | Local + remote write access |

---

#### `git_pull`
Pull changes from a remote repository.

| Property | Details |
|----------|---------|
| **Input** | `repoPath`, `remote` (e.g., 'origin'), `branch` (e.g., 'main') |
| **Output** | Object - Pull result with merge info |
| **Git Operation** | `git pull <remote> <branch>` |
| **Permissions** | Local + remote read access |

---

#### `git_clone`
Clone a repository from a URL.

| Property | Details |
|----------|---------|
| **Input** | `url` (string), `targetPath` (string) |
| **Output** | String - Success message |
| **Git Operation** | `git clone <url> <targetPath>` |
| **Permissions** | Remote read access |

---

#### `git_remote_add`
Add a remote repository.

| Property | Details |
|----------|---------|
| **Input** | `repoPath`, `name` (e.g., 'origin'), `url` |
| **Output** | String - Success message |
| **Git Operation** | `git remote add <name> <url>` |
| **Permissions** | Local filesystem access only |

---

#### `git_remote_list`
List all remote repositories.

| Property | Details |
|----------|---------|
| **Input** | `repoPath` (string) |
| **Output** | Array - List of remotes with name, fetch URL, push URL |
| **Git Operation** | `git remote -v` |
| **Permissions** | Local filesystem access only |

---

#### `git_remote_remove`
Remove a remote repository.

| Property | Details |
|----------|---------|
| **Input** | `repoPath`, `name` |
| **Output** | String - Success message |
| **Git Operation** | `git remote remove <name>` |
| **Permissions** | Local filesystem access only |

---

### History & Inspection

#### `git_log`
Get commit history.

| Property | Details |
|----------|---------|
| **Input** | `repoPath`, `maxCount` (optional, default: 10) |
| **Output** | Object - Log with array of commits |
| **Git Operation** | `git log -n <maxCount>` |
| **Permissions** | Local filesystem access only |

---

#### `git_diff`
Show changes (diff) in the repository.

| Property | Details |
|----------|---------|
| **Input** | `repoPath`, `options` (optional object, e.g., `{ '--cached': null }`) |
| **Output** | String - Diff output |
| **Git Operation** | `git diff [options]` |
| **Permissions** | Local filesystem access only |

---

### Branch Operations

#### `git_checkout`
Switch to a branch or create a new branch.

| Property | Details |
|----------|---------|
| **Input** | `repoPath`, `branch`, `createNew` (optional boolean) |
| **Output** | String - Success message |
| **Git Operation** | `git checkout <branch>` or `git checkout -b <branch>` |
| **Permissions** | Local filesystem access only |

---

#### `git_branch_list`
List all local branches.

| Property | Details |
|----------|---------|
| **Input** | `repoPath` (string) |
| **Output** | Object - Branch list with current, all branches |
| **Git Operation** | `git branch` |
| **Permissions** | Local filesystem access only |

---

#### `git_branch_delete`
Delete a local branch.

| Property | Details |
|----------|---------|
| **Input** | `repoPath`, `branch`, `force` (optional boolean) |
| **Output** | String - Success message |
| **Git Operation** | `git branch -d <branch>` or `git branch -D <branch>` |
| **Permissions** | Local filesystem access only |

---

### Advanced Operations

#### `git_reset`
Reset to a specific commit.

| Property | Details |
|----------|---------|
| **Input** | `repoPath`, `mode` (optional: 'soft', 'mixed', 'hard'), `commit` (optional, default: 'HEAD') |
| **Output** | String - Success message |
| **Git Operation** | `git reset --<mode> <commit>` |
| **Permissions** | Local filesystem access only |

---

#### `git_stash`
Stash changes in the working directory.

| Property | Details |
|----------|---------|
| **Input** | `repoPath`, `action` (optional: 'save', 'pop', 'list', 'clear') |
| **Output** | String or Object - Depends on action |
| **Git Operation** | `git stash [action]` |
| **Permissions** | Local filesystem access only |

---

#### `git_tag`
Create a tag.

| Property | Details |
|----------|---------|
| **Input** | `repoPath`, `tagName`, `message` (optional, for annotated tags) |
| **Output** | String - Success message |
| **Git Operation** | `git tag <tagName>` or `git tag -a <tagName> -m "<message>"` |
| **Permissions** | Local filesystem access only |

---

#### `git_fetch`
Fetch from a remote repository.

| Property | Details |
|----------|---------|
| **Input** | `repoPath`, `remote` (optional, default: 'origin') |
| **Output** | Object - Fetch result |
| **Git Operation** | `git fetch <remote>` |
| **Permissions** | Remote read access |

---

#### `git_merge`
Merge a branch into the current branch.

| Property | Details |
|----------|---------|
| **Input** | `repoPath`, `branch` |
| **Output** | Object - Merge result |
| **Git Operation** | `git merge <branch>` |
| **Permissions** | Local filesystem access only |

---

## 🐙 GitHub API Tools (37)

These tools interact with GitHub's REST API using authenticated HTTP requests.

---

### Repository Operations (8 tools)

#### `get_my_repositories`
Fetch all repositories for the authenticated user.

| Property | Details |
|----------|---------|
| **Input** | None |
| **Output** | Array - List of repository objects |
| **HTTP Method** | `GET` |
| **Endpoint** | `/user/repos` |
| **Accept Header** | `application/vnd.github+json` |
| **Token Permissions** | `repo:read` or `public_repo` |

---

#### `get_repo_details`
Get details of a specific repository.

| Property | Details |
|----------|---------|
| **Input** | `owner` (string), `repo` (string) |
| **Output** | Object - Repository details |
| **HTTP Method** | `GET` |
| **Endpoint** | `/repos/{owner}/{repo}` |
| **Accept Header** | `application/vnd.github+json` |
| **Token Permissions** | `repo:read` or `public_repo` |

---

#### `list_repo_forks`
List all forks of a repository.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo` |
| **Output** | Array - List of fork objects |
| **HTTP Method** | `GET` |
| **Endpoint** | `/repos/{owner}/{repo}/forks` |
| **Token Permissions** | `repo:read` |

---

#### `get_repo_topics`
Get repository topics/tags.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo` |
| **Output** | Object - Topics list |
| **HTTP Method** | `GET` |
| **Endpoint** | `/repos/{owner}/{repo}/topics` |
| **Accept Header** | `application/vnd.github.mercy-preview+json` ⚠️ Special header |
| **Token Permissions** | `repo:read` |

---

#### `create_repo`
Create a new repository for the authenticated user.

| Property | Details |
|----------|---------|
| **Input** | `name`, `description` (optional), `isPrivate` (optional), `autoInit` (optional) |
| **Output** | Object - Created repository |
| **HTTP Method** | `POST` |
| **Endpoint** | `/user/repos` |
| **Token Permissions** | `repo:write` or `admin:repo` |

---

#### `list_repository_advisories`
List security advisories for a repository.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo` |
| **Output** | Array - Security advisories |
| **HTTP Method** | `GET` |
| **Endpoint** | `/repos/{owner}/{repo}/security-advisories` |
| **Token Permissions** | `security_events:read` |

---

#### `get_repository_advisory`
Get a specific security advisory.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo`, `ghsaId` |
| **Output** | Object - Advisory details |
| **HTTP Method** | `GET` |
| **Endpoint** | `/repos/{owner}/{repo}/security-advisories/{ghsa_id}` |
| **Token Permissions** | `security_events:read` |

---

#### `list_tags`
List all tags in a repository.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo` |
| **Output** | Array - Tag objects |
| **HTTP Method** | `GET` |
| **Endpoint** | `/repos/{owner}/{repo}/tags` |
| **Token Permissions** | `repo:read` |

---

### Issue Operations (3 tools)

#### `list_repo_issues`
List issues for a specific repository.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo`, `state` (optional: 'open', 'closed', 'all') |
| **Output** | Array - Issue objects |
| **HTTP Method** | `GET` |
| **Endpoint** | `/repos/{owner}/{repo}/issues` |
| **Token Permissions** | `issues:read` |

---

#### `get_issue`
Get details of a specific issue.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo`, `issueNumber` (integer) |
| **Output** | Object - Issue details |
| **HTTP Method** | `GET` |
| **Endpoint** | `/repos/{owner}/{repo}/issues/{issue_number}` |
| **Token Permissions** | `issues:read` |

---

#### `list_issue_comments`
List all comments on an issue.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo`, `issueNumber` (integer) |
| **Output** | Array - Comment objects |
| **HTTP Method** | `GET` |
| **Endpoint** | `/repos/{owner}/{repo}/issues/{issue_number}/comments` |
| **Token Permissions** | `issues:read` |

---

### Pull Request Operations (6 tools)

#### `list_pull_requests`
List pull requests for a repository.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo`, `state` (optional: 'open', 'closed', 'all') |
| **Output** | Array - PR objects |
| **HTTP Method** | `GET` |
| **Endpoint** | `/repos/{owner}/{repo}/pulls` |
| **Token Permissions** | `pull_requests:read` |

---

#### `get_pull_request`
Get details of a specific pull request.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo`, `prNumber` (integer) |
| **Output** | Object - PR details |
| **HTTP Method** | `GET` |
| **Endpoint** | `/repos/{owner}/{repo}/pulls/{pull_number}` |
| **Token Permissions** | `pull_requests:read` |

---

#### `list_pr_reviews`
List reviews for a pull request.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo`, `prNumber` (integer) |
| **Output** | Array - Review objects |
| **HTTP Method** | `GET` |
| **Endpoint** | `/repos/{owner}/{repo}/pulls/{pull_number}/reviews` |
| **Token Permissions** | `pull_requests:read` |

---

#### `list_pr_files`
List files changed in a pull request.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo`, `prNumber` (integer) |
| **Output** | Array - File change objects |
| **HTTP Method** | `GET` |
| **Endpoint** | `/repos/{owner}/{repo}/pulls/{pull_number}/files` |
| **Token Permissions** | `pull_requests:read` |

---

#### `list_pr_comments`
List comments on a pull request.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo`, `prNumber` (integer) |
| **Output** | Array - Comment objects |
| **HTTP Method** | `GET` |
| **Endpoint** | `/repos/{owner}/{repo}/pulls/{pull_number}/comments` |
| **Token Permissions** | `pull_requests:read` |

---

#### `get_pull_request_diff`
Get the diff for a pull request.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo`, `prNumber` (integer) |
| **Output** | String - Raw diff |
| **HTTP Method** | `GET` |
| **Endpoint** | `/repos/{owner}/{repo}/pulls/{pull_number}` |
| **Accept Header** | `application/vnd.github.v3.diff` ⚠️ Special header |
| **Token Permissions** | `pull_requests:read` |

---

### Branch Operations (5 tools)

#### `list_branches`
List all branches in a repository.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo` |
| **Output** | Array - Branch objects |
| **HTTP Method** | `GET` |
| **Endpoint** | `/repos/{owner}/{repo}/branches` |
| **Token Permissions** | `repo:read` |

---

#### `get_branch`
Get details of a specific branch.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo`, `branch` |
| **Output** | Object - Branch details with protection status |
| **HTTP Method** | `GET` |
| **Endpoint** | `/repos/{owner}/{repo}/branches/{branch}` |
| **Token Permissions** | `repo:read` |

---

#### `create_branch`
Create a new branch from a specific commit SHA.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo`, `newBranch`, `fromSha` |
| **Output** | Object - Ref object |
| **HTTP Method** | `POST` |
| **Endpoint** | `/repos/{owner}/{repo}/git/refs` |
| **Request Body** | `{ "ref": "refs/heads/{newBranch}", "sha": "{fromSha}" }` |
| **Token Permissions** | `contents:write` |

---

#### `delete_branch`
Delete a branch from the repository.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo`, `branch` |
| **Output** | Void (204 No Content) |
| **HTTP Method** | `DELETE` |
| **Endpoint** | `/repos/{owner}/{repo}/git/refs/heads/{branch}` |
| **Token Permissions** | `contents:write` |

---

#### `get_default_branch`
Get the default branch name for a repository.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo` |
| **Output** | Object - Repository with default_branch field |
| **HTTP Method** | `GET` |
| **Endpoint** | `/repos/{owner}/{repo}` |
| **Token Permissions** | `repo:read` |

---

### Commit Operations (4 tools)

#### `list_commits`
List commits in a repository.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo`, `sha` (optional), `path` (optional) |
| **Output** | Array - Commit objects |
| **HTTP Method** | `GET` |
| **Endpoint** | `/repos/{owner}/{repo}/commits` |
| **Token Permissions** | `repo:read` |

---

#### `get_commit`
Get details of a specific commit.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo`, `sha` |
| **Output** | Object - Commit details with files |
| **HTTP Method** | `GET` |
| **Endpoint** | `/repos/{owner}/{repo}/commits/{sha}` |
| **Token Permissions** | `repo:read` |

---

#### `compare_commits`
Compare two commits.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo`, `base`, `head` |
| **Output** | Object - Comparison with files, commits |
| **HTTP Method** | `GET` |
| **Endpoint** | `/repos/{owner}/{repo}/compare/{base}...{head}` |
| **Token Permissions** | `repo:read` |

---

#### `get_commit_diff`
Get the diff for a commit.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo`, `sha` |
| **Output** | String - Raw diff |
| **HTTP Method** | `GET` |
| **Endpoint** | `/repos/{owner}/{repo}/commits/{sha}` |
| **Accept Header** | `application/vnd.github.v3.diff` ⚠️ Special header |
| **Token Permissions** | `repo:read` |

---

### File Operations (4 tools)

#### `get_file_contents`
Get the contents of a file from the repository.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo`, `path`, `ref` (optional) |
| **Output** | Object - File content (base64 encoded in `content` field) |
| **HTTP Method** | `GET` |
| **Endpoint** | `/repos/{owner}/{repo}/contents/{path}` |
| **Token Permissions** | `contents:read` |

---

#### `create_or_update_file`
Create or update a file in the repository.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo`, `path`, `message`, `content` (base64), `sha` (required for update), `branch` (optional) |
| **Output** | Object - Commit and content details |
| **HTTP Method** | `PUT` |
| **Endpoint** | `/repos/{owner}/{repo}/contents/{path}` |
| **Token Permissions** | `contents:write` |

> ⚠️ **Note**: Content must be base64 encoded. Use `Buffer.from(text).toString('base64')` in Node.js.

---

#### `delete_file`
Delete a file from the repository.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo`, `path`, `message`, `sha`, `branch` (optional) |
| **Output** | Object - Commit details |
| **HTTP Method** | `DELETE` |
| **Endpoint** | `/repos/{owner}/{repo}/contents/{path}` |
| **Token Permissions** | `contents:write` |

---

#### `get_directory_contents`
Get the contents of a directory in the repository.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo`, `path` (optional, default: root), `ref` (optional) |
| **Output** | Array - File/directory objects |
| **HTTP Method** | `GET` |
| **Endpoint** | `/repos/{owner}/{repo}/contents/{path}` |
| **Token Permissions** | `contents:read` |

---

### Tree & Blob Operations (3 tools)

#### `get_tree`
Get a git tree object.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo`, `treeSha`, `recursive` (optional boolean) |
| **Output** | Object - Tree with entries |
| **HTTP Method** | `GET` |
| **Endpoint** | `/repos/{owner}/{repo}/git/trees/{tree_sha}` |
| **Token Permissions** | `contents:read` |

---

#### `get_blob`
Get a git blob object.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo`, `fileSha` |
| **Output** | Object - Blob with content (base64) |
| **HTTP Method** | `GET` |
| **Endpoint** | `/repos/{owner}/{repo}/git/blobs/{file_sha}` |
| **Token Permissions** | `contents:read` |

---

#### `create_blob`
Create a git blob object.

| Property | Details |
|----------|---------|
| **Input** | `owner`, `repo`, `content`, `encoding` (optional, default: 'utf-8') |
| **Output** | Object - Blob SHA and URL |
| **HTTP Method** | `POST` |
| **Endpoint** | `/repos/{owner}/{repo}/git/blobs` |
| **Token Permissions** | `contents:write` |

---

### Search Operations (4 tools)

#### `search_repositories`
Search for repositories on GitHub.

| Property | Details |
|----------|---------|
| **Input** | `query`, `sort` (optional: 'stars', 'forks', 'updated'), `order` (optional) |
| **Output** | Object - Search results with items |
| **HTTP Method** | `GET` |
| **Endpoint** | `/search/repositories` |
| **Token Permissions** | None (public search) |

---

#### `search_code`
Search for code on GitHub.

| Property | Details |
|----------|---------|
| **Input** | `query`, `sort` (optional: 'indexed'), `order` (optional) |
| **Output** | Object - Search results with items |
| **HTTP Method** | `GET` |
| **Endpoint** | `/search/code` |
| **Token Permissions** | `repo:read` (for private repos) |

---

#### `search_issues`
Search for issues and pull requests on GitHub.

| Property | Details |
|----------|---------|
| **Input** | `query`, `sort` (optional: 'comments', 'created', 'updated'), `order` (optional) |
| **Output** | Object - Search results with items |
| **HTTP Method** | `GET` |
| **Endpoint** | `/search/issues` |
| **Token Permissions** | None (public search) |

---

#### `search_commits`
Search for commits on GitHub.

| Property | Details |
|----------|---------|
| **Input** | `query`, `sort` (optional: 'author-date', 'committer-date'), `order` (optional) |
| **Output** | Object - Search results with items |
| **HTTP Method** | `GET` |
| **Endpoint** | `/search/commits` |
| **Token Permissions** | `repo:read` (for private repos) |

---

## 🔐 Token Permissions Matrix

### Summary by Category

| Category | Read Permission | Write Permission |
|----------|-----------------|------------------|
| **Repository** | `repo:read` | `repo:write`, `admin:repo` |
| **Issues** | `issues:read` | `issues:write` |
| **Pull Requests** | `pull_requests:read` | `pull_requests:write` |
| **Contents/Files** | `contents:read` | `contents:write` |
| **Security** | `security_events:read` | `security_events:write` |
| **Search** | Public: None, Private: `repo:read` | N/A |

### Tools by Permission Required

#### Read-Only Tools (28 tools)
No write permissions needed:

| Tools | Permission |
|-------|------------|
| `get_my_repositories`, `get_repo_details`, `list_repo_forks`, `get_repo_topics`, `list_tags` | `repo:read` |
| `list_repository_advisories`, `get_repository_advisory` | `security_events:read` |
| `list_repo_issues`, `get_issue`, `list_issue_comments` | `issues:read` |
| `list_pull_requests`, `get_pull_request`, `list_pr_reviews`, `list_pr_files`, `list_pr_comments`, `get_pull_request_diff` | `pull_requests:read` |
| `list_branches`, `get_branch`, `get_default_branch` | `repo:read` |
| `list_commits`, `get_commit`, `compare_commits`, `get_commit_diff` | `repo:read` |
| `get_file_contents`, `get_directory_contents`, `get_tree`, `get_blob` | `contents:read` |
| `search_*` | None or `repo:read` |

#### Write Tools (9 GitHub API tools)
Require write/admin permissions:

| Tool | Permission Required |
|------|---------------------|
| `create_repo` | `repo:write` or `admin:repo` |
| `create_branch` | `contents:write` |
| `delete_branch` | `contents:write` |
| `create_or_update_file` | `contents:write` |
| `delete_file` | `contents:write` |
| `create_blob` | `contents:write` |

#### Git CLI Tools (20 tools)
All Git CLI tools require only local filesystem access. No GitHub token permissions needed for local operations.

---

## ⚠️ Operations NOT Supported

The following operations are **not implemented** as they require permissions beyond typical token scopes:

- ❌ Fork repositories
- ❌ Create/update/close issues
- ❌ Create/update/merge pull requests  
- ❌ Create/delete releases
- ❌ Add/remove collaborators
- ❌ Trigger/cancel workflows
- ❌ Create/update/delete gists
- ❌ Create/delete labels and milestones
- ❌ Delete/update repository settings

---

**Total Tools: 57** | **GitHub API: 37** | **Git CLI: 20** | **Read-Only: 28** | **Read/Write: 29**
