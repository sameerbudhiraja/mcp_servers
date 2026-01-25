// Issue Service
// Bitbucket issue operations

import bitbucket from '../bitbucket-client.js';

/**
 * List issues for a repository
 */
async function listIssues(workspace, repoSlug, state = null) {
  try {
    const params = state ? { state } : {};
    const res = await bitbucket.get(`/repositories/${workspace}/${repoSlug}/issues`, { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list issues for ${workspace}/${repoSlug}: ${error.message}`);
  }
}

/**
 * Get issue details
 */
async function getIssue(workspace, repoSlug, issueId) {
  try {
    const res = await bitbucket.get(`/repositories/${workspace}/${repoSlug}/issues/${issueId}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get issue ${issueId} for ${workspace}/${repoSlug}: ${error.message}`);
  }
}

/**
 * List issue comments
 */
async function listIssueComments(workspace, repoSlug, issueId) {
  try {
    const res = await bitbucket.get(`/repositories/${workspace}/${repoSlug}/issues/${issueId}/comments`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list comments for issue ${issueId} in ${workspace}/${repoSlug}: ${error.message}`);
  }
}

export {
  listIssues,
  getIssue,
  listIssueComments,
};
