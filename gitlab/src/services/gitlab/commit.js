// Commit Service
// GitLab commit operations

import gitlab from '../gitlab-client.js';

/**
 * List commits
 */
async function listCommits(playload) {
  try {
    const encodedId = encodeURIComponent(playload.projectId);
    const params = playload.refName ? { ref_name: playload.refName } : {};
    const res = await gitlab.get(`/projects/${encodedId}/repository/commits`, { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list commits for project ${playload.projectId}: ${error.message}`);
  }
}

/**
 * Get commit details
 */
async function getCommit(playload) {
  try {
    const encodedId = encodeURIComponent(playload.projectId);
    const res = await gitlab.get(`/projects/${encodedId}/repository/commits/${playload.sha}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get commit ${playload.sha} for project ${playload.projectId}: ${error.message}`);
  }
}

/**
 * Get commit diff
 */
async function getCommitDiff(playload) {
  try {
    const encodedId = encodeURIComponent(playload.projectId);
    const res = await gitlab.get(`/projects/${encodedId}/repository/commits/${playload.sha}/diff`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get diff for commit ${playload.sha}: ${error.message}`);
  }
}

/**
 * List commit comments
 */
async function listCommitComments(playload) {
  try {
    const encodedId = encodeURIComponent(playload.projectId);
    const res = await gitlab.get(`/projects/${encodedId}/repository/commits/${playload.sha}/comments`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list comments for commit ${playload.sha}: ${error.message}`);
  }
}

export {
  listCommits,
  getCommit,
  getCommitDiff,
  listCommitComments,
};
