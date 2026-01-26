// Branch Service
// GitLab branch operations

import gitlab from '../gitlab-client.js';

/**
 * List all branches
 */
async function listBranches(projectId) {
  try {
    const encodedId = encodeURIComponent(projectId);
    const res = await gitlab.get(`/projects/${encodedId}/repository/branches`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list branches for project ${projectId}: ${error.message}`);
  }
}

/**
 * Get branch details
 */
async function getBranch(projectId, branchName) {
  try {
    const encodedId = encodeURIComponent(projectId);
    const encodedBranch = encodeURIComponent(branchName);
    const res = await gitlab.get(`/projects/${encodedId}/repository/branches/${encodedBranch}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get branch ${branchName} for project ${projectId}: ${error.message}`);
  }
}

/**
 * Create a new branch
 */
async function createBranch(projectId, branchName, ref) {
  try {
    const encodedId = encodeURIComponent(projectId);
    const res = await gitlab.post(`/projects/${encodedId}/repository/branches`, {
      branch: branchName,
      ref,
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to create branch ${branchName} for project ${projectId}: ${error.message}`);
  }
}

/**
 * Delete a branch
 */
async function deleteBranch(projectId, branchName) {
  try {
    const encodedId = encodeURIComponent(projectId);
    const encodedBranch = encodeURIComponent(branchName);
    const res = await gitlab.delete(`/projects/${encodedId}/repository/branches/${encodedBranch}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to delete branch ${branchName} for project ${projectId}: ${error.message}`);
  }
}

export {
  listBranches,
  getBranch,
  createBranch,
  deleteBranch,
};
