// Repository Service
// Bitbucket repository operations

import bitbucket from '../bitbucket-client.js';

/**
 * Get all repositories for a workspace
 */
async function getMyRepos(workspace) {
  try {
    const res = await bitbucket.get(`/repositories/${workspace}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get repositories for workspace ${workspace}: ${error.message}`);
  }
}

/**
 * Get repository details
 */
async function getRepo(workspace, repoSlug) {
  try {
    const res = await bitbucket.get(`/repositories/${workspace}/${repoSlug}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get repository ${workspace}/${repoSlug}: ${error.message}`);
  }
}

/**
 * List repository forks
 */
async function listForks(workspace, repoSlug) {
  try {
    const res = await bitbucket.get(`/repositories/${workspace}/${repoSlug}/forks`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list forks for ${workspace}/${repoSlug}: ${error.message}`);
  }
}

/**
 * Create a new repository
 */
async function createRepo(workspace, repoSlug, description = '', isPrivate = false) {
  try {
    const res = await bitbucket.post(`/repositories/${workspace}/${repoSlug}`, {
      scm: 'git',
      description,
      is_private: isPrivate,
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to create repository ${workspace}/${repoSlug}: ${error.message}`);
  }
}

export {
  getMyRepos,
  getRepo,
  listForks,
  createRepo,
};
