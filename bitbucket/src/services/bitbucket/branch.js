// Branch Service
// Bitbucket branch operations

import bitbucket from '../bitbucket-client.js';

/**
 * List all branches
 */
async function listBranches(workspace, repoSlug) {
  try {
    const res = await bitbucket.get(`/repositories/${workspace}/${repoSlug}/refs/branches`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list branches for ${workspace}/${repoSlug}: ${error.message}`);
  }
}

/**
 * Get branch details
 */
async function getBranch(workspace, repoSlug, branchName) {
  try {
    const res = await bitbucket.get(`/repositories/${workspace}/${repoSlug}/refs/branches/${branchName}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get branch ${branchName} for ${workspace}/${repoSlug}: ${error.message}`);
  }
}

/**
 * Create a new branch
 */
async function createBranch(workspace, repoSlug, branchName, target) {
  try {
    const res = await bitbucket.post(`/repositories/${workspace}/${repoSlug}/refs/branches`, {
      name: branchName,
      target: {
        hash: target,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to create branch ${branchName} for ${workspace}/${repoSlug}: ${error.message}`);
  }
}

/**
 * Delete a branch
 */
async function deleteBranch(workspace, repoSlug, branchName) {
  try {
    const res = await bitbucket.delete(`/repositories/${workspace}/${repoSlug}/refs/branches/${branchName}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to delete branch ${branchName} for ${workspace}/${repoSlug}: ${error.message}`);
  }
}

export {
  listBranches,
  getBranch,
  createBranch,
  deleteBranch,
};
