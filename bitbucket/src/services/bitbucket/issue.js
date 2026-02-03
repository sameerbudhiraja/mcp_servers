// Issue Service
// Bitbucket issue operations

import bitbucket from '../bitbucket-client.js';

/**
 * List issues for a repository
 */
async function listIssues(payload) {
  try {
    const params = payload.state ? { state: payload.state } : {};
    const res = await bitbucket.get(`/repositories/${payload.workspace}/${payload.repoSlug}/issues`, { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list issues for ${payload.workspace}/${payload.repoSlug}: ${error.message}`);
  }
}

/**
 * Get issue details
 */
async function getIssue(payload) {
  try {
    const res = await bitbucket.get(`/repositories/${payload.workspace}/${payload.repoSlug}/issues/${payload.issueId}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get issue ${payload.issueId} for ${payload.workspace}/${payload.repoSlug}: ${error.message}`);
  }
}

/**
 * List issue comments
 */
async function listIssueComments(payload) {
  try {
    const res = await bitbucket.get(`/repositories/${payload.workspace}/${payload.repoSlug}/issues/${payload.issueId}/comments`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list comments for issue ${payload.issueId} in ${payload.workspace}/${payload.repoSlug}: ${error.message}`);
  }
}

export {
  listIssues,
  getIssue,
  listIssueComments,
};
