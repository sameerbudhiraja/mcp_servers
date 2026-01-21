// Pull Request Service
// GitHub pull request operations

import github from '../github-client.js';

/**
 * List pull requests for a repository
 */ 
async function listPullRequests(owner, repo, state = 'open') {
  try {
    const res = await github.get(`/repos/${owner}/${repo}/pulls`, {
      params: { state },
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list pull requests for ${owner}/${repo}: ${error.message}`);
  }
}

/**
 * Get pull request details
 */
async function getPullRequest(owner, repo, prNumber) {
  try {
    const res = await github.get(`/repos/${owner}/${repo}/pulls/${prNumber}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get pull request #${prNumber} for ${owner}/${repo}: ${error.message}`);
  }
}

/**
 * List pull request reviews
 */
async function listPRReviews(owner, repo, prNumber) {
  try {
    const res = await github.get(`/repos/${owner}/${repo}/pulls/${prNumber}/reviews`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list reviews for PR #${prNumber} in ${owner}/${repo}: ${error.message}`);
  }
}

/**
 * List pull request files
 */
async function listPRFiles(owner, repo, prNumber) {
  try {
    const res = await github.get(`/repos/${owner}/${repo}/pulls/${prNumber}/files`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list files for PR #${prNumber} in ${owner}/${repo}: ${error.message}`);
  }
}

/**
 * List pull request comments
 */
async function listPRComments(owner, repo, prNumber) {
  try {
    const res = await github.get(`/repos/${owner}/${repo}/pulls/${prNumber}/comments`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list comments for PR #${prNumber} in ${owner}/${repo}: ${error.message}`);
  }
}

/**
 * Get pull request diff
 */
async function getPullRequestDiff(owner, repo, prNumber) {
  try {
    const res = await github.get(`/repos/${owner}/${repo}/pulls/${prNumber}`, {
      headers: { Accept: 'application/vnd.github.v3.diff' },
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get diff for PR #${prNumber} in ${owner}/${repo}: ${error.message}`);
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
