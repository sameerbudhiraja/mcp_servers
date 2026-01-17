/**
 * Repository Service
 * GitHub repository operations
 */

import github from '../githubClient.js';

/**
 * Get all repositories for the authenticated user
 */
async function getMyRepos() {
  const res = await github.get('/user/repos');
  return res.data;
}

/**
 * Get repository details
 */
async function getRepo(owner, repo) {
  const res = await github.get(`/repos/${owner}/${repo}`);
  return res.data;
}

/**
 * List repository forks
 */
async function listForks(owner, repo) {
  const res = await github.get(`/repos/${owner}/${repo}/forks`);
  return res.data;
}

/**
 * Get repository topics
 */
async function getRepoTopics(owner, repo) {
  const res = await github.get(`/repos/${owner}/${repo}/topics`, {
    headers: { Accept: 'application/vnd.github.mercy-preview+json' },
  });
  return res.data;
}

/**
 * Create a new repository
 */
async function createRepo(name, description = '', isPrivate = false, autoInit = false) {
  const res = await github.post('/user/repos', {
    name,
    description,
    private: isPrivate,
    auto_init: autoInit,
  });
  return res.data;
}

/**
 * List repository security advisories
 */
async function listRepositoryAdvisories(owner, repo) {
  const res = await github.get(`/repos/${owner}/${repo}/security-advisories`);
  return res.data;
}

/**
 * Get a specific repository advisory
 */
async function getRepositoryAdvisory(owner, repo, ghsaId) {
  const res = await github.get(`/repos/${owner}/${repo}/security-advisories/${ghsaId}`);
  return res.data;
}

/**
 * List repository tags
 */
async function listTags(owner, repo) {
  const res = await github.get(`/repos/${owner}/${repo}/tags`);
  return res.data;
}

export {
  getMyRepos,
  getRepo,
  listForks,
  getRepoTopics,
  createRepo,
  listRepositoryAdvisories,
  getRepositoryAdvisory,
  listTags,
};
