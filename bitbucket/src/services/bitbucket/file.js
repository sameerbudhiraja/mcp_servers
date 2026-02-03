// File Service
// Bitbucket file operations

import bitbucket from '../bitbucket-client.js';

/**
 * Get file contents
 */
async function getFileContents(payload) {
  try {
    const commit = payload.commit || 'HEAD';
    const res = await bitbucket.get(`/repositories/${payload.workspace}/${payload.repoSlug}/src/${commit}/${payload.path}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get file ${payload.path} from ${payload.workspace}/${payload.repoSlug}: ${error.message}`);
  }
}

/**
 * Get directory contents
 */
async function getDirectoryContents(payload) {
  try {
    const commit = payload.commit || 'HEAD';
    const path = payload.path || '';
    const url = path 
      ? `/repositories/${payload.workspace}/${payload.repoSlug}/src/${commit}/${path}/`
      : `/repositories/${payload.workspace}/${payload.repoSlug}/src/${commit}/`;
    const res = await bitbucket.get(url);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get directory contents for ${payload.workspace}/${payload.repoSlug}: ${error.message}`);
  }
}

export {
  getFileContents,
  getDirectoryContents,
};
