// File Service
// GitHub file and directory operations

import github from '../github-client.js';

/**
 * Get file contents
 */
async function getFileContents(owner, repo, path, ref = '') {
  try {
    const params = ref ? { ref } : {};
    const res = await github.get(`/repos/${owner}/${repo}/contents/${path}`, { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get file contents for ${owner}/${repo}/${path}: ${error.message}`);
  }
}

/**
 * Create or update a file
 */
async function createOrUpdateFile(owner, repo, path, message, content, sha = null, branch = '') {
  try {
    const data = {
      message,
      content, // Base64 encoded content
      ...(sha && { sha }),
      ...(branch && { branch }),
    };
    const res = await github.put(`/repos/${owner}/${repo}/contents/${path}`, data);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to create/update file ${owner}/${repo}/${path}: ${error.message}`);
  }
}

/**
 * Delete a file
 */
async function deleteFile(owner, repo, path, message, sha, branch = '') {
  try {
    const data = {
      message,
      sha,
      ...(branch && { branch }),
    };
    const res = await github.delete(`/repos/${owner}/${repo}/contents/${path}`, { data });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to delete file ${owner}/${repo}/${path}: ${error.message}`);
  }
}

/**
 * Get directory contents
 */
async function getDirectoryContents(owner, repo, path = '', ref = '') {
  try {
    const params = ref ? { ref } : {};
    const res = await github.get(`/repos/${owner}/${repo}/contents/${path}`, { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get directory contents for ${owner}/${repo}/${path}: ${error.message}`);
  }
}

export {
  getFileContents,
  createOrUpdateFile,
  deleteFile,
  getDirectoryContents,
};
