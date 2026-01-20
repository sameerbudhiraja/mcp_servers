// Commit Service
// GitHub commit operations

import github from '../githubClient.js';

/**
 * List commits in a repository
 */
async function listCommits(owner, repo, sha = '', path = '') {
  const params = {};
  if (sha) params.sha = sha;
  if (path) params.path = path;

  const res = await github.get(`/repos/${owner}/${repo}/commits`, { params });
  return res.data;
}

/**
 * Get commit details
 */
async function getCommit(owner, repo, sha) {
  const res = await github.get(`/repos/${owner}/${repo}/commits/${sha}`);
  return res.data;
}

/**
 * Compare two commits
 */
async function compareCommits(owner, repo, base, head) {
  const res = await github.get(`/repos/${owner}/${repo}/compare/${base}...${head}`);
  return res.data;
}

/**
 * Get commit diff
 */
async function getCommitDiff(owner, repo, sha) {
  const res = await github.get(`/repos/${owner}/${repo}/commits/${sha}`, {
    headers: { Accept: 'application/vnd.github.v3.diff' },
  });
  return res.data;
}

export {
  listCommits,
  getCommit,
  compareCommits,
  getCommitDiff,
};
