// Merge Request Service
// GitLab merge request operations

import gitlab from '../gitlab-client.js';

/**
 * List merge requests for a project
 */
async function listMergeRequests(payload) {
  try {
    const encodedId = encodeURIComponent(payload.projectId);
    const params = payload.state !== 'all' ? { state: payload.state } : {};
    const res = await gitlab.get(`/projects/${encodedId}/merge_requests`, { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list merge requests for project ${payload.projectId}: ${error.message}`);
  }
}

/**
 * Get merge request details
 */
async function getMergeRequest(payload) {
  try {
    const encodedId = encodeURIComponent(payload.projectId);
    const res = await gitlab.get(`/projects/${encodedId}/merge_requests/${payload.mergeRequestIid}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get merge request ${payload.mergeRequestIid} for project ${payload.projectId}: ${error.message}`);
  }
}

/**
 * Get merge request diff/changes
 */
async function getMergeRequestDiff(payload) {
  try {
    const encodedId = encodeURIComponent(payload.projectId);
    const res = await gitlab.get(`/projects/${encodedId}/merge_requests/${payload.mergeRequestIid}/changes`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get diff for merge request ${payload.mergeRequestIid}: ${error.message}`);
  }
}

/**
 * List merge request commits
 */
async function listMRCommits(payload) {
  try {
    const encodedId = encodeURIComponent(payload.projectId);
    const res = await gitlab.get(`/projects/${encodedId}/merge_requests/${payload.mergeRequestIid}/commits`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list commits for merge request ${payload.mergeRequestIid}: ${error.message}`);
  }
}

/**
 * List merge request comments/notes
 */
async function listMRComments(payload) {
  try {
    const encodedId = encodeURIComponent(payload.projectId);
    const res = await gitlab.get(`/projects/${encodedId}/merge_requests/${payload.mergeRequestIid}/notes`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list comments for merge request ${payload.mergeRequestIid}: ${error.message}`);
  }
}

export {
  listMergeRequests,
  getMergeRequest,
  getMergeRequestDiff,
  listMRCommits,
  listMRComments,
};
