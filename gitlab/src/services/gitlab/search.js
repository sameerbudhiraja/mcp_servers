// Search Service
// GitLab search operations

import gitlab from '../gitlab-client.js';

/**
 * Search for code across projects
 */
async function searchCode(searchQuery, projectId = null) {
  try {
    if (projectId) {
      // Project-scoped search
      const encodedId = encodeURIComponent(projectId);
      const res = await gitlab.get(`/projects/${encodedId}/search`, {
        params: {
          scope: 'blobs',
          search: searchQuery,
        },
      });
      return res.data;
    }
    
    // Global search
    const res = await gitlab.get('/search', {
      params: {
        scope: 'blobs',
        search: searchQuery,
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
async function searchProjects(searchQuery) {
  try {
    const res = await gitlab.get('/search', {
      params: {
        scope: 'projects',
        search: searchQuery,
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
