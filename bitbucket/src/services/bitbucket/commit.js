// Commit Service
// Bitbucket commit operations

import bitbucket from '../bitbucket-client.js';

/**
 * List commits for a repository
 */
async function listCommits(payload) {
  try {
    const url = payload.branch 
      ? `/repositories/${payload.workspace}/${payload.repoSlug}/commits/${payload.branch}`
      : `/repositories/${payload.workspace}/${payload.repoSlug}/commits`;
    const res = await bitbucket.get(url);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list commits for ${payload.workspace}/${payload.repoSlug}: ${error.message}`);
  }
}

/**
 * Get commit details
 */
async function getCommit(payload) {
  try {
    const res = await bitbucket.get(`/repositories/${payload.workspace}/${payload.repoSlug}/commit/${payload.commit}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get commit ${payload.commit} for ${payload.workspace}/${payload.repoSlug}: ${error.message}`);
  }
}

/**
 * Get commit diff
 */
async function getCommitDiff(payload) {
  try {
    const res = await bitbucket.get(`/repositories/${payload.workspace}/${payload.repoSlug}/diff/${payload.spec}`, {
      headers: { Accept: 'text/plain' },
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get diff for ${payload.spec} in ${payload.workspace}/${payload.repoSlug}: ${error.message}`);
  }
}

export {
  listCommits,
  getCommit,
  getCommitDiff,
};
