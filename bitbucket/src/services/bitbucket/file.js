// File Service
// Bitbucket file operations

import bitbucket from '../bitbucket-client.js';

/**
 * Get file contents
 */
async function getFileContents(workspace, repoSlug, path, commit = 'HEAD') {
  try {
    const res = await bitbucket.get(`/repositories/${workspace}/${repoSlug}/src/${commit}/${path}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get file ${path} from ${workspace}/${repoSlug}: ${error.message}`);
  }
}

/**
 * Get directory contents
 */
async function getDirectoryContents(workspace, repoSlug, path = '', commit = 'HEAD') {
  try {
    const url = path 
      ? `/repositories/${workspace}/${repoSlug}/src/${commit}/${path}/`
      : `/repositories/${workspace}/${repoSlug}/src/${commit}/`;
    const res = await bitbucket.get(url);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get directory contents for ${workspace}/${repoSlug}: ${error.message}`);
  }
}

export {
  getFileContents,
  getDirectoryContents,
};
