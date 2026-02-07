# Jira MCP Server

A Model Context Protocol (MCP) server for Jira Cloud REST API v3, providing comprehensive access to Jira functionality through MCP tools.

## Features

- **31 Tools** covering all major Jira operations
- **Layered Architecture** following established MCP server patterns
- **API Token Authentication** using Basic Auth
- **Comprehensive Error Handling** with detailed logging
- **Winston Logging** with daily log rotation
- **Zod Validation** for all tool inputs

## Architecture

The server follows a modular, layered architecture:

```
jira/
├── index.js                  # Main entry point
├── package.json              # Dependencies
├── .env                      # Configuration (not committed)
└── src/
    ├── config/              # Configuration management
    ├── constants/           # API endpoints, error messages, tool schemas
    ├── services/            # Jira API client and operations
    ├── tools/               # MCP tool registrations
    └── utils/               # Logging, error handling, response formatting
```

## Installation

1. **Clone or navigate to the directory**:
   ```bash
   cd /path/to/mcp_servers/jira
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create `.env` file** from the template:
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (see Configuration section below)

## Configuration

### Required Environment Variables

Edit your `.env` file with the following required variables:

```env
# Jira Configuration (REQUIRED)
JIRA_EMAIL=your-email@example.com
JIRA_API_TOKEN=your_api_token_here
JIRA_BASE_URL=https://your-domain.atlassian.net
```

### Generating a Jira API Token

1. Go to [https://id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
2. Click **Create API token**
3. Give it a label (e.g., "MCP Server")
4. Copy the generated token
5. Paste it into your `.env` file as `JIRA_API_TOKEN`

### Optional Configuration

```env
# Optional Configuration
NODE_ENV=development
JIRA_API_VERSION=3
JIRA_TIMEOUT=30000

# Logging Configuration
LOG_LEVEL=error
LOGGING_ENABLED=true
LOG_FILE_ENABLED=true
LOG_MAX_FILE_SIZE=20m
LOG_MAX_FILES=14d
```

## Running the Server

### Standalone Mode
```bash
npm start
```

### Development Mode (with auto-reload)
```bash
npm run dev
```

### As an MCP Server

Add to your MCP client configuration (e.g., Claude Desktop):

```json
{
  "mcpServers": {
    "jira": {
      "command": "node",
      "args": ["/absolute/path/to/mcp_servers/jira/index.js"],
      "env": {
        "JIRA_EMAIL": "your-email@example.com",
        "JIRA_API_TOKEN": "your_api_token_here",
        "JIRA_BASE_URL": "https://your-domain.atlassian.net"
      }
    }
  }
}
```

## Available Tools

The server provides 31 tools across 9 categories:

### Projects (3 tools)
- `jira_list_projects` - List all accessible projects
- `jira_get_project` - Get project details
- `jira_create_project` - Create a new project

### Issues (8 tools)
- `jira_create_issue` - Create a new issue
- `jira_get_issue` - Get issue details
- `jira_update_issue` - Update an issue
- `jira_delete_issue` - Delete an issue
- `jira_assign_issue` - Assign issue to user
- `jira_get_issue_changelog` - Get issue change history
- `jira_bulk_create_issues` - Create multiple issues
- `jira_get_create_metadata` - Get metadata for creating issues

### Comments (4 tools)
- `jira_add_comment` - Add comment to issue
- `jira_get_comments` - Get all comments on issue
- `jira_update_comment` - Update a comment
- `jira_delete_comment` - Delete a comment

### Search (2 tools)
- `jira_search_issues` - Search using JQL
- `jira_search_issues_paginated` - Paginated JQL search

### Transitions (2 tools)
- `jira_get_transitions` - Get available transitions
- `jira_transition_issue` - Transition issue status

### Users (2 tools)
- `jira_search_users` - Search for users
- `jira_get_current_user` - Get authenticated user

### Sprints (2 tools)
- `jira_get_sprint` - Get sprint details
- `jira_get_sprint_issues` - Get issues in sprint

### Attachments (3 tools)
- `jira_add_attachment` - Add file attachment
- `jira_get_attachments` - Get issue attachments
- `jira_delete_attachment` - Delete attachment

### Worklogs (3 tools)
- `jira_add_worklog` - Add time tracking entry
- `jira_get_worklogs` - Get issue worklogs
- `jira_delete_worklog` - Delete worklog

### Filters (2 tools)
- `jira_get_filters` - Get saved filters
- `jira_search_by_filter` - Search using saved filter

## Authentication

The server uses **API Token** authentication with **Basic HTTP Auth**:

- **Username**: Your Jira email address
- **Password**: Your Jira API token
- **Header**: `Authorization: Basic base64(email:token)`

## Error Handling

The server includes comprehensive error handling:

- **Configuration validation** on startup
- **Service-level error handling** with context
- **Custom error classes** for Jira API errors
- **Detailed logging** with Winston
- **Clean error responses** in MCP format

## Logging

Logs are written to:
- **Console**: Colorized output for development
- **File**: Daily rotated log files in `logs/` directory
  - `jira-mcp-YYYY-MM-DD.log` - All logs
  - `jira-mcp-error-YYYY-MM-DD.log` - Error logs only

## Dependencies

- `@modelcontextprotocol/sdk` - MCP SDK
- `axios` - HTTP client for Jira API
- `dotenv` - Environment variable management
- `form-data` - Multipart form data for attachments
- `winston` - Logging
- `winston-daily-rotate-file` - Log rotation
- `zod` - Schema validation

## Development

### Linting
```bash
npm run lint
```

### Fix Linting Issues
```bash
npm run lint:fix
```

## License

MIT

## Author

Built following the architecture patterns of the GitHub, Bitbucket, and GitLab MCP servers.
