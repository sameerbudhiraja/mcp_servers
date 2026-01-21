// Branch Service
// GitHub branch operations

import github from '../github-client.js';

/**
 * List branches in a repository
 */
async function listBranches(owner, repo) {
  try {
    const res = await github.get(`/repos/${owner}/${repo}/branches`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list branches for ${owner}/${repo}: ${error.message}`);
  }
}

/**
 * Get branch details
 */
async function getBranch(owner, repo, branch) {
  try {
    const res = await github.get(`/repos/${owner}/${repo}/branches/${branch}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get branch ${branch} for ${owner}/${repo}: ${error.message}`);
  }
}

/**
 * Create a new branch
 */
async function createBranch(owner, repo, newBranch, fromSha) {
  try {
    const res = await github.post(`/repos/${owner}/${repo}/git/refs`, {
      ref: `refs/heads/${newBranch}`,
      sha: fromSha,
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to create branch ${newBranch} for ${owner}/${repo}: ${error.message}`);
  }
}

/**
 * Delete a branch
 */
async function deleteBranch(owner, repo, branch) {
  try {
    const res = await github.delete(`/repos/${owner}/${repo}/git/refs/heads/${branch}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to delete branch ${branch} for ${owner}/${repo}: ${error.message}`);
  }
}

/**
 * Get default branch name
 */
async function getDefaultBranch(owner, repo) {
  try {
    const res = await github.get(`/repos/${owner}/${repo}`);
    return res.data.default_branch;
  } catch (error) {
    throw new Error(`Failed to get default branch for ${owner}/${repo}: ${error.message}`);
  }
}

export {
  listBranches,
  getBranch,
  createBranch,
  deleteBranch,
  getDefaultBranch,
};
