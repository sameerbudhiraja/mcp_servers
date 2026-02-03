// Issue Service
// GitLab issue operations

import gitlab from '../gitlab-client.js';

/**
 * List issues for a project
 */
async function listIssues(payload) {
  try {
    const encodedId = encodeURIComponent(payload.projectId);
    const params = payload.state !== 'all' ? { state: payload.state } : {};
    const res = await gitlab.get(`/projects/${encodedId}/issues`, { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list issues for project ${payload.projectId}: ${error.message}`);
  }
}

/**
 * Get issue details
 */
async function getIssue(payload) {
  try {
    const encodedId = encodeURIComponent(payload.projectId);
    const res = await gitlab.get(`/projects/${encodedId}/issues/${payload.issueIid}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get issue ${payload.issueIid} for project ${payload.projectId}: ${error.message}`);
  }
}

/**
 * Create a new issue
 */
async function createIssue(payload) {
  try {
    const encodedId = encodeURIComponent(payload.projectId);
    const res = await gitlab.post(`/projects/${encodedId}/issues`, {
      title: payload.title,
      description: payload.description,
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to create issue for project ${payload.projectId}: ${error.message}`);
  }
}

/**
 * Update an existing issue
 */
async function updateIssue(payload) {
  try {
    const encodedId = encodeURIComponent(payload.projectId);
    const data = {};
    if (payload.title) data.title = payload.title;
    if (payload.description) data.description = payload.description;
    if (payload.stateEvent) data.state_event = payload.stateEvent;
    
    const res = await gitlab.put(`/projects/${encodedId}/issues/${payload.issueIid}`, data);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to update issue ${payload.issueIid} for project ${payload.projectId}: ${error.message}`);
  }
}

/**
 * List issue comments/notes
 */
async function listIssueComments(payload) {
  try {
    const encodedId = encodeURIComponent(payload.projectId);
    const res = await gitlab.get(`/projects/${encodedId}/issues/${payload.issueIid}/notes`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list comments for issue ${payload.issueIid}: ${error.message}`);
  }
}

export {
  listIssues,
  getIssue,
  createIssue,
  updateIssue,
  listIssueComments,
};
