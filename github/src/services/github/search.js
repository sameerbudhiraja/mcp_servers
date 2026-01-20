// Search Service
// GitHub search operations


import github from '../githubClient.js';

/**
 * Search repositories
 */
async function searchRepositories(query, sort = '', order = 'desc') {
  const params = { q: query };
  if (sort) params.sort = sort;
  params.order = order;

  const res = await github.get('/search/repositories', { params });
  return res.data;
}

/**
 * Search code
 */
async function searchCode(query, sort = '', order = 'desc') {
  const params = { q: query };
  if (sort) params.sort = sort;
  params.order = order;

  const res = await github.get('/search/code', { params });
  return res.data;
}

/**
 * Search issues and pull requests
 */
async function searchIssues(query, sort = '', order = 'desc') {
  const params = { q: query };
  if (sort) params.sort = sort;
  params.order = order;

  const res = await github.get('/search/issues', { params });
  return res.data;
}

/**
 * Search commits
 */
async function searchCommits(query, sort = '', order = 'desc') {
  const params = { q: query };
  if (sort) params.sort = sort;
  params.order = order;

  const res = await github.get('/search/commits', {
    params,
    headers: { Accept: 'application/vnd.github.cloak-preview+json' },
  });
  return res.data;
}

export {
  searchRepositories,
  searchCode,
  searchIssues,
  searchCommits,
};
