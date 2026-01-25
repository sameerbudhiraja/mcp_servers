// Repository Service
// GitHub repository operations


import github from '../github-client.js';

/**
 * Get all repositories for the authenticated user
 */
async function getMyRepos() {
  try {
    const res = await github.get('/user/repos');
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get user repositories: ${error.message}`);
  }
}

/**
 * Get repository details
 */
async function getRepo(owner, repo) {
  try {
    const res = await github.get(`/repos/${owner}/${repo}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get repository ${owner}/${repo}: ${error.message}`);
  }
}

/**
 * List repository forks
 */
async function listForks(owner, repo) {
  try {
    const res = await github.get(`/repos/${owner}/${repo}/forks`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list forks for ${owner}/${repo}: ${error.message}`);
  }
}

/**
 * Get repository topics
 */
async function getRepoTopics(owner, repo) {
  try {
    const res = await github.get(`/repos/${owner}/${repo}/topics`, {
      headers: { Accept: 'application/vnd.github.mercy-preview+json' },
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get topics for ${owner}/${repo}: ${error.message}`);
  }
}

/**
 * Create a new repository
 */
async function createRepo(name, description = '', isPrivate = false, autoInit = false) {
  try {
    const res = await github.post('/user/repos', {
      name,
      description,
      private: isPrivate,
      auto_init: autoInit,
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to create repository ${name}: ${error.message}`);
  }
}

/**
 * List repository security advisories
 */
async function listRepositoryAdvisories(owner, repo) {
  try {
    const res = await github.get(`/repos/${owner}/${repo}/security-advisories`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list security advisories for ${owner}/${repo}: ${error.message}`);
  }
}

/**
 * Get a specific repository advisory
 */
async function getRepositoryAdvisory(owner, repo, ghsaId) {
  try {
    const res = await github.get(`/repos/${owner}/${repo}/security-advisories/${ghsaId}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get security advisory ${ghsaId} for ${owner}/${repo}: ${error.message}`);
  }
}

/**
 * List repository tags
 */
async function listTags(owner, repo) {
  try {
    const res = await github.get(`/repos/${owner}/${repo}/tags`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list tags for ${owner}/${repo}: ${error.message}`);
  }
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
