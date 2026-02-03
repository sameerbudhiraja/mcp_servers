// Commit Service
// GitHub commit operations

import github from '../github-client.js';

/**
 * List commits in a repository
 */
async function listCommits(payload) {
  try {
    const params = {};
    if (payload.sha) params.sha = payload.sha;
    if (payload.path) params.path = payload.path;

    const res = await github.get(`/repos/${payload.owner}/${payload.repo}/commits`, { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list commits for ${payload.owner}/${payload.repo}: ${error.message}`);
  }
}

/**
 * Get commit details
 */
async function getCommit(payload) {
  try {
    const res = await github.get(`/repos/${payload.owner}/${payload.repo}/commits/${payload.sha}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get commit ${payload.sha} for ${payload.owner}/${payload.repo}: ${error.message}`);
  }
}

/**
 * Compare two commits
 */
async function compareCommits(payload) {
  try {
    const res = await github.get(`/repos/${payload.owner}/${payload.repo}/compare/${payload.base}...${payload.head}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to compare commits ${payload.base}...${payload.head} for ${payload.owner}/${payload.repo}: ${error.message}`);
  }
}

/**
 * Get commit diff
 */
async function getCommitDiff(payload) {
  try {
    const res = await github.get(`/repos/${payload.owner}/${payload.repo}/commits/${payload.sha}`, {
      headers: { Accept: 'application/vnd.github.v3.diff' },
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get commit diff for ${payload.sha} in ${payload.owner}/${payload.repo}: ${error.message}`);
  }
}

export {
  listCommits,
  getCommit,
  compareCommits,
  getCommitDiff,
};
