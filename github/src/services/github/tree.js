// Tree and Blob Service
// GitHub tree and blob operations

import github from '../github-client.js';

/**
 * Get a git tree
 */
async function getTree(payload) {
  try {
    const params = payload.recursive ? { recursive: 1 } : {};
    const res = await github.get(`/repos/${payload.owner}/${payload.repo}/git/trees/${payload.treeSha}`, { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get tree ${payload.treeSha} for ${payload.owner}/${payload.repo}: ${error.message}`);
  }
}

/**
 * Get a git blob
 */
async function getBlob(payload) {
  try {
    const res = await github.get(`/repos/${payload.owner}/${payload.repo}/git/blobs/${payload.fileSha}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get blob ${payload.fileSha} for ${payload.owner}/${payload.repo}: ${error.message}`);
  }
}

/**
 * Create a git blob
 */
async function createBlob(payload) {
  try {
    const res = await github.post(`/repos/${payload.owner}/${payload.repo}/git/blobs`, {
      content: payload.content,
      encoding: payload.encoding,
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to create blob for ${payload.owner}/${payload.repo}: ${error.message}`);
  }
}

export {
  getTree,
  getBlob,
  createBlob,
};
