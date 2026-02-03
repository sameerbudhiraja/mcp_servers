// Pull Request Service
// GitHub pull request operations

import github from '../github-client.js';

/**
 * List pull requests for a repository
 */ 
async function listPullRequests(payload) {
  try {
    const res = await github.get(`/repos/${payload.owner}/${payload.repo}/pulls`, {
      params: { state: payload.state },
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list pull requests for ${payload.owner}/${payload.repo}: ${error.message}`);
  }
}

/**
 * Get pull request details
 */
async function getPullRequest(payload) {
  try {
    const res = await github.get(`/repos/${payload.owner}/${payload.repo}/pulls/${payload.prNumber}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get pull request #${payload.prNumber} for ${payload.owner}/${payload.repo}: ${error.message}`);
  }
}

/**
 * List pull request reviews
 */
async function listPRReviews(payload) {
  try {
    const res = await github.get(`/repos/${payload.owner}/${payload.repo}/pulls/${payload.prNumber}/reviews`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list reviews for PR #${payload.prNumber} in ${payload.owner}/${payload.repo}: ${error.message}`);
  }
}

/**
 * List pull request files
 */
async function listPRFiles(payload) {
  try {
    const res = await github.get(`/repos/${payload.owner}/${payload.repo}/pulls/${payload.prNumber}/files`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list files for PR #${payload.prNumber} in ${payload.owner}/${payload.repo}: ${error.message}`);
  }
}

/**
 * List pull request comments
 */
async function listPRComments(payload) {
  try {
    const res = await github.get(`/repos/${payload.owner}/${payload.repo}/pulls/${payload.prNumber}/comments`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list comments for PR #${payload.prNumber} in ${payload.owner}/${payload.repo}: ${error.message}`);
  }
}

/**
 * Get pull request diff
 */
async function getPullRequestDiff(payload) {
  try {
    const res = await github.get(`/repos/${payload.owner}/${payload.repo}/pulls/${payload.prNumber}`, {
      headers: { Accept: 'application/vnd.github.v3.diff' },
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get diff for PR #${payload.prNumber} in ${payload.owner}/${payload.repo}: ${error.message}`);
  }
}

export {
  listPullRequests,
  getPullRequest,
  listPRReviews,
  listPRFiles,
  listPRComments,
  getPullRequestDiff,
};
