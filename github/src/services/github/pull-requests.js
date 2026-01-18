// Pull Request Service
// GitHub pull request operations

import github from '../githubClient.js';

/**
 * List pull requests for a repository
 */ 
async function listPullRequests(owner, repo, state = 'open') {
  const res = await github.get(`/repos/${owner}/${repo}/pulls`, {
    params: { state },
  });
  return res.data;
}

/**
 * Get pull request details
 */
async function getPullRequest(owner, repo, prNumber) {
  const res = await github.get(`/repos/${owner}/${repo}/pulls/${prNumber}`);
  return res.data;
}

/**
 * List pull request reviews
 */
async function listPRReviews(owner, repo, prNumber) {
  const res = await github.get(`/repos/${owner}/${repo}/pulls/${prNumber}/reviews`);
  return res.data;
}

/**
 * List pull request files
 */
async function listPRFiles(owner, repo, prNumber) {
  const res = await github.get(`/repos/${owner}/${repo}/pulls/${prNumber}/files`);
  return res.data;
}

/**
 * List pull request comments
 */
async function listPRComments(owner, repo, prNumber) {
  const res = await github.get(`/repos/${owner}/${repo}/pulls/${prNumber}/comments`);
  return res.data;
}

/**
 * Get pull request diff
 */
async function getPullRequestDiff(owner, repo, prNumber) {
  const res = await github.get(`/repos/${owner}/${repo}/pulls/${prNumber}`, {
    headers: { Accept: 'application/vnd.github.v3.diff' },
  });
  return res.data;
}

export {
  listPullRequests,
  getPullRequest,
  listPRReviews,
  listPRFiles,
  listPRComments,
  getPullRequestDiff,
};
