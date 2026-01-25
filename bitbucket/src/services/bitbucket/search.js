// Search Service
// Bitbucket search operations

import bitbucket from '../bitbucket-client.js';

/**
 * Search code in workspace repositories
 */
async function searchCode(workspace, searchQuery) {
  try {
    const res = await bitbucket.get(`/workspaces/${workspace}/search/code`, {
      params: { search_query: searchQuery },
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to search code in workspace ${workspace}: ${error.message}`);
  }
}

export {
  searchCode,
};
