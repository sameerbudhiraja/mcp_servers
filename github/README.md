# GitHub MCP Server

A comprehensive Model Context Protocol (MCP) server providing **57 tools** for GitHub API operations and local Git CLI commands. Built with industry-standard modular architecture.

---

## 📊 Quick Stats

| Category | Count |
|----------|-------|
| **Total Tools** | 57 |
| **GitHub API Tools** | 37 |
| **Git CLI Tools** | 20 |
| **Read-Only Operations** | 28 |
| **Read/Write Operations** | 29 |

---

## 🏗️ Architecture Overview

This server follows a layered, modular architecture with clear separation of concerns:

```
github/
├── index.js                 # Main entry point - Server initialization
├── src/
│   ├── config/              # Configuration Layer
│   │   └── index.js         # Environment variables, validation, defaults
│   ├── constants/           # Constants Layer
│   │   ├── index.js         # Central export aggregator
│   │   ├── endpoints.js     # GitHub REST API endpoint definitions
│   │   ├── error-messages.js # Standardized error message templates
│   │   └── tool-schemas.js  # Zod validation schemas for all 57 tools
│   ├── services/            # Business Logic Layer
│   │   ├── github-client.js # Configured Axios instance with interceptors
│   │   ├── github/          # GitHub API service modules
│   │   │   ├── index.js     # Service aggregator
│   │   │   ├── repository.js # Repository operations
│   │   │   ├── issue.js     # Issue operations
│   │   │   ├── pull-requests.js # PR operations
│   │   │   ├── branch.js    # Branch operations
│   │   │   ├── commit.js    # Commit operations
│   │   │   ├── file.js      # File/directory operations
│   │   │   ├── tree.js      # Git tree operations
│   │   │   └── search.js    # Search operations
│   │   └── git/             # Local Git CLI service
│   │       └── index.js     # 20 Git CLI operations via simple-git
│   ├── tools/               # MCP Tool Registration Layer
│   │   ├── index.js         # Tool registration orchestrator
│   │   ├── github/          # GitHub tool registrations
│   │   │   └── index.js
│   │   └── git/             # Git CLI tool registrations
│   │       └── index.js
│   └── utils/               # Utility Layer
│       ├── index.js         # Utility aggregator
│       ├── error-handler.js # Centralized error handling
│       ├── response-formatter.js # Response formatting
│       └── logger.js        # Winston logger configuration
├── logs/                    # Log files (auto-generated)
├── .env                     # Environment configuration
├── .env.example             # Environment template
└── package.json
```

### Architecture Layers

| Layer | Purpose | Key Files |
|-------|---------|-----------|
| **Config** | Environment variables, validation | `src/config/index.js` |
| **Constants** | Endpoints, schemas, error messages | `src/constants/*` |
| **Services** | Business logic, API/CLI operations | `src/services/*` |
| **Tools** | MCP tool registration & handlers | `src/tools/*` |
| **Utils** | Cross-cutting concerns | `src/utils/*` |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18.0.0 or higher
- **Git** installed and accessible via command line
- **GitHub Personal Access Token** with required permissions

### Installation

```bash
# Clone or navigate to the project directory
cd /path/to/github-mcp-server

# Install dependencies
npm install
```

### Configuration

1. **Create environment file** from template:
```bash
cp .env.example .env
```

2. **Edit `.env`** with your configuration:

```env
# =========================
# GitHub API Configuration (REQUIRED)
# =========================
GIT_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx   # Your GitHub Personal Access Token

# =========================
# Optional Configuration
# =========================
NODE_ENV=development                  # development | production
GIT_API_VERSION=2022-11-28           # GitHub API version
GIT_BASE_URL=https://api.github.com  # GitHub API base URL
GIT_TIMEOUT=30000                    # Request timeout in ms

# =========================
# Logging Configuration
# =========================
LOG_LEVEL=error                      # debug | info | warn | error
LOGGING_ENABLED=true                 # Enable/disable logging
LOG_FILE_ENABLED=true                # Enable file logging
LOG_MAX_FILE_SIZE=20m                # Max size per log file
LOG_MAX_FILES=14d                    # Log retention period
```

