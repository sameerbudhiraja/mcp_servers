// File Service
// GitLab file/repository operations

import gitlab from '../gitlab-client.js';

/**
 * Get file contents
 */
async function getFile(payload) {
  try {
    const encodedId = encodeURIComponent(payload.projectId);
    const encodedPath = encodeURIComponent(payload.filePath);
    const params = payload.ref ? { ref: payload.ref } : {};
    const res = await gitlab.get(`/projects/${encodedId}/repository/files/${encodedPath}`, { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get file ${payload.filePath} for project ${payload.projectId}: ${error.message}`);
  }
}

/**
 * Get directory contents/tree
 */
async function getDirectory(payload) {
  try {
    const encodedId = encodeURIComponent(payload.projectId);
    const params = { path: payload.path };
    if (payload.ref) params.ref = payload.ref;
    const res = await gitlab.get(`/projects/${encodedId}/repository/tree`, { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get directory contents for project ${payload.projectId}: ${error.message}`);
  }
}

/**
 * Create a new file
 */
async function createFile(payload) {
  try {
    const encodedId = encodeURIComponent(payload.projectId);
    const encodedPath = encodeURIComponent(payload.filePath);
    const res = await gitlab.post(`/projects/${encodedId}/repository/files/${encodedPath}`, {
      branch: payload.branch,
      content: payload.content,
      commit_message: payload.commitMessage,
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to create file ${payload.filePath} for project ${payload.projectId}: ${error.message}`);
  }
}

/**
 * Update an existing file
 */
async function updateFile(payload) {
  try {
    const encodedId = encodeURIComponent(payload.projectId);
    const encodedPath = encodeURIComponent(payload.filePath);
    const res = await gitlab.put(`/projects/${encodedId}/repository/files/${encodedPath}`, {
      branch: payload.branch,
      content: payload.content,
      commit_message: payload.commitMessage,
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to update file ${payload.filePath} for project ${payload.projectId}: ${error.message}`);
  }
}

export {
  getFile,
  getDirectory,
  createFile,
  updateFile,
};
