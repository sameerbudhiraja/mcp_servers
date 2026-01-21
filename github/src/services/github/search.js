// Search Service
// GitHub search operations


import github from '../github-client.js';

/**
 * Search repositories
 */
async function searchRepositories(query, sort = '', order = 'desc') {
  try {
    const params = { q: query };
    if (sort) params.sort = sort;
    params.order = order;

    const res = await github.get('/search/repositories', { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to search repositories with query "${query}": ${error.message}`);
  }
}

/**
 * Search code
 */
async function searchCode(query, sort = '', order = 'desc') {
  try {
    const params = { q: query };
    if (sort) params.sort = sort;
    params.order = order;

    const res = await github.get('/search/code', { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to search code with query "${query}": ${error.message}`);
  }
}

/**
 * Search issues and pull requests
 */
async function searchIssues(query, sort = '', order = 'desc') {
  try {
    const params = { q: query };
    if (sort) params.sort = sort;
    params.order = order;

    const res = await github.get('/search/issues', { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to search issues with query "${query}": ${error.message}`);
  }
}

/**
 * Search commits
 */
async function searchCommits(query, sort = '', order = 'desc') {
  try {
    const params = { q: query };
    if (sort) params.sort = sort;
    params.order = order;

    const res = await github.get('/search/commits', {
      params,
      headers: { Accept: 'application/vnd.github.cloak-preview+json' },
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to search commits with query "${query}": ${error.message}`);
  }
}

export {
  searchRepositories,
  searchCode,
  searchIssues,
  searchCommits,
};
