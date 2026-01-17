/**
 * File Service
 * GitHub file and directory operations
 */

import github from '../githubClient.js';

/**
 * Get file contents
 */
async function getFileContents(owner, repo, path, ref = '') {
  const params = ref ? { ref } : {};
  const res = await github.get(`/repos/${owner}/${repo}/contents/${path}`, { params });
  return res.data;
}

/**
 * Create or update a file
 */
async function createOrUpdateFile(owner, repo, path, message, content, sha = null, branch = '') {
  const data = {
    message,
    content, // Base64 encoded content
    ...(sha && { sha }),
    ...(branch && { branch }),
  };
  const res = await github.put(`/repos/${owner}/${repo}/contents/${path}`, data);
  return res.data;
}

/**
 * Delete a file
 */
async function deleteFile(owner, repo, path, message, sha, branch = '') {
  const data = {
    message,
    sha,
    ...(branch && { branch }),
  };
  const res = await github.delete(`/repos/${owner}/${repo}/contents/${path}`, { data });
  return res.data;
}

/**
 * Get directory contents
 */
async function getDirectoryContents(owner, repo, path = '', ref = '') {
  const params = ref ? { ref } : {};
  const res = await github.get(`/repos/${owner}/${repo}/contents/${path}`, { params });
  return res.data;
}

export {
  getFileContents,
  createOrUpdateFile,
  deleteFile,
  getDirectoryContents,
};
