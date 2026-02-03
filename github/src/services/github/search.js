// Search Service
// GitHub search operations


import github from '../github-client.js';

/**
 * Search repositories
 */
async function searchRepositories(payload) {
  try {
    const params = { q: payload.query };
    if (payload.sort) params.sort = payload.sort;
    params.order = payload.order;

    const res = await github.get('/search/repositories', { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to search repositories with query "${payload.query}": ${error.message}`);
  }
}

/**
 * Search code
 */
async function searchCode(payload) {
  try {
    const params = { q: payload.query };
    if (payload.sort) params.sort = payload.sort;
    params.order = payload.order;

    const res = await github.get('/search/code', { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to search code with query "${payload.query}": ${error.message}`);
  }
}

/**
 * Search issues and pull requests
 */
async function searchIssues(payload) {
  try {
    const params = { q: payload.query };
    if (payload.sort) params.sort = payload.sort;
    params.order = payload.order;

    const res = await github.get('/search/issues', { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to search issues with query "${payload.query}": ${error.message}`);
  }
}

/**
 * Search commits
 */
async function searchCommits(payload) {
  try {
    const params = { q: payload.query };
    if (payload.sort) params.sort = payload.sort;
    params.order = payload.order;

    const res = await github.get('/search/commits', {
      params,
      headers: { Accept: 'application/vnd.github.cloak-preview+json' },
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to search commits with query "${payload.query}": ${error.message}`);
  }
}

export {
  searchRepositories,
  searchCode,
  searchIssues,
  searchCommits,
};
