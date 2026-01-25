// Commit Service
// GitHub commit operations

import github from '../github-client.js';

/**
 * List commits in a repository
 */
async function listCommits(owner, repo, sha = '', path = '') {
  try {
    const params = {};
    if (sha) params.sha = sha;
    if (path) params.path = path;

    const res = await github.get(`/repos/${owner}/${repo}/commits`, { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list commits for ${owner}/${repo}: ${error.message}`);
  }
}

/**
 * Get commit details
 */
async function getCommit(owner, repo, sha) {
  try {
    const res = await github.get(`/repos/${owner}/${repo}/commits/${sha}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get commit ${sha} for ${owner}/${repo}: ${error.message}`);
  }
}

/**
 * Compare two commits
 */
async function compareCommits(owner, repo, base, head) {
  try {
    const res = await github.get(`/repos/${owner}/${repo}/compare/${base}...${head}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to compare commits ${base}...${head} for ${owner}/${repo}: ${error.message}`);
  }
}

/**
 * Get commit diff
 */
async function getCommitDiff(owner, repo, sha) {
  try {
    const res = await github.get(`/repos/${owner}/${repo}/commits/${sha}`, {
      headers: { Accept: 'application/vnd.github.v3.diff' },
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get commit diff for ${sha} in ${owner}/${repo}: ${error.message}`);
  }
}

export {
  listCommits,
  getCommit,
  compareCommits,
  getCommitDiff,
};
