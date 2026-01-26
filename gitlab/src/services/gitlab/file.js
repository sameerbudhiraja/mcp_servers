// File Service
// GitLab file/repository operations

import gitlab from '../gitlab-client.js';

/**
 * Get file contents
 */
async function getFile(projectId, filePath, ref = null) {
  try {
    const encodedId = encodeURIComponent(projectId);
    const encodedPath = encodeURIComponent(filePath);
    const params = ref ? { ref } : {};
    const res = await gitlab.get(`/projects/${encodedId}/repository/files/${encodedPath}`, { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get file ${filePath} for project ${projectId}: ${error.message}`);
  }
}

/**
 * Get directory contents/tree
 */
async function getDirectory(projectId, path = '', ref = null) {
  try {
    const encodedId = encodeURIComponent(projectId);
    const params = { path };
    if (ref) params.ref = ref;
    const res = await gitlab.get(`/projects/${encodedId}/repository/tree`, { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get directory contents for project ${projectId}: ${error.message}`);
  }
}

/**
 * Create a new file
 */
async function createFile(projectId, filePath, branch, content, commitMessage) {
  try {
    const encodedId = encodeURIComponent(projectId);
    const encodedPath = encodeURIComponent(filePath);
    const res = await gitlab.post(`/projects/${encodedId}/repository/files/${encodedPath}`, {
      branch,
      content,
      commit_message: commitMessage,
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to create file ${filePath} for project ${projectId}: ${error.message}`);
  }
}

/**
 * Update an existing file
 */
async function updateFile(projectId, filePath, branch, content, commitMessage) {
  try {
    const encodedId = encodeURIComponent(projectId);
    const encodedPath = encodeURIComponent(filePath);
    const res = await gitlab.put(`/projects/${encodedId}/repository/files/${encodedPath}`, {
      branch,
      content,
      commit_message: commitMessage,
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to update file ${filePath} for project ${projectId}: ${error.message}`);
  }
}

export {
  getFile,
  getDirectory,
  createFile,
  updateFile,
};
