# Git Tools Reference

This document provides an overview of all tools available in the MCP server, including both **Local Git CLI operations** and **GitHub API operations**.

---

## 💻 Local Git CLI Operations (20 functions)

These tools execute local Git commands on your filesystem using the `simple-git` library.

### Repository Initialization & Status (2 functions)

| Function | Description | Parameters |
|----------|-------------|------------|
| `git_init(repoPath)` | Initialize a new Git repository | repoPath |
| `git_status(repoPath)` | Get repository status | repoPath |

### Staging & Committing (2 functions)

| Function | Description | Parameters |
|----------|-------------|------------|
| `git_add(repoPath, files)` | Stage files for commit | repoPath, files (string or array, use '.' for all) |
| `git_commit(repoPath, message)` | Create a commit | repoPath, message |

### Remote Operations (6 functions)

| Function | Description | Parameters |
|----------|-------------|------------|
| `git_push(repoPath, remote, branch, setUpstream)` | Push commits to remote | repoPath, remote, branch, setUpstream (optional) |
| `git_pull(repoPath, remote, branch)` | Pull changes from remote | repoPath, remote, branch |
| `git_clone(url, targetPath)` | Clone a repository | url, targetPath |
| `git_remote_add(repoPath, name, url)` | Add a remote repository | repoPath, name, url |
| `git_remote_list(repoPath)` | List remote repositories | repoPath |
| `git_remote_remove(repoPath, name)` | Remove a remote | repoPath, name |

### History & Inspection (2 functions)

| Function | Description | Parameters |
|----------|-------------|------------|
| `git_log(repoPath, maxCount)` | Get commit history | repoPath, maxCount (optional, default: 10) |
| `git_diff(repoPath, options)` | Show changes (diff) | repoPath, options (optional) |

### Branch Operations (3 functions)

| Function | Description | Parameters |
|----------|-------------|------------|
| `git_checkout(repoPath, branch, createNew)` | Switch or create branches | repoPath, branch, createNew (optional) |
| `git_branch_list(repoPath)` | List local branches | repoPath |
| `git_branch_delete(repoPath, branch, force)` | Delete a branch | repoPath, branch, force (optional) |

### Advanced Operations (5 functions)

| Function | Description | Parameters |
|----------|-------------|------------|
| `git_reset(repoPath, mode, commit)` | Reset to a commit | repoPath, mode (optional: 'soft', 'mixed', 'hard'), commit (optional, default: 'HEAD') |
| `git_stash(repoPath, action)` | Stash changes | repoPath, action (optional: 'save', 'pop', 'list', 'clear') |
| `git_tag(repoPath, tagName, message)` | Create a tag | repoPath, tagName, message (optional, for annotated tags) |
| `git_fetch(repoPath, remote)` | Fetch from remote | repoPath, remote (optional, default: 'origin') |
| `git_merge(repoPath, branch)` | Merge branches | repoPath, branch |

### Usage Examples

```javascript
// Initialize and setup a repository
await git_init('/path/to/project');
await git_add('/path/to/project', '.');
await git_commit('/path/to/project', 'Initial commit');
await git_remote_add('/path/to/project', 'origin', 'https://github.com/user/repo.git');
await git_push('/path/to/project', 'origin', 'main', true);

// Check status and view history
await git_status('/path/to/project');
await git_log('/path/to/project', 5);

// Branch operations
await git_checkout('/path/to/project', 'feature-branch', true);
await git_branch_list('/path/to/project');
```

---

## 🐙 GitHub API Operations (37 functions)

These tools interact with GitHub's REST API using your personal access token.

# GitHub Tools Reference (Token Permission Compatible)

This document provides an overview of all GitHub API functions in `src/github.js` that are **compatible with your token permissions**.

## 🔐 Your Token Permissions

- ✅ **Read access**: issues, metadata, pull requests, repository advisories
- ✅ **Read and Write access**: code (files, branches, commits)
- ✅ **Administration**: Read and Write (for creating repositories)

## 📦 Repository Operations (5 functions) - Read/Write

| Function | Description | Parameters |
|----------|-------------|------------|
| `getMyRepos()` | Get all repositories for authenticated user | None |
| `getRepo(owner, repo)` | Get details of a specific repository | owner, repo |
| `listForks(owner, repo)` | List all forks of a repository | owner, repo |
| `getRepoTopics(owner, repo)` | Get repository topics/tags | owner, repo |
| `createRepo(name, description, isPrivate, autoInit)` | ✏️ Create a new repository | name, description (optional), isPrivate (optional), autoInit (optional) |

