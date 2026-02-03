// File Service
// GitHub file and directory operations

import github from '../github-client.js';

/**
 * Get file contents
 */
async function getFileContents(payload) {
  try {
    const params = payload.ref ? { ref: payload.ref } : {};
    const res = await github.get(`/repos/${payload.owner}/${payload.repo}/contents/${payload.path}`, { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get file contents for ${payload.owner}/${payload.repo}/${payload.path}: ${error.message}`);
  }
}

/**
 * Create or update a file
 */
async function createOrUpdateFile(payload) {
  try {
    const data = {
      message: payload.message,
      content: payload.content, // Base64 encoded content
      ...(payload.sha && { sha: payload.sha }),
      ...(payload.branch && { branch: payload.branch }),
    };
    const res = await github.put(`/repos/${payload.owner}/${payload.repo}/contents/${payload.path}`, data);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to create/update file ${payload.owner}/${payload.repo}/${payload.path}: ${error.message}`);
  }
}

/**
 * Delete a file
 */
async function deleteFile(payload) {
  try {
    const data = {
      message: payload.message,
      sha: payload.sha,
      ...(payload.branch && { branch: payload.branch }),
    };
    const res = await github.delete(`/repos/${payload.owner}/${payload.repo}/contents/${payload.path}`, { data });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to delete file ${payload.owner}/${payload.repo}/${payload.path}: ${error.message}`);
  }
}

/**
 * Get directory contents
 */
async function getDirectoryContents(payload) {
  try {
    const params = payload.ref ? { ref: payload.ref } : {};
    const res = await github.get(`/repos/${payload.owner}/${payload.repo}/contents/${payload.path}`, { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get directory contents for ${payload.owner}/${payload.repo}/${payload.path}: ${error.message}`);
  }
}

export {
  getFileContents,
  createOrUpdateFile,
  deleteFile,
  getDirectoryContents,
};
