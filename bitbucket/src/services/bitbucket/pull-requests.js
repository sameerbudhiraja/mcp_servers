// Pull Request Service
// Bitbucket pull request operations

import bitbucket from '../bitbucket-client.js';

/**
 * List pull requests for a repository
 */
async function listPullRequests(workspace, repoSlug, state = 'OPEN') {
  try {
    const params = state ? { state } : {};
    const res = await bitbucket.get(`/repositories/${workspace}/${repoSlug}/pullrequests`, { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list pull requests for ${workspace}/${repoSlug}: ${error.message}`);
  }
}

/**
 * Get pull request details
 */
async function getPullRequest(workspace, repoSlug, prId) {
  try {
    const res = await bitbucket.get(`/repositories/${workspace}/${repoSlug}/pullrequests/${prId}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get pull request ${prId} for ${workspace}/${repoSlug}: ${error.message}`);
  }
}

/**
 * List pull request comments
 */
async function listPRComments(workspace, repoSlug, prId) {
  try {
    const res = await bitbucket.get(`/repositories/${workspace}/${repoSlug}/pullrequests/${prId}/comments`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list comments for PR ${prId} in ${workspace}/${repoSlug}: ${error.message}`);
  }
}

/**
 * List pull request commits
 */
async function listPRCommits(workspace, repoSlug, prId) {
  try {
    const res = await bitbucket.get(`/repositories/${workspace}/${repoSlug}/pullrequests/${prId}/commits`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list commits for PR ${prId} in ${workspace}/${repoSlug}: ${error.message}`);
  }
}

/**
 * Get pull request diff
 */
async function getPullRequestDiff(workspace, repoSlug, prId) {
  try {
    const res = await bitbucket.get(`/repositories/${workspace}/${repoSlug}/pullrequests/${prId}/diff`, {
      headers: { Accept: 'text/plain' },
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get diff for PR ${prId} in ${workspace}/${repoSlug}: ${error.message}`);
  }
}

export {
  listPullRequests,
  getPullRequest,
  listPRComments,
  listPRCommits,
  getPullRequestDiff,
};
