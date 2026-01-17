# GitHub MCP Server - Refactored Architecture

A professionally structured Model Context Protocol (MCP) server providing GitHub API operations and local Git CLI commands.

## 🏗️ Architecture Overview

This codebase follows industry-standard patterns with clear separation of concerns:

```
github/
├── src/
│   ├── config/              # Configuration management
│   │   └── index.js         # Environment variables & app config
│   ├── constants/           # Application constants
│   │   ├── index.js         # Central export
│   │   ├── endpoints.js     # GitHub API endpoints
│   │   ├── errorMessages.js # Error message templates
│   │   └── toolSchemas.js   # Zod validation schemas
│   ├── services/            # Business logic layer
│   │   ├── githubClient.js  # Configured axios instance
│   │   ├── github/          # GitHub API services
│   │   │   ├── index.js     # Service aggregator
│   │   │   ├── repository.js
│   │   │   ├── issue.js
│   │   │   ├── pullRequest.js
│   │   │   ├── branch.js
│   │   │   ├── commit.js
│   │   │   ├── file.js
│   │   │   ├── tree.js
│   │   │   └── search.js
│   │   └── git/             # Git CLI services
│   │       └── index.js
│   ├── tools/               # MCP tool registrations
│   │   ├── index.js         # Tool registration orchestrator
│   │   ├── github/          # GitHub tool registrations
│   │   │   └── index.js
│   │   └── git/             # Git CLI tool registrations
│   │       └── index.js
│   └── utils/               # Utility functions
│       ├── index.js         # Utility aggregator
│       ├── errorHandler.js  # Error handling
│       ├── responseFormatter.js # Response formatting
│       └── logger.js        # Logging utilities
├── index.js                 # Main server entry point
├── package.json
└── .env                     # Environment variables
```

## 🎯 Key Features

### 1. **Separation of Concerns**
- **Config Layer**: Centralized configuration with validation
- **Constants Layer**: All constants, endpoints, and schemas in one place
- **Service Layer**: Business logic separated from presentation
- **Tools Layer**: MCP tool registrations with consistent error handling
- **Utils Layer**: Reusable utilities for error handling, logging, and formatting

### 2. **Type Safety**
- Zod schemas for all tool inputs
- Centralized schema definitions for consistency
- Runtime validation of all inputs

### 3. **Error Handling**
- Centralized error handling utilities
- Consistent error messages
- Proper error logging and formatting
- Graceful error recovery

### 4. **Maintainability**
- Each file has a single responsibility
- Easy to locate and modify specific functionality
- Clear module boundaries
- Comprehensive JSDoc comments

### 5. **Scalability**
- Easy to add new tools and services
- Modular architecture supports growth
- Services can be reused across tools

## 📦 Installation

```bash
npm install
```

## ⚙️ Configuration

Create a `.env` file with the following variables:

```env
# Required
GIT_TOKEN=your_github_personal_access_token

# Optional
NODE_ENV=development
GIT_API_VERSION=2022-11-28
GIT_BASE_URL=https://api.github.com
GIT_TIMEOUT=30000
LOG_LEVEL=error
LOGGING_ENABLED=true
```

## 🚀 Usage

Start the MCP server:

```bash
node index.js
```

## 🛠️ Available Tools

### GitHub API Operations

#### Repository Operations
- `get_my_repositories` - Fetch all user repositories
- `get_repo_details` - Get repository details
- `list_repo_forks` - List repository forks
- `get_repo_topics` - Get repository topics
- `create_repo` - Create a new repository
- `list_tags` - List repository tags

#### Issue Operations
- `list_repo_issues` - List repository issues
- `get_issue` - Get issue details
- `list_issue_comments` - List issue comments

#### Pull Request Operations
- `list_pull_requests` - List pull requests
- `get_pull_request` - Get PR details
- `list_pr_reviews` - List PR reviews
- `list_pr_files` - List PR files
- `list_pr_comments` - List PR comments
- `get_pull_request_diff` - Get PR diff

#### Branch Operations
- `list_branches` - List branches
- `get_branch` - Get branch details
- `create_branch` - Create a new branch
- `delete_branch` - Delete a branch
- `get_default_branch` - Get default branch name

#### Commit Operations
- `list_commits` - List commits
- `get_commit` - Get commit details
- `compare_commits` - Compare two commits
- `get_commit_diff` - Get commit diff

#### File Operations
- `get_file_contents` - Get file contents
- `create_or_update_file` - Create or update a file
- `delete_file` - Delete a file
- `get_directory_contents` - Get directory contents

#### Tree & Blob Operations
- `get_tree` - Get git tree
- `get_blob` - Get git blob
- `create_blob` - Create git blob

#### Search Operations
- `search_repositories` - Search repositories
- `search_code` - Search code
- `search_issues` - Search issues
- `search_commits` - Search commits

#### Security Operations
- `list_repository_advisories` - List security advisories
- `get_repository_advisory` - Get specific advisory

### Git CLI Operations

- `git_init` - Initialize repository
- `git_status` - Get repository status
- `git_add` - Stage files
- `git_commit` - Create commit
- `git_push` - Push to remote
- `git_pull` - Pull from remote
- `git_clone` - Clone repository
- `git_remote_add` - Add remote
- `git_remote_list` - List remotes
- `git_remote_remove` - Remove remote
- `git_log` - View commit history
- `git_diff` - Show changes
- `git_reset` - Reset to commit
- `git_checkout` - Switch branches
- `git_branch_list` - List branches
- `git_branch_delete` - Delete branch
- `git_stash` - Stash changes
- `git_tag` - Create tag
- `git_fetch` - Fetch from remote
- `git_merge` - Merge branches

## 🔧 Development

### Adding a New Service

1. Create service file in `src/services/github/` or `src/services/git/`
2. Export functions from the service
3. Add exports to `src/services/github/index.js` or `src/services/git/index.js`

### Adding a New Tool

1. Add schema to `src/constants/toolSchemas.js`
2. Register tool in `src/tools/github/index.js` or `src/tools/git/index.js`
3. Use service functions and utility formatters

### Project Structure Benefits

- **Easy Testing**: Each module can be tested independently
- **Clear Dependencies**: Import paths show module relationships
- **Code Reuse**: Services shared across multiple tools
- **Consistent Patterns**: All tools follow the same structure
- **Easy Onboarding**: New developers can quickly understand the codebase

## 📝 Code Style

- **ES6+ JavaScript** with CommonJS modules
- **JSDoc comments** for all public functions
- **Consistent error handling** using utility functions
- **Descriptive variable names** following camelCase
- **Modular design** with single responsibility principle

## 🔍 Logging

Configure logging via environment variables:

```env
LOG_LEVEL=debug|info|warn|error
LOGGING_ENABLED=true|false
```

Logs include:
- Server startup/shutdown
- Configuration validation
- Error details with context
- Tool execution (debug level)

## 🤝 Contributing

When contributing:
1. Follow the existing code structure
2. Add JSDoc comments to new functions
3. Use the centralized utilities for errors and responses
4. Add schemas for new tool inputs
5. Keep services focused on single responsibilities

## 📄 License

[Your License Here]

## 🙏 Acknowledgments

Built with:
- [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/sdk) - MCP SDK
- [axios](https://github.com/axios/axios) - HTTP client
- [simple-git](https://github.com/steveukx/git-js) - Git CLI wrapper
- [zod](https://github.com/colinhacks/zod) - Schema validation

---

**Previous Structure**: Monolithic 1000+ line `index.js`  
**New Structure**: Modular, maintainable, industry-standard architecture ✨
