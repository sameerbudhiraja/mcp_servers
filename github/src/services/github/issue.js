// Issue Service
// GitHub issue operations

import github from '../github-client.js';

/**
 * List issues for a repository
 */
async function listIssues(owner, repo, state = 'open') {
  try {
    const res = await github.get(`/repos/${owner}/${repo}/issues`, {
      params: { state },
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list issues for ${owner}/${repo}: ${error.message}`);
  }
}

/**
 * Get issue details
 */
async function getIssue(owner, repo, issueNumber) {
  try {
    const res = await github.get(`/repos/${owner}/${repo}/issues/${issueNumber}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get issue #${issueNumber} for ${owner}/${repo}: ${error.message}`);
  }
}

/**
 * List issue comments
 */
async function listIssueComments(owner, repo, issueNumber) {
  try {
    const res = await github.get(`/repos/${owner}/${repo}/issues/${issueNumber}/comments`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list comments for issue #${issueNumber} in ${owner}/${repo}: ${error.message}`);
  }
}

export {
  listIssues,
  getIssue,
  listIssueComments,
};
