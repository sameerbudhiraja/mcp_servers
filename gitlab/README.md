# GitLab MCP Server

A Model Context Protocol (MCP) server for GitLab REST API v4, providing comprehensive access to GitLab projects, merge requests, branches, commits, files, issues, and search functionality.

## Architecture

This server follows a modular architecture with clear separation of concerns:

```
gitlab/
├── src/
│   ├── config/          # Configuration management
│   ├── constants/       # API endpoints, error messages, tool schemas
│   ├── services/        # GitLab API service layer
│   │   └── gitlab/      # Project, MR, branch, commit, file, issue, search services
│   ├── tools/           # MCP tool registration
│   │   └── gitlab/      # GitLab tool handlers
│   └── utils/           # Logger, error handler, response formatter
├── logs/                # Log files (auto-generated)
├── index.js             # Main server entry point
└── package.json         # Dependencies and scripts
```

## Features

- **28 GitLab Tools** for comprehensive repository management
- **Modular Architecture** with clean separation of concerns
- **Comprehensive Error Handling** with try-catch blocks throughout
- **Winston Logging** with daily log rotation and multiple log levels
- **Token Authentication** using GitLab Personal Access Tokens
- **Type-Safe** tool schemas using Zod validation

## Installation

1. Clone or navigate to the gitlab directory:
```bash
cd /Users/sameerbudhiraja/Documents/mcp_servers/gitlab
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure your GitLab credentials in `.env`:
   ```bash
   GITLAB_TOKEN=your-personal-access-token
   GITLAB_BASE_URL=https://gitlab.com/api/v4
   ```

## Configuration

### Required Environment Variables

- `GITLAB_TOKEN` - Your GitLab Personal Access Token

### Optional Environment Variables

- `GITLAB_BASE_URL` - API base URL (default: https://gitlab.com/api/v4)
- `GITLAB_TIMEOUT` - Request timeout in ms (default: 30000)
- `LOG_LEVEL` - Logging level: error, warn, info, debug (default: error)
- `LOG_FILE_ENABLED` - Enable file logging (default: true)

### Creating a GitLab Personal Access Token

> [!IMPORTANT]
> Personal Access Tokens are the recommended authentication method for GitLab API access.

1. Go to https://gitlab.com/-/user_settings/personal_access_tokens
2. Click "Add new token"
3. Give it a descriptive name (e.g., "MCP Server")
4. Set an expiry date (optional, but recommended)
5. Select required scopes/permissions:
   - **api**: Full API access (recommended for all operations)
   - **read_api**: Read-only API access
   - **read_repository**: Read repository content
   - **write_repository**: Write to repository (for file operations)
6. Click "Create personal access token"
7. Copy the generated token immediately (you won't be able to view it again)
8. Add to your `.env` file:
   ```bash
   GITLAB_TOKEN=your-generated-token
   GITLAB_BASE_URL=https://gitlab.com/api/v4
   ```

> [!NOTE]
> For self-hosted GitLab instances, change `GITLAB_BASE_URL` to your instance URL followed by `/api/v4`

## Usage

Start the MCP server:

```bash
npm start
```

The server will initialize and register all GitLab tools. You can then use these tools through any MCP-compatible client.

## Available Tools

### Project Operations
- `gitlab_list_projects` - List all accessible projects
- `gitlab_get_project` - Get project details
- `gitlab_create_project` - Create a new project
- `gitlab_list_project_forks` - List project forks

### Merge Request Operations
- `gitlab_list_merge_requests` - List merge requests
- `gitlab_get_merge_request` - Get MR details
- `gitlab_get_merge_request_diff` - Get MR diff/changes
- `gitlab_list_mr_commits` - List MR commits
- `gitlab_list_mr_comments` - List MR comments/notes

### Branch Operations
- `gitlab_list_branches` - List all branches
- `gitlab_get_branch` - Get branch details
- `gitlab_create_branch` - Create a new branch
- `gitlab_delete_branch` - Delete a branch

### Commit Operations
- `gitlab_list_commits` - List commits
- `gitlab_get_commit` - Get commit details
- `gitlab_get_commit_diff` - Get commit diff
- `gitlab_list_commit_comments` - List commit comments

### File Operations
- `gitlab_get_file` - Get file contents
- `gitlab_get_directory` - Get directory tree/contents
- `gitlab_create_file` - Create a new file
- `gitlab_update_file` - Update existing file

### Issue Operations
- `gitlab_list_issues` - List project issues
- `gitlab_get_issue` - Get issue details
- `gitlab_create_issue` - Create a new issue
- `gitlab_update_issue` - Update an issue
- `gitlab_list_issue_comments` - List issue comments/notes

### Search Operations
- `gitlab_search_code` - Search code across projects
- `gitlab_search_projects` - Search for projects

For detailed tool documentation, see [GITLAB_TOOLS_REFERENCE.md](./GITLAB_TOOLS_REFERENCE.md).

## Logging

Logs are written to the `logs/` directory with daily rotation:

- `combined-YYYY-MM-DD.log` - All log levels
- `error-YYYY-MM-DD.log` - Error logs only
- `info-YYYY-MM-DD.log` - Info and above (if LOG_LEVEL=info)
- `debug-YYYY-MM-DD.log` - Debug logs (if LOG_LEVEL=debug)
- `exceptions-YYYY-MM-DD.log` - Uncaught exceptions
- `rejections-YYYY-MM-DD.log` - Unhandled promise rejections

Logs are kept for 14 days by default (configurable via `LOG_MAX_FILES`).

## Error Handling

All API calls and operations are wrapped in try-catch blocks with:
- Proper error logging via Winston
- Standardized error messages
- Clean error responses to MCP clients
- Graceful handling of network errors, authentication failures, and API errors

## Development

### Project Structure

- **config/** - Centralized configuration with environment variable validation
- **constants/** - API endpoints, error messages, and Zod tool schemas
- **services/** - GitLab API client and service functions
- **tools/** - MCP tool registration and handlers
- **utils/** - Shared utilities (logger, error handler, response formatter)

### Adding New Tools

1. Add endpoint to `src/constants/endpoints.js`
2. Add tool schema to `src/constants/tool-schemas.js`
3. Create service function in appropriate `src/services/gitlab/*.js` file
4. Register tool in `src/tools/gitlab/index.js`

---

## 🐛 Troubleshooting

### Common Issues

**Authentication Failures**
- Verify your Personal Access Token is correct and not expired
- Check token has required scopes (see Configuration section)
- Confirm token hasn't been revoked

**Project Not Found**
- Verify project ID or URL-encoded path is correct
- Check that you have access to the project
- Ensure the project exists in your GitLab instance

**Self-Hosted GitLab Issues**
- Ensure `GITLAB_BASE_URL` includes `/api/v4`
- Example: `https://gitlab.example.com/api/v4`
- Check that your instance is accessible from your network

**IID vs ID Confusion**
- Use IID (Internal ID) for merge requests and issues, not the global ID
- IID is the number you see in the UI (e.g., !42, #123)
- Global ID is a numeric identifier used internally

**Connection Timeouts**
- Default timeout is 30000ms (30 seconds)
- Increase via: `GITLAB_TIMEOUT=60000` in `.env`
- Check network connectivity to GitLab

**Rate Limiting**
- GitLab has API rate limits (varies by plan)
- Reduce concurrent requests if hitting limits
- Check response headers for rate limit info

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Follow the existing architecture patterns
2. Add endpoints to `src/constants/endpoints.js`
3. Define schemas in `src/constants/tool-schemas.js`
4. Implement service functions in `src/services/gitlab/*.js`
5. Register tools in `src/tools/gitlab/index.js`
6. Update documentation for new tools
7. Test thoroughly before submitting

---

## 🔗 Related Documentation

- [Main MCP Servers README](../README.md)
- [GitLab REST API Documentation](https://docs.gitlab.com/ee/api/)
- [Personal Access Tokens Guide](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)

---

## GitLab API Documentation

This server uses GitLab REST API v4:
- Official Documentation: https://docs.gitlab.com/ee/api/
- API Resources: https://docs.gitlab.com/ee/api/api_resources.html

## License

ISC

## Author

Created as part of the MCP servers collection.
