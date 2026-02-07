import jiraClient from '../jira-client.js';
import { ENDPOINTS } from '../../constants/index.js';

/**
 * Transition Service
 * Handles workflow transitions for issues
 */

/**
 * Gets available transitions for an issue
 * @param {string} issueIdOrKey - Issue ID or key
 * @returns {Promise<Object>} Available transitions
 */
export async function getTransitions(issueIdOrKey) {
  try {
    const response = await jiraClient.get(ENDPOINTS.ISSUE_TRANSITIONS(issueIdOrKey));
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get transitions for ${issueIdOrKey}: ${error.message}`);
  }
}

/**
 * Transitions an issue to a new status
 * @param {string} issueIdOrKey - Issue ID or key
 * @param {string} transitionId - Transition ID
 * @param {Object} options - Additional options
 * @returns {Promise<Object>} Transition response
 */
export async function transitionIssue(issueIdOrKey, transitionId, options = {}) {
  try {
    const payload = {
      transition: { id: transitionId },
    };

    if (options.comment) {
      payload.update = {
        comment: [
          {
            add: {
              body: {
                type: 'doc',
                version: 1,
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: options.comment }],
                  },
                ],
              },
            },
          },
        ],
      };
    }

    if (options.fields) {
      payload.fields = options.fields;
    }

    const response = await jiraClient.post(ENDPOINTS.ISSUE_TRANSITIONS(issueIdOrKey), payload);
    return response.data || { success: true, message: `Issue ${issueIdOrKey} transitioned` };
  } catch (error) {
    throw new Error(`Failed to transition issue ${issueIdOrKey}: ${error.message}`);
  }
}

export default {
  getTransitions,
  transitionIssue,
};
