// Tool definitions for all MCP tools
// Contains name, description, and input schema for each tool

import { z } from 'zod';

const TOOL_DEFINITIONS = {
  // ===== FILE TOOLS =====
  FILE: {
    GET_FILE: {
      name: 'get_file',
      description: 'Returns the document identified by a file key as a JSON object',
      inputSchema: {
        key: z.string().describe('The key of the file to retrieve'),
        version: z.string().optional().describe('The version of the file to retrieve'),
        ids: z.string().optional().describe('Comma separated list of nodes that you care about in the document'),
        depth: z.number().optional().describe('Positive integer representing how deep into the document tree to traverse'),
        geometry: z.string().optional().describe('Set to "paths" to export vector data'),
        plugin_data: z.string().optional().describe('Comma separated list of plugin IDs to include'),
        branch_data: z.boolean().optional().describe('Pass true to include branch metadata'),
      },
    },
    GET_FILE_NODES: {
      name: 'get_file_nodes',
      description: 'Returns the nodes identified by a file key as a JSON object',
      inputSchema: {
        key: z.string().describe('The key of the file to retrieve'),
        ids: z.string().describe('Comma separated list of nodes that you care about in the document'),
        version: z.string().optional().describe('The version of the file to retrieve'),
        depth: z.number().optional().describe('Positive integer representing how deep into the document tree to traverse'),
        geometry: z.string().optional().describe('Set to "paths" to export vector data'),
        plugin_data: z.string().optional().describe('Comma separated list of plugin IDs to include'),
      },
    },
    GET_IMAGES: {
      name: 'get_images',
      description: 'Returns the URLs for images rendered from the nodes of a file',
      inputSchema: {
        key: z.string().describe('The key of the file to retrieve'),
        ids: z.string().describe('Comma separated list of node IDs to render'),
        scale: z.number().optional().describe('A number between 0.01 and 4'),
        format: z.enum(['jpg', 'png', 'svg', 'pdf']).optional().describe('The output format for the images'),
        version: z.string().optional().describe('The version of the file to retrieve'),
        use_absolute_bounds: z.boolean().optional().describe('Whether to use absolute bounds'),
      },
    },
    GET_IMAGE_FILLS: {
      name: 'get_image_fills',
      description: 'Returns the public URLs for images used in a file',
      inputSchema: {
        key: z.string().describe('The key of the file to retrieve'),
      },
    },
    GET_FILE_VERSIONS: {
      name: 'get_file_versions',
      description: 'Returns the list of versions for a file',
      inputSchema: {
        key: z.string().describe('The key of the file to retrieve'),
      },
    },
  },

  // ===== COMMENT TOOLS =====
  COMMENT: {
    GET_COMMENTS: {
      name: 'get_comments',
      description: 'Returns a list of comments on a file',
      inputSchema: {
        key: z.string().describe('The key of the file to retrieve'),
      },
    },
    POST_COMMENT: {
      name: 'post_comment',
      description: 'Posts a new comment to a file',
      inputSchema: {
        key: z.string().describe('The key of the file to retrieve'),
        message: z.string().describe('The message to post'),
        client_meta: z.object({
          x: z.number(),
          y: z.number(),
          node_id: z.string().optional(),
          node_offset: z.object({
            x: z.number(),
            y: z.number(),
          }).optional(),
        }).optional().describe('Metadata for the comment'),
      },
    },
    DELETE_COMMENT: {
      name: 'delete_comment',
      description: 'Deletes a comment from a file',
      inputSchema: {
        key: z.string().describe('The key of the file to retrieve'),
        id: z.string().describe('The ID of the comment to delete'),
      },
    },
  },

  // ===== USER TOOLS =====
  USER: {
    GET_CURRENT_USER: {
      name: 'get_current_user',
      description: 'Returns information about the authenticated user',
      inputSchema: {},
    },
  },

  // ===== PROJECT TOOLS =====
  PROJECT: {
    GET_TEAM_PROJECTS: {
      name: 'get_team_projects',
      description: 'Returns a list of all projects within a specified team',
      inputSchema: {
        team_id: z.string().describe('The ID of the team to retrieve projects for'),
      },
    },
    GET_PROJECT_FILES: {
      name: 'get_project_files',
      description: 'Returns a list of files in a specified project',
      inputSchema: {
        project_id: z.string().describe('The ID of the project to retrieve files for'),
      },
    },
  },

  // ===== COMPONENT TOOLS =====
  COMPONENT: {
    GET_FILE_COMPONENTS: {
      name: 'get_file_components',
      description: 'Returns a list of published components in a file',
      inputSchema: {
        key: z.string().describe('The key of the file to retrieve components for'),
      },
    },
    GET_TEAM_COMPONENTS: {
      name: 'get_team_components',
      description: 'Returns a list of published components in a team',
      inputSchema: {
        team_id: z.string().describe('The ID of the team to retrieve components for'),
      },
    },
    GET_COMPONENT: {
      name: 'get_component',
      description: 'Returns a specific published component',
      inputSchema: {
        key: z.string().describe('The key of the component to retrieve'),
      },
    },
    GET_TEAM_COMPONENT_SETS: {
      name: 'get_team_component_sets',
      description: 'Returns a list of published component sets in a team',
      inputSchema: {
        team_id: z.string().describe('The ID of the team to retrieve component sets for'),
      },
    },
    GET_COMPONENT_SET: {
      name: 'get_component_set',
      description: 'Returns a specific published component set',
      inputSchema: {
        key: z.string().describe('The key of the component set to retrieve'),
      },
    },
  },

  // ===== STYLE TOOLS =====
  STYLE: {
    GET_FILE_STYLES: {
      name: 'get_file_styles',
      description: 'Returns a list of published styles in a file',
      inputSchema: {
        key: z.string().describe('The key of the file to retrieve styles for'),
      },
    },
    GET_TEAM_STYLES: {
      name: 'get_team_styles',
      description: 'Returns a list of published styles in a team',
      inputSchema: {
        team_id: z.string().describe('The ID of the team to retrieve styles for'),
      },
    },
    GET_STYLE: {
      name: 'get_style',
      description: 'Returns a specific published style',
      inputSchema: {
        key: z.string().describe('The key of the style to retrieve'),
      },
    },
  },

  // ===== WEBHOOK TOOLS =====
  WEBHOOK: {
    CREATE_WEBHOOK: {
      name: 'create_webhook',
      description: 'Creates a new webhook',
      inputSchema: {
        team_id: z.string().describe('The ID of the team to create the webhook for'),
        event_type: z.enum(['FILE_UPDATE', 'FILE_VERSION_UPDATE', 'FILE_DELETE', 'FILE_RESTORE', 'FILE_COMMENT', 'LIBRARY_PUBLISH']).describe('The event type to listen for'),
        endpoint: z.string().describe('The URL to send the webhook event to'),
        passcode: z.string().describe('A passcode to send with the webhook event'),
        description: z.string().optional().describe('A description for the webhook'),
      },
    },
    GET_WEBHOOK: {
      name: 'get_webhook',
      description: 'Returns a specific webhook',
      inputSchema: {
        id: z.string().describe('The ID of the webhook to retrieve'),
      },
    },
    UPDATE_WEBHOOK: {
      name: 'update_webhook',
      description: 'Updates an existing webhook',
      inputSchema: {
        id: z.string().describe('The ID of the webhook to update'),
        endpoint: z.string().optional().describe('The URL to send the webhook event to'),
        passcode: z.string().optional().describe('A passcode to send with the webhook event'),
        description: z.string().optional().describe('A description for the webhook'),
        status: z.enum(['ACTIVE', 'PAUSED']).optional().describe('The status of the webhook'),
      },
    },
    DELETE_WEBHOOK: {
      name: 'delete_webhook',
      description: 'Deletes a specific webhook',
      inputSchema: {
        id: z.string().describe('The ID of the webhook to delete'),
      },
    },
    GET_TEAM_WEBHOOKS: {
      name: 'get_team_webhooks',
      description: 'Returns a list of all webhooks in a team',
      inputSchema: {
        team_id: z.string().describe('The ID of the team to retrieve webhooks for'),
      },
    },
  },

  // ===== VARIABLE TOOLS =====
  VARIABLE: {
    GET_LOCAL_VARIABLES: {
      name: 'get_local_variables',
      description: 'Returns the local variables defined in a file',
      inputSchema: {
        key: z.string().describe('The key of the file to retrieve local variables for'),
      },
    },
    GET_PUBLISHED_VARIABLES: {
      name: 'get_published_variables',
      description: 'Returns the published variables defined in a file',
      inputSchema: {
        key: z.string().describe('The key of the file to retrieve published variables for'),
      },
    },
    POST_VARIABLES: {
      name: 'post_variables',
      description: 'Creates or updates variables in a file',
      inputSchema: {
        key: z.string().describe('The key of the file to update variables for'),
        // Note: The structure for posting variables is complex.
        // Simplified for Zod schema but should follow Figma documentation.
        params: z.any().describe('The variable parameters to post (as defined by Figma API)'),
      },
    },
  },
};

export { TOOL_DEFINITIONS };
