// Branch Service
// GitHub branch operations

import github from '../github-client.js';

/**
 * List branches in a repository
 */
async function listBranches(payload) {
  try {
    const res = await github.get(`/repos/${payload.owner}/${payload.repo}/branches`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list branches for ${payload.owner}/${payload.repo}: ${error.message}`);
  }
}

/**
 * Get branch details
 */
async function getBranch(payload) {
  try {
    const res = await github.get(`/repos/${payload.owner}/${payload.repo}/branches/${payload.branch}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get branch ${payload.branch} for ${payload.owner}/${payload.repo}: ${error.message}`);
  }
}

/**
 * Create a new branch
 */
async function createBranch(payload) {
  try {
    const res = await github.post(`/repos/${payload.owner}/${payload.repo}/git/refs`, {
      ref: `refs/heads/${payload.newBranch}`,
      sha: payload.fromSha,
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to create branch ${payload.newBranch} for ${payload.owner}/${payload.repo}: ${error.message}`);
  }
}

/**
 * Delete a branch
 */
async function deleteBranch(payload) {
  try {
    const res = await github.delete(`/repos/${payload.owner}/${payload.repo}/git/refs/heads/${payload.branch}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to delete branch ${payload.branch} for ${payload.owner}/${payload.repo}: ${error.message}`);
  }
}

/**
 * Get default branch name
 */
async function getDefaultBranch(payload) {
  try {
    const res = await github.get(`/repos/${payload.owner}/${payload.repo}`);
    return res.data.default_branch;
  } catch (error) {
    throw new Error(`Failed to get default branch for ${payload.owner}/${payload.repo}: ${error.message}`);
  }
}

export {
  listBranches,
  getBranch,
  createBranch,
  deleteBranch,
  getDefaultBranch,
};
