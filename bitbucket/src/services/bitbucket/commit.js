// Commit Service
// Bitbucket commit operations

import bitbucket from '../bitbucket-client.js';

/**
 * List commits for a repository
 */
async function listCommits(workspace, repoSlug, branch = null) {
  try {
    const url = branch 
      ? `/repositories/${workspace}/${repoSlug}/commits/${branch}`
      : `/repositories/${workspace}/${repoSlug}/commits`;
    const res = await bitbucket.get(url);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list commits for ${workspace}/${repoSlug}: ${error.message}`);
  }
}

/**
 * Get commit details
 */
async function getCommit(workspace, repoSlug, commit) {
  try {
    const res = await bitbucket.get(`/repositories/${workspace}/${repoSlug}/commit/${commit}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get commit ${commit} for ${workspace}/${repoSlug}: ${error.message}`);
  }
}

/**
 * Get commit diff
 */
async function getCommitDiff(workspace, repoSlug, spec) {
  try {
    const res = await bitbucket.get(`/repositories/${workspace}/${repoSlug}/diff/${spec}`, {
      headers: { Accept: 'text/plain' },
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get diff for ${spec} in ${workspace}/${repoSlug}: ${error.message}`);
  }
}

export {
  listCommits,
  getCommit,
  getCommitDiff,
};
