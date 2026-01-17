/**
 * Tree and Blob Service
 * GitHub tree and blob operations
 */

import github from '../githubClient.js';

/**
 * Get a git tree
 */
async function getTree(owner, repo, treeSha, recursive = false) {
  const params = recursive ? { recursive: 1 } : {};
  const res = await github.get(`/repos/${owner}/${repo}/git/trees/${treeSha}`, { params });
  return res.data;
}

/**
 * Get a git blob
 */
async function getBlob(owner, repo, fileSha) {
  const res = await github.get(`/repos/${owner}/${repo}/git/blobs/${fileSha}`);
  return res.data;
}

/**
 * Create a git blob
 */
async function createBlob(owner, repo, content, encoding = 'utf-8') {
  const res = await github.post(`/repos/${owner}/${repo}/git/blobs`, {
    content,
    encoding,
  });
  return res.data;
}

export {
  getTree,
  getBlob,
  createBlob,
};
