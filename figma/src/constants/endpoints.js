// Figma REST API Endpoints
// https://www.figma.com/developers/api

const ENDPOINTS = {
  // File Endpoints
  FILES: {
    GET_FILE: '/v1/files/:key',
    GET_FILE_NODES: '/v1/files/:key/nodes',
    GET_IMAGES: '/v1/images/:key',
    GET_IMAGE_FILLS: '/v1/files/:key/images',
    GET_FILE_VERSIONS: '/v1/files/:key/versions',
  },

  // Comment Endpoints
  COMMENTS: {
    GET_COMMENTS: '/v1/files/:key/comments',
    POST_COMMENT: '/v1/files/:key/comments',
    DELETE_COMMENT: '/v1/files/:key/comments/:id',
  },

  // User Endpoints
  USERS: {
    GET_ME: '/v1/me',
  },

  // Project Endpoints
  PROJECTS: {
    GET_TEAM_PROJECTS: '/v1/teams/:id/projects',
    GET_PROJECT_FILES: '/v1/projects/:id/files',
  },

  // Component Endpoints
  COMPONENTS: {
    GET_FILE_COMPONENTS: '/v1/files/:key/components',
    GET_TEAM_COMPONENTS: '/v1/teams/:id/components',
    GET_COMPONENT: '/v1/components/:key',
    GET_TEAM_COMPONENT_SETS: '/v1/teams/:id/component_sets',
    GET_COMPONENT_SET: '/v1/component_sets/:key',
  },

  // Style Endpoints
  STYLES: {
    GET_FILE_STYLES: '/v1/files/:key/styles',
    GET_TEAM_STYLES: '/v1/teams/:id/styles',
    GET_STYLE: '/v1/styles/:key',
  },

  // Webhook Endpoints
  WEBHOOKS: {
    GET_WEBHOOK: '/v2/webhooks/:id',
    UPDATE_WEBHOOK: '/v2/webhooks/:id',
    DELETE_WEBHOOK: '/v2/webhooks/:id',
    CREATE_WEBHOOK: '/v2/webhooks',
    GET_TEAM_WEBHOOKS: '/v2/teams/:id/webhooks',
  },

  // Variable Endpoints
  VARIABLES: {
    GET_LOCAL_VARIABLES: '/v1/files/:key/variables/local',
    GET_PUBLISHED_VARIABLES: '/v1/files/:key/variables/published',
    POST_VARIABLES: '/v1/files/:key/variables',
  },
};

export default ENDPOINTS;
