# Figma Tools Reference

Detailed documentation for all tools available in the Figma MCP server.

## File Tools

| Tool Name | Description | Parameters | Figma Endpoint |
|-----------|-------------|------------|----------------|
| `get_file` | Returns the document identified by a file key as a JSON object | `key` (required), `version`, `ids`, `depth`, `geometry`, `plugin_data`, `branch_data` | `GET /v1/files/:key` |
| `get_file_nodes` | Returns the nodes identified by a file key as a JSON object | `key` (required), `ids` (required), `version`, `depth`, `geometry`, `plugin_data` | `GET /v1/files/:key/nodes` |
| `get_images` | Returns URLs for images rendered from file nodes | `key` (required), `ids` (required), `scale`, `format`, `version`, `use_absolute_bounds` | `GET /v1/images/:key` |
| `get_image_fills` | Returns public URLs for images used in a file | `key` (required) | `GET /v1/files/:key/images` |
| `get_file_versions` | Returns the list of versions for a file | `key` (required) | `GET /v1/files/:key/versions` |

## Comment Tools

| Tool Name | Description | Parameters | Figma Endpoint |
|-----------|-------------|------------|----------------|
| `get_comments` | Returns a list of comments on a file | `key` (required) | `GET /v1/files/:key/comments` |
| `post_comment` | Posts a new comment to a file | `key` (required), `message` (required), `client_meta` | `POST /v1/files/:key/comments` |
| `delete_comment` | Deletes a comment from a file | `key` (required), `id` (required) | `DELETE /v1/files/:key/comments/:id` |

## User Tools

| Tool Name | Description | Parameters | Figma Endpoint |
|-----------|-------------|------------|----------------|
| `get_current_user` | Returns info about the authenticated user | None | `GET /v1/me` |

## Project Tools

| Tool Name | Description | Parameters | Figma Endpoint |
|-----------|-------------|------------|----------------|
| `get_team_projects` | Returns all projects in a team | `team_id` (required) | `GET /v1/teams/:team_id/projects` |
| `get_project_files` | Returns all files in a project | `project_id` (required) | `GET /v1/projects/:project_id/files` |

## Component Tools

| Tool Name | Description | Parameters | Figma Endpoint |
|-----------|-------------|------------|----------------|
| `get_file_components` | Returns published components in a file | `key` (required) | `GET /v1/files/:key/components` |
| `get_team_components` | Returns published components in a team | `team_id` (required) | `GET /v1/teams/:team_id/components` |
| `get_component` | Returns a specific published component | `key` (required) | `GET /v1/components/:key` |
| `get_team_component_sets` | Returns published component sets in a team | `team_id` (required) | `GET /v1/teams/:team_id/component_sets` |
| `get_component_set` | Returns a specific published component set | `key` (required) | `GET /v1/component_sets/:key` |

## Style Tools

| Tool Name | Description | Parameters | Figma Endpoint |
|-----------|-------------|------------|----------------|
| `get_file_styles` | Returns published styles in a file | `key` (required) | `GET /v1/files/:key/styles` |
| `get_team_styles` | Returns published styles in a team | `team_id` (required) | `GET /v1/teams/:team_id/styles` |
| `get_style` | Returns a specific published style | `key` (required) | `GET /v1/styles/:key` |

## Webhook Tools

| Tool Name | Description | Parameters | Figma Endpoint |
|-----------|-------------|------------|----------------|
| `create_webhook` | Creates a new webhook | `team_id`, `event_type`, `endpoint`, `passcode`, `description` (all required except description) | `POST /v2/webhooks` |
| `get_webhook` | Returns a specific webhook | `id` (required) | `GET /v2/webhooks/:id` |
| `update_webhook` | Updates an existing webhook | `id` (required), `endpoint`, `passcode`, `description`, `status` | `PUT /v2/webhooks/:id` |
| `delete_webhook` | Deletes a specific webhook | `id` (required) | `DELETE /v2/webhooks/:id` |
| `get_team_webhooks` | Returns all webhooks in a team | `team_id` (required) | `GET /v2/teams/:team_id/webhooks` |

## Variable Tools

| Tool Name | Description | Parameters | Figma Endpoint |
|-----------|-------------|------------|----------------|
| `get_local_variables` | Returns local variables in a file | `key` (required) | `GET /v1/files/:key/variables/local` |
| `get_published_variables` | Returns published variables in a file | `key` (required) | `GET /v1/files/:key/variables/published` |
| `post_variables` | Creates or updates variables in a file | `key` (required), `params` (required) | `POST /v1/files/:key/variables` |
