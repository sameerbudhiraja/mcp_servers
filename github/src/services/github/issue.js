// Issue Service
// GitHub issue operations

import github from '../github-client.js';

/**
 * List issues for a repository
 */
async function listIssues(payload) {
  try {
    const res = await github.get(`/repos/${payload.owner}/${payload.repo}/issues`, {
      params: { state: payload.state },
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list issues for ${payload.owner}/${payload.repo}: ${error.message}`);
  }
}

/**
 * Get issue details
 */
async function getIssue(payload) {
  try {
    const res = await github.get(`/repos/${payload.owner}/${payload.repo}/issues/${payload.issueNumber}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get issue #${payload.issueNumber} for ${payload.owner}/${payload.repo}: ${error.message}`);
  }
}

/**
 * List issue comments
 */
async function listIssueComments(payload) {
  try {
    const res = await github.get(`/repos/${payload.owner}/${payload.repo}/issues/${payload.issueNumber}/comments`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list comments for issue #${payload.issueNumber} in ${payload.owner}/${payload.repo}: ${error.message}`);
  }
}

export {
  listIssues,
  getIssue,
  listIssueComments,
};
