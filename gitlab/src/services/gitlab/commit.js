// Commit Service
// GitLab commit operations

import gitlab from '../gitlab-client.js';

/**
 * List commits
 */
async function listCommits(projectId, refName = null) {
  try {
    const encodedId = encodeURIComponent(projectId);
    const params = refName ? { ref_name: refName } : {};
    const res = await gitlab.get(`/projects/${encodedId}/repository/commits`, { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list commits for project ${projectId}: ${error.message}`);
  }
}

/**
 * Get commit details
 */
async function getCommit(projectId, sha) {
  try {
    const encodedId = encodeURIComponent(projectId);
    const res = await gitlab.get(`/projects/${encodedId}/repository/commits/${sha}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get commit ${sha} for project ${projectId}: ${error.message}`);
  }
}

/**
 * Get commit diff
 */
async function getCommitDiff(projectId, sha) {
  try {
    const encodedId = encodeURIComponent(projectId);
    const res = await gitlab.get(`/projects/${encodedId}/repository/commits/${sha}/diff`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get diff for commit ${sha}: ${error.message}`);
  }
}

/**
 * List commit comments
 */
async function listCommitComments(projectId, sha) {
  try {
    const encodedId = encodeURIComponent(projectId);
    const res = await gitlab.get(`/projects/${encodedId}/repository/commits/${sha}/comments`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list comments for commit ${sha}: ${error.message}`);
  }
}

export {
  listCommits,
  getCommit,
  getCommitDiff,
  listCommitComments,
};
