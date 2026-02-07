import jiraClient from '../jira-client.js';
import { ENDPOINTS } from '../../constants/index.js';

/**
 * Search Service
 * Handles JQL search operations
 */

/**
 * Searches for issues using JQL
 * @param {string} jql - JQL query string
 * @param {Object} options - Search options
 * @returns {Promise<Object>} Search results
 */
export async function searchIssues(jql, options = {}) {
  try {
    const {
      startAt = 0,
      maxResults = 50,
      fields = [],
    } = options;

    const payload = {
      jql,
      startAt,
      maxResults,
      fields: fields.length > 0 ? fields : ['summary', 'status', 'assignee', 'created'],
    };

    const response = await jiraClient.post(ENDPOINTS.SEARCH, payload);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to search issues: ${error.message}`);
  }
}

/**
 * Searches for issues with cursor-based pagination
 * @param {string} jql - JQL query string
 * @param {Object} options - Search options
 * @returns {Promise<Object>} Paginated search results
 */
export async function searchIssuesPaginated(jql, options = {}) {
  try {
    const {
      maxResults = 50,
      nextPageToken,
    } = options;

    const params = {
      jql,
      maxResults,
    };

    if (nextPageToken) {
      params.startAt = nextPageToken;
    }

    const response = await jiraClient.get(ENDPOINTS.SEARCH, { params });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to search issues (paginated): ${error.message}`);
  }
}

export default {
  searchIssues,
  searchIssuesPaginated,
};
