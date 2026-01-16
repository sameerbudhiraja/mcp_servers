# 🐙 Git MCP Server

> A Model Context Protocol (MCP) server that provides GitHub API tools for AI assistants.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)

---

## 📖 Overview

**Git MCP** is an MCP server that provides both GitHub API functionality and local Git CLI commands as tools for AI assistants like Claude. It enables AI to interact with GitHub repositories remotely via API, manage code, read issues and pull requests, search across GitHub, and also perform local Git operations like init, add, commit, and push.

### What is MCP?

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) is an open protocol that enables AI assistants to securely connect to external data sources and tools. This server implements MCP to provide GitHub and Git capabilities to any MCP-compatible client.

### ✨ Key Features

- 🔧 **57 total tools** - 37 GitHub API tools + 20 local Git CLI tools
- 📂 **Repository management** - Create repos, manage branches, work with files
- 🔍 **Search** - Search repositories, code, issues, and commits
- 📝 **Code operations** - Read/write files, create commits, compare changes
- 🐛 **Issue & PR tracking** - Read issues, pull requests, reviews, and comments
- 💻 **Local Git operations** - Init, add, commit, push, pull, and more
- 🔐 **Secure** - Uses GitHub Personal Access Token for authentication

---

## 📋 Prerequisites

- **Node.js** >= 18.0.0
- **GitHub Personal Access Token** (Fine-grained recommended)

### Required Token Permissions

| Permission | Access Level | Purpose |
|------------|--------------|---------|
| **Code** | Read & Write | Create/update files, branches, commits |
| **Issues** | Read | List and view issues |
| **Pull Requests** | Read | List and view PRs |
| **Metadata** | Read | Repository information |
| **Administration** | Read & Write | Create new repositories |
| **Repository Advisories** | Read | Security advisories |

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/git-mcp.git
cd git-mcp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your GitHub token
nano .env  # or use your preferred editor
```

Add your GitHub Personal Access Token:

```env
GIT_TOKEN=your_github_personal_access_token_here
```

### 4. Run the server

```bash
node index.js
```

---

## 🛠️ Available Tools (57 Total)

### 📦 Repository Operations (5)

| Tool | Description |
|------|-------------|
| `get_my_repositories` | Get all repositories for authenticated user |
| `get_repo_details` | Get details of a specific repository |
| `list_repo_forks` | List all forks of a repository |
| `get_repo_topics` | Get repository topics/tags |
| `create_repo` | ✏️ Create a new repository |

### 🐛 Issue Operations (3)

| Tool | Description |
|------|-------------|
| `list_repo_issues` | List issues for a repository |
| `get_issue` | Get details of a specific issue |
| `list_issue_comments` | List all comments on an issue |

### 🔀 Pull Request Operations (5)

| Tool | Description |
|------|-------------|
| `list_pull_requests` | List pull requests for a repository |
| `get_pull_request` | Get PR details |
| `list_pr_reviews` | List PR reviews |
| `list_pr_files` | List files changed in a PR |
| `list_pr_comments` | List PR comments |

### 🌿 Branch Operations (5)

| Tool | Description |
|------|-------------|
| `list_branches` | List all branches in a repository |
| `get_branch` | Get branch details |
| `create_branch` | ✏️ Create a new branch |
| `delete_branch` | ✏️ Delete a branch |
| `get_default_branch` | Get default branch name |

### 📝 Commit Operations (3)

| Tool | Description |
|------|-------------|
| `list_commits` | List commits in a repository |
| `get_commit` | Get commit details |
| `compare_commits` | Compare two commits |

### 📄 File Operations (4)

| Tool | Description |
|------|-------------|
| `get_file_contents` | Get file contents |
| `create_or_update_file` | ✏️ Create or update a file |
| `delete_file` | ✏️ Delete a file |
| `get_directory_contents` | Get directory contents |

### 🌳 Tree & Blob Operations (3)

| Tool | Description |
|------|-------------|
| `get_tree` | Get git tree object |
| `get_blob` | Get git blob object |
| `create_blob` | ✏️ Create git blob |

### 🔍 Search Operations (4)

| Tool | Description |
|------|-------------|
| `search_repositories` | Search for repositories |
| `search_code` | Search for code |
| `search_issues` | Search for issues and PRs |
| `search_commits` | Search for commits |

### 🏷️ Tags & Diff Operations (3)

| Tool | Description |
|------|-------------|
| `list_tags` | List repository tags |
| `get_pull_request_diff` | Get PR diff |
| `get_commit_diff` | Get commit diff |

### 🛡️ Security Advisories (2)

| Tool | Description |
|------|-------------|
| `list_repository_advisories` | List security advisories |
| `get_repository_advisory` | Get specific advisory |

### 💻 Local Git CLI Operations (20)

| Tool | Description |
|------|-------------|
| `git_init` | Initialize a new Git repository |
| `git_status` | Get repository status |
| `git_add` | Stage files for commit |
| `git_commit` | Create a commit |
| `git_push` | Push commits to remote |
| `git_pull` | Pull changes from remote |
| `git_clone` | Clone a repository |
| `git_remote_add` | Add a remote repository |
| `git_remote_list` | List remote repositories |
| `git_remote_remove` | Remove a remote |
| `git_log` | Get commit history |
| `git_diff` | Show changes (diff) |
| `git_reset` | Reset to a commit |
| `git_checkout` | Switch or create branches |
| `git_branch_list` | List local branches |
| `git_branch_delete` | Delete a branch |
| `git_stash` | Stash changes |
| `git_tag` | Create a tag |
| `git_fetch` | Fetch from remote |
| `git_merge` | Merge branches |

> 📖 For detailed documentation of all tools and their parameters, see [GIT_TOOLS_REFERENCE.md](./GIT_TOOLS_REFERENCE.md)

---

## 💡 Usage Examples

### Creating a New Repository

```javascript
// Tool: create_repo
{
  "name": "my-awesome-project",
  "description": "An awesome new project",
  "isPrivate": false,
  "autoInit": true
}
```

### Creating/Updating a File

```javascript
// Tool: create_or_update_file
{
  "owner": "your-username",
  "repo": "my-repo",
  "path": "src/hello.js",
  "message": "Add hello.js",
  "content": "Y29uc29sZS5sb2coIkhlbGxvIFdvcmxkISIpOw==", // base64 encoded
  "branch": "main"
}
```

### Searching Code

```javascript
// Tool: search_code
{
  "query": "repo:owner/repo-name function login",
  "sort": "indexed",
  "order": "desc"
}
```

### Listing Commits

```javascript
// Tool: list_commits
{
  "owner": "your-username",
  "repo": "my-repo",
  "sha": "main",
  "path": "src/"
}
```

### Local Git Workflow

```javascript
// 1. Initialize a repository
// Tool: git_init
{
  "repoPath": "/path/to/my-project"
}

