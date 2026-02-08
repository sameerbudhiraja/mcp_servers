# Bitbucket MCP Server

A Model Context Protocol (MCP) server for Bitbucket Cloud REST API v2, providing comprehensive access to Bitbucket repositories, pull requests, branches, commits, files, issues, and search functionality.

## Architecture

This server follows a modular architecture with clear separation of concerns:

```
bitbucket/
├── src/
│   ├── config/          # Configuration management
│   ├── constants/       # API endpoints, error messages, tool schemas
│   ├── services/        # Bitbucket API service layer
│   │   └── bitbucket/   # Repository, PR, branch, commit, file, issue, search services
│   ├── tools/           # MCP tool registration
│   │   └── bitbucket/   # Bitbucket tool handlers
│   └── utils/           # Logger, error handler, response formatter
├── logs/                # Log files (auto-generated)
├── index.js             # Main server entry point
└── package.json         # Dependencies and scripts
```

## Features

- **25+ Bitbucket Tools** for comprehensive repository management
- **Modular Architecture** with clean separation of concerns
- **Comprehensive Error Handling** with try-catch blocks throughout
- **Winston Logging** with daily log rotation and multiple log levels
- **HTTP Basic Authentication** using Bitbucket API tokens
- **Type-Safe** tool schemas using Zod validation

## Installation

1. Clone or navigate to the bitbucket directory:
```bash
cd /Users/sameerbudhiraja/Documents/mcp_servers/bitbucket
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure your Bitbucket credentials in `.env`:
   ```bash
   BITBUCKET_EMAIL=your-email@example.com
   BITBUCKET_API_TOKEN=your-api-token
   BITBUCKET_WORKSPACE=your-workspace-slug
   ```

## Configuration

### Required Environment Variables

- `BITBUCKET_EMAIL` - Your Atlassian account email address
- `BITBUCKET_API_TOKEN` - Bitbucket API token (create at https://bitbucket.org/account/settings/api-tokens/)

### Optional Environment Variables

- `BITBUCKET_WORKSPACE` - Default workspace slug
- `BITBUCKET_BASE_URL` - API base URL (default: https://api.bitbucket.org/2.0)
- `BITBUCKET_TIMEOUT` - Request timeout in ms (default: 30000)
- `LOG_LEVEL` - Logging level: error, warn, info, debug (default: error)
- `LOG_FILE_ENABLED` - Enable file logging (default: true)

### Creating a Bitbucket API Token

> [!IMPORTANT]
> **App passwords are deprecated.** As of September 9, 2025, app passwords can no longer be created. All existing app passwords will be disabled on June 9, 2026. Use API tokens instead.

1. Go to https://bitbucket.org/account/settings/api-tokens/
2. Click "Create API token with scopes"
3. Give it a descriptive label (e.g., "MCP Server")
4. Set an expiry date (maximum 1 year)
5. Select **Bitbucket** as the application
6. Select required scopes/permissions:
   - **Repositories**: Read, Write
   - **Pull requests**: Read, Write
   - **Issues**: Read, Write
7. Click "Create"
8. Copy the generated API token immediately (you won't be able to view it again)
9. Add to your `.env` file:
   ```bash
   BITBUCKET_EMAIL=your-email@example.com
   BITBUCKET_API_TOKEN=your-generated-token
   ```

## Usage

Start the MCP server:

```bash
npm start
```

The server will initialize and register all Bitbucket tools. You can then use these tools through any MCP-compatible client.

## Available Tools

### Repository Operations
- `bitbucket_get_my_repositories` - Get all repositories in a workspace
- `bitbucket_get_repo_details` - Get repository details
- `bitbucket_list_repo_forks` - List repository forks
- `bitbucket_create_repo` - Create a new repository

### Pull Request Operations
- `bitbucket_list_pull_requests` - List pull requests
- `bitbucket_get_pull_request` - Get PR details
- `bitbucket_list_pr_comments` - List PR comments
- `bitbucket_list_pr_commits` - List PR commits
- `bitbucket_get_pull_request_diff` - Get PR diff

### Branch Operations
- `bitbucket_list_branches` - List all branches
- `bitbucket_get_branch` - Get branch details
- `bitbucket_create_branch` - Create a new branch
- `bitbucket_delete_branch` - Delete a branch

### Commit Operations
- `bitbucket_list_commits` - List commits
- `bitbucket_get_commit` - Get commit details
- `bitbucket_get_commit_diff` - Get commit diff

### File Operations
- `bitbucket_get_file_contents` - Get file contents
- `bitbucket_get_directory_contents` - Get directory contents

### Issue Operations
- `bitbucket_list_repo_issues` - List issues
- `bitbucket_get_issue` - Get issue details
- `bitbucket_list_issue_comments` - List issue comments

### Search Operations
- `bitbucket_search_code` - Search code in workspace

For detailed tool documentation, see [BITBUCKET_TOOLS_REFERENCE.MD](./BITBUCKET_TOOLS_REFERENCE.MD).

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
- **services/** - Bitbucket API client and service functions
- **tools/** - MCP tool registration and handlers
- **utils/** - Shared utilities (logger, error handler, response formatter)

### Adding New Tools

1. Add endpoint to `src/constants/endpoints.js`
2. Add tool schema to `src/constants/tool-schemas.js`
3. Create service function in appropriate `src/services/bitbucket/*.js` file
4. Register tool in `src/tools/bitbucket/index.js`

---

## 🐛 Troubleshooting

### Common Issues

**Authentication Failures**
- Verify your API token is correct and not expired
- Ensure `BITBUCKET_EMAIL` matches your Bitbucket account email
- Check that you're using an API token, not an app password (deprecated)
- Confirm your account has necessary permissions

**Workspace Not Found**
- Verify `BITBUCKET_WORKSPACE` slug is correct
- Check that you're a member of the workspace
- Ensure the workspace exists and is accessible

**Repository Access Errors**
- Confirm you have read/write access to the repository
- Check repository names are correct (case-sensitive)
- Verify the repository exists in the specified workspace

**Connection Timeouts**
- Default timeout is 30000ms (30 seconds)
- Increase via: `BITBUCKET_TIMEOUT=60000` in `.env`
- Check network connectivity to Bitbucket Cloud

**Rate Limiting**
- Bitbucket has API rate limits
- Reduce concurrent requests if hitting limits
- Implement exponential backoff for retries

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Follow the existing architecture patterns
2. Add endpoints to `src/constants/endpoints.js`
3. Define schemas in `src/constants/tool-schemas.js`
4. Implement service functions in `src/services/bitbucket/*.js`
5. Register tools in `src/tools/bitbucket/index.js`
6. Update documentation for new tools
7. Test thoroughly before submitting

---

## 🔗 Related Documentation

- [Main MCP Servers README](../README.md)
- [Bitbucket Cloud REST API Documentation](https://developer.atlassian.com/cloud/bitbucket/rest/)
- [Bitbucket API Tokens Guide](https://support.atlassian.com/bitbucket-cloud/docs/api-tokens/)

---

## License

ISC

## Author

Created as part of the MCP servers collection.
