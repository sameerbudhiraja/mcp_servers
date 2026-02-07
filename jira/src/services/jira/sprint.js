import jiraClient from '../jira-client.js';
import { ENDPOINTS } from '../../constants/index.js';

/**
 * Sprint Service
 * Handles sprint/agile operations
 */

/**
 * Gets sprint details
 * @param {number} sprintId - Sprint ID
 * @returns {Promise<Object>} Sprint details
 */
export async function getSprint(sprintId) {
  try {
    const response = await jiraClient.get(ENDPOINTS.SPRINT(sprintId));
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get sprint ${sprintId}: ${error.message}`);
  }
}

/**
 * Gets issues in a sprint
 * @param {number} sprintId - Sprint ID
 * @param {Object} options - Query options
 * @returns {Promise<Object>} Sprint issues
 */
export async function getSprintIssues(sprintId, options = {}) {
  try {
    const { startAt = 0, maxResults = 50 } = options;

    const response = await jiraClient.get(ENDPOINTS.SPRINT_ISSUES(sprintId), {
      params: { startAt, maxResults },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get issues for sprint ${sprintId}: ${error.message}`);
  }
}

export default {
  getSprint,
  getSprintIssues,
};