### Running the Server

```bash
# Start the MCP server
node index.js

# The server runs via stdio transport for MCP communication
```

### MCP Client Configuration

Add to your MCP client configuration (e.g., Claude Desktop, VS Code extension):

```json
{
  "mcpServers": {
    "github": {
      "command": "node",
      "args": ["/absolute/path/to/github/index.js"],
      "env": {
        "GIT_TOKEN": "your_github_token_here"
      }
    }
  }
}
```

---

## 🔐 Token Permissions Required

Your GitHub Personal Access Token needs the following permissions based on desired functionality:

| Permission | Scope | Required For |
|------------|-------|--------------|
| **repo** | Full control of private repositories | All repository operations |
| **read:repo** | Read access to repositories | Reading repo data, issues, PRs |
| **contents:write** | Write access to code | File CRUD, branch operations |
| **issues:read** | Read access to issues | Listing/viewing issues |
| **pull_requests:read** | Read access to PRs | Listing/viewing PRs |
| **security_events:read** | Read access to security advisories | Security advisory tools |
| **metadata:read** | Read access to metadata | Basic repo metadata |

### Minimum Permissions for Read-Only Usage
- `repo:read` or `public_repo`
- `issues:read`
- `pull_requests:read`
- `metadata:read`

### Full Permissions for Read/Write Usage
- `repo` (full control)
- `admin:repo_hook` (for repository administration)

---

## 🛠️ Available Tools

### GitHub API Tools (37)

| Category | Tools | Operations |
|----------|-------|------------|
| **Repository** | 8 | Get repos, details, forks, topics, create repo, tags, advisories |
| **Issues** | 3 | List issues, get issue, list comments |
| **Pull Requests** | 6 | List PRs, get PR, reviews, files, comments, diff |
| **Branches** | 5 | List, get, create, delete, get default branch |
| **Commits** | 4 | List, get details, compare, get diff |
| **Files** | 4 | Get contents, create/update, delete, get directory |
| **Trees/Blobs** | 3 | Get tree, get blob, create blob |
| **Search** | 4 | Search repos, code, issues, commits |

### Git CLI Tools (20)

| Category | Tools | Operations |
|----------|-------|------------|
| **Repository Setup** | 2 | init, status |
| **Staging/Commit** | 2 | add, commit |
| **Remote** | 6 | push, pull, clone, remote add/list/remove |
| **History** | 2 | log, diff |
| **Branching** | 3 | checkout, branch list, branch delete |
| **Advanced** | 5 | reset, stash, tag, fetch, merge |

> 📚 **See [GIT_TOOLS_REFERENCE.md](./GIT_TOOLS_REFERENCE.md) for detailed tool documentation**

---

## 🔧 Development

### Adding a New GitHub API Tool

1. **Add endpoint** to `src/constants/endpoints.js`
2. **Define schema** in `src/constants/tool-schemas.js`
3. **Create service function** in appropriate `src/services/github/*.js`
4. **Register tool** in `src/tools/github/index.js`

### Adding a New Git CLI Tool

1. **Define schema** in `src/constants/tool-schemas.js`
2. **Create service function** in `src/services/git/index.js`
3. **Register tool** in `src/tools/git/index.js`

### Code Style

- ES6+ JavaScript with ESM modules
- Airbnb ESLint configuration
- Prettier formatting
- JSDoc comments for all public functions

---

## 📝 Logging

Logs are written to `./logs/` directory with daily rotation:

- `combined-YYYY-MM-DD.log` - All logs
- `error-YYYY-MM-DD.log` - Error logs only

Configure via environment variables:
```env
LOG_LEVEL=debug|info|warn|error
LOGGING_ENABLED=true|false
LOG_FILE_ENABLED=true|false
```

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `@modelcontextprotocol/sdk` | MCP server SDK |
| `axios` | HTTP client for GitHub API |
| `simple-git` | Git CLI wrapper |
| `zod` | Schema validation |
| `winston` | Logging framework |
| `dotenv` | Environment configuration |

---

*Built with ❤️*