// 2. Stage all files
// Tool: git_add
{
  "repoPath": "/path/to/my-project",
  "files": "."
}

// 3. Create a commit
// Tool: git_commit
{
  "repoPath": "/path/to/my-project",
  "message": "Initial commit"
}

// 4. Add remote
// Tool: git_remote_add
{
  "repoPath": "/path/to/my-project",
  "name": "origin",
  "url": "https://github.com/username/repo.git"
}

// 5. Push to remote
// Tool: git_push
{
  "repoPath": "/path/to/my-project",
  "remote": "origin",
  "branch": "main",
  "setUpstream": true
}
```

---

## 🔌 MCP Client Integration

### Configuration Format

To configure this MCP server with any IDE or MCP client, use the following format:

```json
{
  "git-mcp": {
    "command": "node",
    "args": [
      "/absolute/path/to/git-mcp/index.js"
    ],
    "env": {
      "GIT_TOKEN": "your_github_personal_access_token"
    }
  }
}
```

| Field | Description |
|-------|-------------|
| `git-mcp` | Server name (you can change this) |
| `command` | The command to run (`node`) |
| `args` | Path to `index.js` file |
| `env.GIT_TOKEN` | Your GitHub Personal Access Token |

### Claude Desktop

Add to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "git-mcp": {
      "command": "node",
      "args": ["/absolute/path/to/git-mcp/index.js"],
      "env": {
        "GIT_TOKEN": "your_github_token_here"
      }
    }
  }
}
```

### Other MCP Clients

This server uses **stdio transport**, which means it communicates via standard input/output. Any MCP-compatible client can connect by spawning the process and communicating over stdio.

---

## 📁 Project Structure

```
git-mcp/
├── index.js                    # MCP server & tool registrations
├── src/
│   ├── github.js               # GitHub API functions
│   └── git.js                  # Local Git CLI functions
├── .env                        # Environment variables (gitignored)
├── .env.example                # Example environment file
├── package.json                # Project dependencies
├── GIT_TOOLS_REFERENCE.md      # Detailed API reference
└── README.md                   # This file
```

---

## 🤝 Contributing

> 🌟 **Vision**: We want to expand this MCP server beyond just GitHub tools! You can contribute tools for **Jira**, **Slack**, **Notion**, **Linear**, and more. The goal is to make this a **universal MCP server** that AI assistants can use to interact with all the tools developers use daily.

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Ideas for Contributions

**GitHub Enhancements:**
- Add more GitHub API endpoints
- Add support for GitHub Enterprise
- Improve error handling
- Add unit tests

**New Integrations:**
- 🎫 **Jira** - Create/manage issues, sprints, boards
- 💬 **Slack** - Send messages, manage channels
- 📝 **Notion** - Create/update pages, databases
- 📊 **Linear** - Issue tracking and project management
- 🔧 **GitLab** - Alternative git platform support
- 📦 **npm** - Package management tools

---
