// Comment Service
// Figma comment-related operations

import figma from '../figma-client.js';

/**
 * Get comments for a file
 */
async function getComments(key) {
  try {
    const res = await figma.get(`/v1/files/${key}/comments`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get comments for file ${key}: ${error.message}`);
  }
}

/**
 * Post a comment to a file
 */
async function postComment(key, message, clientMeta) {
  try {
    const res = await figma.post(`/v1/files/${key}/comments`, {
      message,
      client_meta: clientMeta,
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to post comment to file ${key}: ${error.message}`);
  }
}

/**
 * Delete a comment
 */
async function deleteComment(key, id) {
  try {
    const res = await figma.delete(`/v1/files/${key}/comments/${id}`);
    return res.data; // Usually 200 OK with empty body
  } catch (error) {
    throw new Error(`Failed to delete comment ${id} from file ${key}: ${error.message}`);
  }
}

export {
  getComments,
  postComment,
  deleteComment,
};
