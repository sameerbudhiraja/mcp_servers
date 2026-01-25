// Tree and Blob Service
// GitHub tree and blob operations

import github from '../github-client.js';

/**
 * Get a git tree
 */
async function getTree(owner, repo, treeSha, recursive = false) {
  try {
    const params = recursive ? { recursive: 1 } : {};
    const res = await github.get(`/repos/${owner}/${repo}/git/trees/${treeSha}`, { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get tree ${treeSha} for ${owner}/${repo}: ${error.message}`);
  }
}

/**
 * Get a git blob
 */
async function getBlob(owner, repo, fileSha) {
  try {
    const res = await github.get(`/repos/${owner}/${repo}/git/blobs/${fileSha}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get blob ${fileSha} for ${owner}/${repo}: ${error.message}`);
  }
}

/**
 * Create a git blob
 */
async function createBlob(owner, repo, content, encoding = 'utf-8') {
  try {
    const res = await github.post(`/repos/${owner}/${repo}/git/blobs`, {
      content,
      encoding,
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to create blob for ${owner}/${repo}: ${error.message}`);
  }
}

export {
  getTree,
  getBlob,
  createBlob,
};
