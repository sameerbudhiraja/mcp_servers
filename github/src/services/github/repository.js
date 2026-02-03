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
async function getRepo(payload) {
  try {
    const res = await github.get(`/repos/${payload.owner}/${payload.repo}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get repository ${payload.owner}/${payload.repo}: ${error.message}`);
  }
}

/**
 * List repository forks
 */
async function listForks(payload) {
  try {
    const res = await github.get(`/repos/${payload.owner}/${payload.repo}/forks`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list forks for ${payload.owner}/${payload.repo}: ${error.message}`);
  }
}

/**
 * Get repository topics
 */
async function getRepoTopics(payload) {
  try {
    const res = await github.get(`/repos/${payload.owner}/${payload.repo}/topics`, {
      headers: { Accept: 'application/vnd.github.mercy-preview+json' },
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get topics for ${payload.owner}/${payload.repo}: ${error.message}`);
  }
}

/**
 * Create a new repository
 */
async function createRepo(payload) {
  try {
    const res = await github.post('/user/repos', {
      name: payload.name,
      description: payload.description,
      private: payload.isPrivate,
      auto_init: payload.autoInit,
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to create repository ${payload.name}: ${error.message}`);
  }
}

/**
 * List repository security advisories
 */
async function listRepositoryAdvisories(payload) {
  try {
    const res = await github.get(`/repos/${payload.owner}/${payload.repo}/security-advisories`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list security advisories for ${payload.owner}/${payload.repo}: ${error.message}`);
  }
}

/**
 * Get a specific repository advisory
 */
async function getRepositoryAdvisory(payload) {
  try {
    const res = await github.get(`/repos/${payload.owner}/${payload.repo}/security-advisories/${payload.ghsaId}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get security advisory ${payload.ghsaId} for ${payload.owner}/${payload.repo}: ${error.message}`);
  }
}

/**
 * List repository tags
 */
async function listTags(payload) {
  try {
    const res = await github.get(`/repos/${payload.owner}/${payload.repo}/tags`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list tags for ${payload.owner}/${payload.repo}: ${error.message}`);
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
