# MCP Servers Collection

A comprehensive collection of Model Context Protocol (MCP) servers for popular development platforms: **GitHub**, **Bitbucket**, **GitLab**, and **Jira**.

## 🎬 Demo

[![Watch the demo](https://img.youtube.com/vi/TYS4y-TeAv8/maxresdefault.jpg)](https://youtu.be/TYS4y-TeAv8)

---

## 🚀 Overview

This repository contains four production-ready MCP servers that provide seamless integration with major development and project management platforms. Each server follows a modular, layered architecture with comprehensive error handling, logging, and type-safe validation.

| Server | Tools | Description | Status |
|--------|-------|-------------|--------|
| **[GitHub](./github/)** | 57 | GitHub API (37) + Git CLI (20) tools | ✅ Production |
| **[Bitbucket](./bitbucket/)** | 25+ | Bitbucket Cloud REST API v2 | ✅ Production |
| **[GitLab](./gitlab/)** | 28 | GitLab REST API v4 | ✅ Production |
| **[Jira](./jira/)** | 31 | Jira Cloud REST API v3 | ✅ Production |

---

## 📋 What is MCP?

The **Model Context Protocol (MCP)** is a standardized protocol that enables AI systems to interact with external tools and data sources. These MCP servers extend AI capabilities by providing authenticated access to development platforms, enabling AI assistants to:

- Read and write code repositories
- Manage issues, pull requests, and merge requests
- Execute Git operations
- Access project metadata and search across codebases
- Manage Jira tickets, sprints, and workflows

---

## 🏗️ Architecture

All servers follow a consistent, modular architecture:

```
<server>/
├── index.js                # Main entry point
├── src/
│   ├── config/            # Environment configuration
│   ├── constants/         # API endpoints, schemas, error messages
│   ├── services/          # Business logic layer
│   │   └── <platform>/    # Platform-specific API operations
│   ├── tools/             # MCP tool registration
│   │   └── <platform>/    # Tool handlers
│   └── utils/             # Logging, error handling, formatting
├── logs/                  # Auto-generated log files
├── .env.example           # Environment template
└── package.json           # Dependencies
```

### Key Design Principles

- **Modular Architecture**: Clear separation of concerns across layers
- **Type Safety**: Zod validation for all tool inputs
- **Comprehensive Logging**: Winston with daily log rotation
- **Error Handling**: Try-catch blocks throughout with standardized error messages
- **Configuration Management**: Environment-based configuration with validation

---

## 🎯 Quick Start

### Prerequisites

- **Node.js** v18.0.0 or higher
- **Git** installed (for GitHub server Git CLI tools)
- Platform-specific credentials:
  - GitHub: Personal Access Token
  - Bitbucket: API Token + Email
  - GitLab: Personal Access Token
  - Jira: API Token + Email

### Installation

1. **Clone the repository**:
   ```bash
   cd /path/to/mcp_servers
   ```

2. **Choose a server** and navigate to its directory:
   ```bash
   cd github    # or: bitbucket, gitlab, jira
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Configure environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

5. **Start the server**:
   ```bash
   npm start
   ```

### MCP Client Configuration

Add to your MCP client configuration (e.g., Claude Desktop, VS Code):

```json
{
  "mcpServers": {
    "github": {
      "command": "node",
      "args": ["/absolute/path/to/mcp_servers/github/index.js"],
      "env": {
        "GIT_TOKEN": "your_github_token"
      }
    },
    "bitbucket": {
      "command": "node",
      "args": ["/absolute/path/to/mcp_servers/bitbucket/index.js"],
      "env": {
        "BITBUCKET_EMAIL": "your-email@example.com",
        "BITBUCKET_API_TOKEN": "your_bitbucket_token",
        "BITBUCKET_WORKSPACE": "your-workspace"
      }
    },
    "gitlab": {
      "command": "node",
      "args": ["/absolute/path/to/mcp_servers/gitlab/index.js"],
      "env": {
        "GITLAB_TOKEN": "your_gitlab_token"
      }
    },
    "jira": {
      "command": "node",
      "args": ["/absolute/path/to/mcp_servers/jira/index.js"],
      "env": {
        "JIRA_EMAIL": "your-email@example.com",
        "JIRA_API_TOKEN": "your_jira_token",
        "JIRA_BASE_URL": "https://your-domain.atlassian.net"
      }
    }
  }
}
```

---

## 📚 Individual Server Documentation

### GitHub MCP Server
- **[Documentation](./github/README.md)**
- **[Tools Reference](./github/GIT_TOOLS_REFERENCE.md)**
- **Tools**: 37 GitHub API + 20 Git CLI operations
- **Features**: Repository management, PRs, issues, branches, commits, files, search

### Bitbucket MCP Server
- **[Documentation](./bitbucket/README.md)**
- **[Tools Reference](./bitbucket/BITBUCKET_TOOLS_REFERENCE.MD)**
- **Tools**: 25+ Bitbucket operations
- **Features**: Repository management, PRs, branches, commits, files, issues, search

### GitLab MCP Server
- **[Documentation](./gitlab/README.md)**
- **[Tools Reference](./gitlab/GITLAB_TOOLS_REFERENCE.md)**
- **Tools**: 28 GitLab operations
- **Features**: Project management, MRs, branches, commits, files, issues, search

### Jira MCP Server
- **[Documentation](./jira/README.md)**
- **Tools**: 31 Jira operations
- **Features**: Projects, issues, comments, search, workflows, sprints, attachments, worklogs

---

## 🔐 Authentication Guide

### GitHub
Create a Personal Access Token at [https://github.com/settings/tokens](https://github.com/settings/tokens)

**Required Scopes**:
- `repo` - Full repository access
- `read:repo` - Read repository data
- `contents:write` - File operations

### Bitbucket
Create an API Token at [https://bitbucket.org/account/settings/api-tokens/](https://bitbucket.org/account/settings/api-tokens/)

> [!IMPORTANT]
> App passwords are deprecated. Use API tokens instead (required as of June 9, 2026).

**Required Scopes**:
- Repositories: Read, Write
- Pull requests: Read, Write
- Issues: Read, Write

### GitLab
Create a Personal Access Token at [https://gitlab.com/-/user_settings/personal_access_tokens](https://gitlab.com/-/user_settings/personal_access_tokens)

**Required Scopes**:
- `api` - Full API access (recommended)
- `read_api` - Read-only API access
- `read_repository` - Read repository
- `write_repository` - Write to repository

### Jira
Create an API Token at [https://id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens)

**Authentication**: Basic Auth (email + API token)

---

## 📦 Dependencies

All servers share common core dependencies:

| Package | Purpose | Version |
|---------|---------|---------|
| `@modelcontextprotocol/sdk` | MCP server SDK | ^1.25.2 |
| `axios` | HTTP client | ^1.13.2 |
| `dotenv` | Environment configuration | ^17.2.3 |
| `winston` | Logging framework | ^3.19.0 |
| `winston-daily-rotate-file` | Log rotation | ^5.0.0 |
| `zod` | Schema validation | ^3.25.76 |

### Server-Specific Dependencies

- **GitHub**: `simple-git` - Git CLI wrapper
- **Jira**: `form-data` - Multipart form for attachments, `zod-to-json-schema` - Schema conversion

---

## 📝 Logging

All servers generate logs in their respective `logs/` directories with daily rotation:

- `combined-YYYY-MM-DD.log` - All log levels
- `error-YYYY-MM-DD.log` - Error logs only
- Retention period: 14 days (configurable)

Configure logging via environment variables:
```env
LOG_LEVEL=error|warn|info|debug
LOGGING_ENABLED=true
LOG_FILE_ENABLED=true
```

---

## 🛠️ Development

### Code Style

All servers follow consistent coding standards:
- ES6+ JavaScript with ESM modules
- Airbnb ESLint configuration (where configured)
- Prettier formatting (where configured)
- JSDoc comments for public functions

### Adding New Tools

Each server follows the same pattern:

1. Add endpoint to `src/constants/endpoints.js`
2. Define schema in `src/constants/tool-schemas.js`
3. Create service function in appropriate `src/services/<platform>/*.js`
4. Register tool in `src/tools/<platform>/index.js`

---

## 🐛 Troubleshooting

### Common Issues

**Authentication Errors**
- Verify your API token/PAT has the required scopes
- Check that tokens haven't expired
- Ensure email addresses match your platform account

**Connection Timeouts**
- Default timeout is 30000ms (30 seconds)
- Increase via environment variable: `<PLATFORM>_TIMEOUT=60000`

**Module Not Found**
- Run `npm install` in the server directory
- Ensure Node.js version is v18.0.0 or higher

**MCP Client Not Detecting Server**
- Verify absolute paths in MCP client configuration
- Check environment variables are set correctly
- Review server logs for startup errors

---

## 📄 License

MIT

---

## 👤 Author

**Sameer Budhiraja**
- Email: iamsameer2006@gmail.com

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Follow** the existing architecture patterns
4. **Test** your changes thoroughly
5. **Commit** with clear messages (`git commit -m 'Add amazing feature'`)
6. **Push** to your branch (`git push origin feature/amazing-feature`)
7. **Open** a Pull Request

---

*Built with ❤️ for the MCP ecosystem*