## 🐛 Issue Operations (3 functions) - Read Only

| Function | Description | Parameters |
|----------|-------------|------------|
| `listIssues(owner, repo, state)` | List repository issues | owner, repo, state (default: "open") |
| `getIssue(owner, repo, issueNumber)` | Get specific issue details | owner, repo, issueNumber |
| `listIssueComments(owner, repo, issueNumber)` | List all comments on an issue | owner, repo, issueNumber |

## 🔀 Pull Request Operations (5 functions) - Read Only

| Function | Description | Parameters |
|----------|-------------|------------|
| `listPullRequests(owner, repo, state)` | List pull requests | owner, repo, state (default: "open") |
| `getPullRequest(owner, repo, prNumber)` | Get PR details | owner, repo, prNumber |
| `listPRReviews(owner, repo, prNumber)` | List PR reviews | owner, repo, prNumber |
| `listPRFiles(owner, repo, prNumber)` | List files changed in PR | owner, repo, prNumber |
| `listPRComments(owner, repo, prNumber)` | List PR comments | owner, repo, prNumber |

## 🌿 Branch Operations (5 functions) - Read/Write

| Function | Description | Parameters |
|----------|-------------|------------|
| `listBranches(owner, repo)` | List all branches | owner, repo |
| `getBranch(owner, repo, branch)` | Get branch details | owner, repo, branch |
| `createBranch(owner, repo, newBranch, fromSha)` | ✏️ Create a new branch | owner, repo, newBranch, fromSha |
| `deleteBranch(owner, repo, branch)` | ✏️ Delete a branch | owner, repo, branch |
| `getDefaultBranch(owner, repo)` | Get default branch name | owner, repo |

## 📝 Commit Operations (3 functions) - Read Only

| Function | Description | Parameters |
|----------|-------------|------------|
| `listCommits(owner, repo, sha, path)` | List commits | owner, repo, sha (optional), path (optional) |
| `getCommit(owner, repo, sha)` | Get commit details | owner, repo, sha |
| `compareCommits(owner, repo, base, head)` | Compare two commits | owner, repo, base, head |

## 📄 File Operations (4 functions) - Read/Write

| Function | Description | Parameters |
|----------|-------------|------------|
| `getFileContents(owner, repo, path, ref)` | Get file contents | owner, repo, path, ref (optional) |
| `createOrUpdateFile(owner, repo, path, message, content, sha, branch)` | ✏️ Create or update a file | owner, repo, path, message, content (base64), sha (optional), branch (optional) |
| `deleteFile(owner, repo, path, message, sha, branch)` | ✏️ Delete a file | owner, repo, path, message, sha, branch (optional) |
| `getDirectoryContents(owner, repo, path, ref)` | Get directory contents | owner, repo, path (default: ""), ref (optional) |

## 🌳 Tree Operations (1 function) - Read Only

| Function | Description | Parameters |
|----------|-------------|------------|
| `getTree(owner, repo, treeSha, recursive)` | Get git tree | owner, repo, treeSha, recursive (default: false) |

## 💾 Blob Operations (2 functions) - Read/Write

| Function | Description | Parameters |
|----------|-------------|------------|
| `getBlob(owner, repo, fileSha)` | Get git blob | owner, repo, fileSha |
| `createBlob(owner, repo, content, encoding)` | ✏️ Create git blob | owner, repo, content, encoding (default: "utf-8") |

## 🛡️ Repository Advisories (2 functions) - Read Only

| Function | Description | Parameters |
|----------|-------------|------------|
| `listRepositoryAdvisories(owner, repo)` | List security advisories | owner, repo |
| `getRepositoryAdvisory(owner, repo, ghsaId)` | Get specific advisory | owner, repo, ghsaId |

## 🔍 Search Operations (4 functions) - Read Only

| Function | Description | Parameters |
|----------|-------------|------------|
| `searchRepositories(query, sort, order)` | Search repositories | query, sort (optional), order (default: "desc") |
| `searchCode(query, sort, order)` | Search code | query, sort (optional), order (default: "desc") |
| `searchIssues(query, sort, order)` | Search issues/PRs | query, sort (optional), order (default: "desc") |
| `searchCommits(query, sort, order)` | Search commits | query, sort (optional), order (default: "desc") |

## 🏷️ Tags Operations (1 function) - Read Only

| Function | Description | Parameters |
|----------|-------------|------------|
| `listTags(owner, repo)` | List repository tags | owner, repo |

## 📊 Diff Operations (2 functions) - Read Only

