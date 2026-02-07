import jiraClient from '../jira-client.js';
import { ENDPOINTS } from '../../constants/index.js';

/**
 * Filter Service
 * Handles saved filter operations
 */

/**
 * Gets saved filters
 * @param {Object} options - Query options
 * @returns {Promise<Object>} Filters data
 */
export async function getFilters(options = {}) {
  try {
    const params = {};

    if (options.expand) {
      params.expand = options.expand;
    }

    if (options.maxResults) {
      params.maxResults = options.maxResults;
    }

    const response = await jiraClient.get(ENDPOINTS.FILTERS, { params });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get filters: ${error.message}`);
  }
}

/**
 * Searches for issues using a saved filter
 * @param {string} filterId - Filter ID
 * @param {Object} options - Query options
 * @returns {Promise<Object>} Search results
 */
export async function searchByFilter(filterId, options = {}) {
  try {
    const { startAt = 0, maxResults = 50 } = options;

    // Get the filter to obtain its JQL
    const filterResponse = await jiraClient.get(ENDPOINTS.FILTER_BY_ID(filterId));
    const { jql } = filterResponse.data;

    // Execute the search using the filter's JQL
    const response = await jiraClient.post(ENDPOINTS.SEARCH, {
      jql,
      startAt,
      maxResults,
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to search by filter ${filterId}: ${error.message}`);
  }
}

export default {
  getFilters,
  searchByFilter,
};
