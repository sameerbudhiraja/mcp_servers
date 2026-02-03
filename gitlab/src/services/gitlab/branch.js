// Branch Service
// GitLab branch operations

import gitlab from '../gitlab-client.js';

/**
 * List all branches
 */
async function listBranches(playload) {
  try {
    const encodedId = encodeURIComponent(playload.projectId);
    const res = await gitlab.get(`/projects/${encodedId}/repository/branches`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list branches for project ${playload.projectId}: ${error.message}`);
  }
}

/**
 * Get branch details
 */
async function getBranch(playload) {
  try {
    const encodedId = encodeURIComponent(playload.projectId);
    const encodedBranch = encodeURIComponent(playload.branchName);
    const res = await gitlab.get(`/projects/${encodedId}/repository/branches/${encodedBranch}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get branch ${playload.branchName} for project ${playload.projectId}: ${error.message}`);
  }
}

/**
 * Create a new branch
 */
async function createBranch(playload) {
  try {
    const encodedId = encodeURIComponent(playload.projectId);
    const res = await gitlab.post(`/projects/${encodedId}/repository/branches`, {
      branch: playload.branchName,
      ref: playload.ref,
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to create branch ${playload.branchName} for project ${playload.projectId}: ${error.message}`);
  }
}

/**
 * Delete a branch
 */
async function deleteBranch(playload) {
  try {
    const encodedId = encodeURIComponent(playload.projectId);
    const encodedBranch = encodeURIComponent(playload.branchName);
    const res = await gitlab.delete(`/projects/${encodedId}/repository/branches/${encodedBranch}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to delete branch ${playload.branchName} for project ${playload.projectId}: ${error.message}`);
  }
}

export {
  listBranches,
  getBranch,
  createBranch,
  deleteBranch,
};
