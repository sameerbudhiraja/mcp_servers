// Merge Request Service
// GitLab merge request operations

import gitlab from '../gitlab-client.js';

/**
 * List merge requests for a project
 */
async function listMergeRequests(projectId, state = 'opened') {
  try {
    const encodedId = encodeURIComponent(projectId);
    const params = state !== 'all' ? { state } : {};
    const res = await gitlab.get(`/projects/${encodedId}/merge_requests`, { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list merge requests for project ${projectId}: ${error.message}`);
  }
}

/**
 * Get merge request details
 */
async function getMergeRequest(projectId, mergeRequestIid) {
  try {
    const encodedId = encodeURIComponent(projectId);
    const res = await gitlab.get(`/projects/${encodedId}/merge_requests/${mergeRequestIid}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get merge request ${mergeRequestIid} for project ${projectId}: ${error.message}`);
  }
}

/**
 * Get merge request diff/changes
 */
async function getMergeRequestDiff(projectId, mergeRequestIid) {
  try {
    const encodedId = encodeURIComponent(projectId);
    const res = await gitlab.get(`/projects/${encodedId}/merge_requests/${mergeRequestIid}/changes`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get diff for merge request ${mergeRequestIid}: ${error.message}`);
  }
}

/**
 * List merge request commits
 */
async function listMRCommits(projectId, mergeRequestIid) {
  try {
    const encodedId = encodeURIComponent(projectId);
    const res = await gitlab.get(`/projects/${encodedId}/merge_requests/${mergeRequestIid}/commits`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list commits for merge request ${mergeRequestIid}: ${error.message}`);
  }
}

/**
 * List merge request comments/notes
 */
async function listMRComments(projectId, mergeRequestIid) {
  try {
    const encodedId = encodeURIComponent(projectId);
    const res = await gitlab.get(`/projects/${encodedId}/merge_requests/${mergeRequestIid}/notes`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list comments for merge request ${mergeRequestIid}: ${error.message}`);
  }
}

export {
  listMergeRequests,
  getMergeRequest,
  getMergeRequestDiff,
  listMRCommits,
  listMRComments,
};
