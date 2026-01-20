// Branch Service
// GitHub branch operations

import github from '../githubClient.js';

/**
 * List branches in a repository
 */
async function listBranches(owner, repo) {
  const res = await github.get(`/repos/${owner}/${repo}/branches`);
  return res.data;
}

/**
 * Get branch details
 */
async function getBranch(owner, repo, branch) {
  const res = await github.get(`/repos/${owner}/${repo}/branches/${branch}`);
  return res.data;
}

/**
 * Create a new branch
 */
async function createBranch(owner, repo, newBranch, fromSha) {
  const res = await github.post(`/repos/${owner}/${repo}/git/refs`, {
    ref: `refs/heads/${newBranch}`,
    sha: fromSha,
  });
  return res.data;
}

/**
 * Delete a branch
 */
async function deleteBranch(owner, repo, branch) {
  const res = await github.delete(`/repos/${owner}/${repo}/git/refs/heads/${branch}`);
  return res.data;
}

/**
 * Get default branch name
 */
async function getDefaultBranch(owner, repo) {
  const res = await github.get(`/repos/${owner}/${repo}`);
  return res.data.default_branch;
}

export {
  listBranches,
  getBranch,
  createBranch,
  deleteBranch,
  getDefaultBranch,
};
