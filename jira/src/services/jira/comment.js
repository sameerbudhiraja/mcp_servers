import jiraClient from '../jira-client.js';
import { ENDPOINTS } from '../../constants/index.js';

/**
 * Comment Service
 * Handles all Jira comment-related operations
 */

/**
 * Adds a comment to an issue
 * @param {string} issueIdOrKey - Issue ID or key
 * @param {string} body - Comment text
 * @returns {Promise<Object>} Created comment
 */
export async function addComment(issueIdOrKey, body) {
  try {
    const payload = {
      body: {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: body }],
          },
        ],
      },
    };

    const response = await jiraClient.post(ENDPOINTS.ISSUE_COMMENTS(issueIdOrKey), payload);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to add comment to ${issueIdOrKey}: ${error.message}`);
  }
}

/**
 * Gets all comments on an issue
 * @param {string} issueIdOrKey - Issue ID or key
 * @param {Object} options - Query options
 * @returns {Promise<Object>} Comments data
 */
export async function getComments(issueIdOrKey, options = {}) {
  try {
    const { startAt = 0, maxResults = 50 } = options;

    const response = await jiraClient.get(ENDPOINTS.ISSUE_COMMENTS(issueIdOrKey), {
      params: { startAt, maxResults },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get comments for ${issueIdOrKey}: ${error.message}`);
  }
}

/**
 * Updates a comment
 * @param {string} issueIdOrKey - Issue ID or key
 * @param {string} commentId - Comment ID
 * @param {string} body - New comment text
 * @returns {Promise<Object>} Updated comment
 */
export async function updateComment(issueIdOrKey, commentId, body) {
  try {
    const payload = {
      body: {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: body }],
          },
        ],
      },
    };

    const response = await jiraClient.put(
      ENDPOINTS.ISSUE_COMMENT_BY_ID(issueIdOrKey, commentId),
      payload,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update comment ${commentId}: ${error.message}`);
  }
}

/**
 * Deletes a comment
 * @param {string} issueIdOrKey - Issue ID or key
 * @param {string} commentId - Comment ID
 * @returns {Promise<Object>} Delete response
 */
export async function deleteComment(issueIdOrKey, commentId) {
  try {
    const response = await jiraClient.delete(
      ENDPOINTS.ISSUE_COMMENT_BY_ID(issueIdOrKey, commentId),
    );
    return response.data || { success: true, message: `Comment ${commentId} deleted` };
  } catch (error) {
    throw new Error(`Failed to delete comment ${commentId}: ${error.message}`);
  }
}

export default {
  addComment,
  getComments,
  updateComment,
  deleteComment,
};
