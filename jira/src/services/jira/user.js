import jiraClient from '../jira-client.js';
import { ENDPOINTS } from '../../constants/index.js';

/**
 * User Service
 * Handles user-related operations
 */

/**
 * Searches for users
 * @param {string} query - Search query
 * @param {Object} options - Query options
 * @returns {Promise<Object>} User search results
 */
export async function searchUsers(query, options = {}) {
  try {
    const { maxResults = 50 } = options;

    const response = await jiraClient.get(ENDPOINTS.USER_SEARCH, {
      params: { query, maxResults },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to search users: ${error.message}`);
  }
}

/**
 * Gets the current authenticated user
 * @returns {Promise<Object>} Current user details
 */
export async function getCurrentUser() {
  try {
    const response = await jiraClient.get(ENDPOINTS.CURRENT_USER);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get current user: ${error.message}`);
  }
}

export default {
  searchUsers,
  getCurrentUser,
};
