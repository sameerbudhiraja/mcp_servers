/**
 * Issue Service
 * GitHub issue operations
 */

import github from '../githubClient.js';

/**
 * List issues for a repository
 */
async function listIssues(owner, repo, state = 'open') {
  const res = await github.get(`/repos/${owner}/${repo}/issues`, {
    params: { state },
  });
  return res.data;
}

/**
 * Get issue details
 */
async function getIssue(owner, repo, issueNumber) {
  const res = await github.get(`/repos/${owner}/${repo}/issues/${issueNumber}`);
  return res.data;
}

/**
 * List issue comments
 */
async function listIssueComments(owner, repo, issueNumber) {
  const res = await github.get(`/repos/${owner}/${repo}/issues/${issueNumber}/comments`);
  return res.data;
}

export {
  listIssues,
  getIssue,
  listIssueComments,
};
