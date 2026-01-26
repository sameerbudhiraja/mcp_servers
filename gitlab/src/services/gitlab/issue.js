// Issue Service
// GitLab issue operations

import gitlab from '../gitlab-client.js';

/**
 * List issues for a project
 */
async function listIssues(projectId, state = 'opened') {
  try {
    const encodedId = encodeURIComponent(projectId);
    const params = state !== 'all' ? { state } : {};
    const res = await gitlab.get(`/projects/${encodedId}/issues`, { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list issues for project ${projectId}: ${error.message}`);
  }
}

/**
 * Get issue details
 */
async function getIssue(projectId, issueIid) {
  try {
    const encodedId = encodeURIComponent(projectId);
    const res = await gitlab.get(`/projects/${encodedId}/issues/${issueIid}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get issue ${issueIid} for project ${projectId}: ${error.message}`);
  }
}

/**
 * Create a new issue
 */
async function createIssue(projectId, title, description = '') {
  try {
    const encodedId = encodeURIComponent(projectId);
    const res = await gitlab.post(`/projects/${encodedId}/issues`, {
      title,
      description,
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to create issue for project ${projectId}: ${error.message}`);
  }
}

/**
 * Update an existing issue
 */
async function updateIssue(projectId, issueIid, title = null, description = null, stateEvent = null) {
  try {
    const encodedId = encodeURIComponent(projectId);
    const data = {};
    if (title) data.title = title;
    if (description) data.description = description;
    if (stateEvent) data.state_event = stateEvent;
    
    const res = await gitlab.put(`/projects/${encodedId}/issues/${issueIid}`, data);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to update issue ${issueIid} for project ${projectId}: ${error.message}`);
  }
}

/**
 * List issue comments/notes
 */
async function listIssueComments(projectId, issueIid) {
  try {
    const encodedId = encodeURIComponent(projectId);
    const res = await gitlab.get(`/projects/${encodedId}/issues/${issueIid}/notes`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list comments for issue ${issueIid}: ${error.message}`);
  }
}

export {
  listIssues,
  getIssue,
  createIssue,
  updateIssue,
  listIssueComments,
};
