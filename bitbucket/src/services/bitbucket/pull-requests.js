// Pull Request Service
// Bitbucket pull request operations

import bitbucket from '../bitbucket-client.js';

/**
 * List pull requests for a repository
 */
async function listPullRequests(payload) {
  try {
    const params = payload.state ? { state: payload.state } : {};
    const res = await bitbucket.get(`/repositories/${payload.workspace}/${payload.repoSlug}/pullrequests`, { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list pull requests for ${payload.workspace}/${payload.repoSlug}: ${error.message}`);
  }
}

/**
 * Get pull request details
 */
async function getPullRequest(payload) {
  try {
    const res = await bitbucket.get(`/repositories/${payload.workspace}/${payload.repoSlug}/pullrequests/${payload.prId}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get pull request ${payload.prId} for ${payload.workspace}/${payload.repoSlug}: ${error.message}`);
  }
}

/**
 * List pull request comments
 */
async function listPRComments(payload) {
  try {
    const res = await bitbucket.get(`/repositories/${payload.workspace}/${payload.repoSlug}/pullrequests/${payload.prId}/comments`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list comments for PR ${payload.prId} in ${payload.workspace}/${payload.repoSlug}: ${error.message}`);
  }
}

/**
 * List pull request commits
 */
async function listPRCommits(payload) {
  try {
    const res = await bitbucket.get(`/repositories/${payload.workspace}/${payload.repoSlug}/pullrequests/${payload.prId}/commits`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list commits for PR ${payload.prId} in ${payload.workspace}/${payload.repoSlug}: ${error.message}`);
  }
}

/**
 * Get pull request diff
 */
async function getPullRequestDiff(payload) {
  try {
    const res = await bitbucket.get(`/repositories/${payload.workspace}/${payload.repoSlug}/pullrequests/${payload.prId}/diff`, {
      headers: { Accept: 'text/plain' },
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get diff for PR ${payload.prId} in ${payload.workspace}/${payload.repoSlug}: ${error.message}`);
  }
}

export {
  listPullRequests,
  getPullRequest,
  listPRComments,
  listPRCommits,
  getPullRequestDiff,
};
