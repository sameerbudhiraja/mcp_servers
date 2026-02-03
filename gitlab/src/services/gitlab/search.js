// Search Service
// GitLab search operations

import gitlab from '../gitlab-client.js';

/**
 * Search for code across projects
 */
async function searchCode(payload) {
  try {
    if (payload.projectId) {
      // Project-scoped search
      const encodedId = encodeURIComponent(payload.projectId);
      const res = await gitlab.get(`/projects/${encodedId}/search`, {
        params: {
          scope: 'blobs',
          search: payload.searchQuery,
        },
      });
      return res.data;
    }
    
    // Global search
    const res = await gitlab.get('/search', {
      params: {
        scope: 'blobs',
        search: payload.searchQuery,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to search code: ${error.message}`);
  }
}

/**
 * Search for projects
 */
async function searchProjects(payload) {
  try {
    const res = await gitlab.get('/search', {
      params: {
        scope: 'projects',
        search: payload.searchQuery,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to search projects: ${error.message}`);
  }
}

export {
  searchCode,
  searchProjects,
};
