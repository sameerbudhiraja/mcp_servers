// Repository Service
// Bitbucket repository operations

import bitbucket from '../bitbucket-client.js';

/**
 * Get all repositories for a workspace
 */
async function getMyRepos(payload) {
  try {
    const res = await bitbucket.get(`/repositories/${payload.workspace}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get repositories for workspace ${payload.workspace}: ${error.message}`);
  }
}

/**
 * Get repository details
 */
async function getRepo(payload) {
  try {
    const res = await bitbucket.get(`/repositories/${payload.workspace}/${payload.repoSlug}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get repository ${payload.workspace}/${payload.repoSlug}: ${error.message}`);
  }
}

/**
 * List repository forks
 */
async function listForks(payload) {
  try {
    const res = await bitbucket.get(`/repositories/${payload.workspace}/${payload.repoSlug}/forks`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list forks for ${payload.workspace}/${payload.repoSlug}: ${error.message}`);
  }
}

/**
 * Create a new repository
 */
async function createRepo(payload) {
  try {
    const res = await bitbucket.post(`/repositories/${payload.workspace}/${payload.repoSlug}`, {
      scm: 'git',
      description: payload.description || '',
      is_private: payload.isPrivate || false,
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to create repository ${payload.workspace}/${payload.repoSlug}: ${error.message}`);
  }
}

export {
  getMyRepos,
  getRepo,
  listForks,
  createRepo,
};