| Function | Description | Parameters |
|----------|-------------|------------|
| `getPullRequestDiff(owner, repo, prNumber)` | Get PR diff | owner, repo, prNumber |
| `getCommitDiff(owner, repo, sha)` | Get commit diff | owner, repo, sha |

---

## 📊 Summary

**Total Functions: 57**

**Local Git CLI Operations: 20**
- Repository Initialization & Status: 2
- Staging & Committing: 2
- Remote Operations: 6
- History & Inspection: 2
- Branch Operations: 3
- Advanced Operations: 5

**GitHub API Operations: 37**
- Repository Operations: 5 (Read/Write)
- Issue Operations: 3 (Read)
- Pull Request Operations: 5 (Read)
- Branch Operations: 5 (Read/Write)
- Commit Operations: 3 (Read)
- File Operations: 4 (Read/Write)
- Tree Operations: 1 (Read)
- Blob Operations: 2 (Read/Write)
- Repository Advisories: 2 (Read)
- Search Operations: 4 (Read)
- Tags Operations: 1 (Read)
- Diff Operations: 2 (Read)

**Read-Only Functions**: 28  
**Read/Write Functions**: 29 (9 GitHub API + 20 Local Git CLI)

## ⚠️ Removed Functions

The following operations were **removed** because they require permissions you don't have:

- ❌ Delete/Update repository settings (requires admin access)
- ❌ Fork repositories (requires write access to user scope)
- ❌ Create/Update/Close issues (requires write access to issues)
- ❌ Create/Update/Merge pull requests (requires write access to pull requests)
- ❌ Create/Delete releases (requires write access to releases)
- ❌ Add/Remove collaborators (requires admin access)
- ❌ Trigger/Cancel workflows (requires write access to actions)
- ❌ Create/Update/Delete gists (requires gist scope)
- ❌ Create/Delete labels (requires write access to issues)
- ❌ Create/Update/Delete milestones (requires write access to issues)
- ❌ User/Organization write operations (requires user scope)

## 🚀 Usage Examples

### Reading Repository Information
```javascript
import { getMyRepos, getRepo, listBranches } from './src/github.js';

// Get all your repositories
const repos = await getMyRepos();

// Get specific repo details
const repo = await getRepo('owner', 'repo-name');

// List branches
const branches = await listBranches('owner', 'repo-name');
```

### Working with Code (Read/Write)
```javascript
import { 
  getFileContents, 
  createOrUpdateFile, 
  createBranch,
  getCommit 
} from './src/github.js';

// Read a file
const file = await getFileContents('owner', 'repo', 'path/to/file.js');

// Create a new branch
const newBranch = await createBranch('owner', 'repo', 'feature-branch', 'base-sha');

// Update a file (content must be base64 encoded)
const content = Buffer.from('console.log("Hello");').toString('base64');
await createOrUpdateFile(
  'owner', 
  'repo', 
  'path/to/file.js',
  'Update file',
  content,
  'file-sha', // required for updates
  'feature-branch'
);
```

### Reading Issues and PRs
```javascript
import { 
  listIssues, 
  getIssue, 
  listPullRequests,
  getPullRequest,
  listPRFiles 
} from './src/github.js';

// List open issues
const issues = await listIssues('owner', 'repo', 'open');

// Get specific issue
const issue = await getIssue('owner', 'repo', 123);

// List PRs
const prs = await listPullRequests('owner', 'repo', 'open');

// Get PR files
const files = await listPRFiles('owner', 'repo', 456);
```

### Searching
```javascript
import { searchCode, searchIssues, searchCommits } from './src/github.js';

// Search for code
const codeResults = await searchCode('repo:owner/repo function');

// Search issues
const issueResults = await searchIssues('repo:owner/repo is:open label:bug');

// Search commits
const commitResults = await searchCommits('repo:owner/repo author:username');
```

## 🔐 Authentication

All functions use the GitHub personal access token from the `GIT_TOKEN` environment variable:

```bash
# .env file
GIT_TOKEN=your_github_personal_access_token
```

## ✅ What You Can Do

With your current permissions, you can:

- ✅ **Create new repositories** (public or private, with optional README)
- ✅ Read repository metadata, issues, PRs, and advisories
- ✅ Create, update, and delete files in repositories
- ✅ Create and delete branches
- ✅ Read commit history and compare commits
- ✅ Search across repositories, code, issues, and commits
- ✅ Get file and directory contents
- ✅ Work with git blobs and trees
- ✅ View PR diffs and commit diffs
