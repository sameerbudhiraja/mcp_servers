import jiraClient from '../jira-client.js';
import { ENDPOINTS } from '../../constants/index.js';

/**
 * Worklog Service
 * Handles time tracking/worklog operations
 */

/**
 * Adds a worklog entry to an issue
 * @param {string} issueIdOrKey - Issue ID or key
 * @param {Object} worklogData - Worklog data
 * @returns {Promise<Object>} Created worklog
 */
export async function addWorklog(issueIdOrKey, worklogData) {
  try {
    const payload = {
      timeSpent: worklogData.timeSpent,
    };

    if (worklogData.comment) {
      payload.comment = {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: worklogData.comment }],
          },
        ],
      };
    }

    if (worklogData.started) {
      payload.started = worklogData.started;
    }

    const response = await jiraClient.post(ENDPOINTS.ISSUE_WORKLOGS(issueIdOrKey), payload);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to add worklog to ${issueIdOrKey}: ${error.message}`);
  }
}

/**
 * Gets worklogs for an issue
 * @param {string} issueIdOrKey - Issue ID or key
 * @returns {Promise<Object>} Worklogs data
 */
export async function getWorklogs(issueIdOrKey) {
  try {
    const response = await jiraClient.get(ENDPOINTS.ISSUE_WORKLOGS(issueIdOrKey));
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get worklogs for ${issueIdOrKey}: ${error.message}`);
  }
}

/**
 * Deletes a worklog entry
 * @param {string} issueIdOrKey - Issue ID or key
 * @param {string} worklogId - Worklog ID
 * @returns {Promise<Object>} Delete response
 */
export async function deleteWorklog(issueIdOrKey, worklogId) {
  try {
    const response = await jiraClient.delete(ENDPOINTS.WORKLOG_BY_ID(issueIdOrKey, worklogId));
    return response.data || { success: true, message: `Worklog ${worklogId} deleted` };
  } catch (error) {
    throw new Error(`Failed to delete worklog ${worklogId}: ${error.message}`);
  }
}

export default {
  addWorklog,
  getWorklogs,
  deleteWorklog,
};
