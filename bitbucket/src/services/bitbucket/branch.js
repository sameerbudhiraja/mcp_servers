// Branch Service
// Bitbucket branch operations

import bitbucket from '../bitbucket-client.js';

/**
 * List all branches
 */
async function listBranches(payload) {
  try {
    const res = await bitbucket.get(`/repositories/${payload.workspace}/${payload.repoSlug}/refs/branches`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list branches for ${payload.workspace}/${payload.repoSlug}: ${error.message}`);
  }
}

/**
 * Get branch details
 */
async function getBranch(payload) {
  try {
    const res = await bitbucket.get(`/repositories/${payload.workspace}/${payload.repoSlug}/refs/branches/${payload.branchName}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get branch ${payload.branchName} for ${payload.workspace}/${payload.repoSlug}: ${error.message}`);
  }
}

/**
 * Create a new branch
 */
async function createBranch(payload) {
  try {
    const res = await bitbucket.post(`/repositories/${payload.workspace}/${payload.repoSlug}/refs/branches`, {
      name: payload.branchName,
      target: {
        hash: payload.target,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to create branch ${payload.branchName} for ${payload.workspace}/${payload.repoSlug}: ${error.message}`);
  }
}

/**
 * Delete a branch
 */
async function deleteBranch(payload) {
  try {
    const res = await bitbucket.delete(`/repositories/${payload.workspace}/${payload.repoSlug}/refs/branches/${payload.branchName}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to delete branch ${payload.branchName} for ${payload.workspace}/${payload.repoSlug}: ${error.message}`);
  }
}

export {
  listBranches,
  getBranch,
  createBranch,
  deleteBranch,
};
