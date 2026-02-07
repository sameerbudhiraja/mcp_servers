import jiraClient from '../jira-client.js';
import { ENDPOINTS } from '../../constants/index.js';

/**
 * Issue Service
 * Handles all Jira issue-related operations
 */

/**
 * Creates a new issue
 * @param {Object} issueData - Issue data
 * @returns {Promise<Object>} Created issue
 */
export async function createIssue(issueData) {
  try {
    const payload = {
      fields: {
        project: { key: issueData.projectKey },
        summary: issueData.summary,
        issuetype: { name: issueData.issueType },
      },
    };

    if (issueData.description) {
      payload.fields.description = {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: issueData.description }],
          },
        ],
      };
    }

    if (issueData.priority) {
      payload.fields.priority = { name: issueData.priority };
    }

    if (issueData.labels) {
      payload.fields.labels = issueData.labels;
    }

    if (issueData.assigneeAccountId) {
      payload.fields.assignee = { accountId: issueData.assigneeAccountId };
    }

    const response = await jiraClient.post(ENDPOINTS.ISSUES, payload);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create issue: ${error.message}`);
  }
}

/**
 * Gets details of a specific issue
 * @param {string} issueIdOrKey - Issue ID or key
 * @param {Object} options - Query options
 * @returns {Promise<Object>} Issue details
 */
export async function getIssue(issueIdOrKey, options = {}) {
  try {
    const params = {};

    if (options.fields) {
      params.fields = options.fields.join(',');
    }

    if (options.expand) {
      params.expand = options.expand.join(',');
    }

    const response = await jiraClient.get(ENDPOINTS.ISSUE_BY_KEY(issueIdOrKey), { params });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get issue ${issueIdOrKey}: ${error.message}`);
  }
}

/**
 * Updates an existing issue
 * @param {string} issueIdOrKey - Issue ID or key
 * @param {Object} updateData - Fields to update
 * @returns {Promise<Object>} Update response
 */
export async function updateIssue(issueIdOrKey, updateData) {
  try {
    const payload = { fields: {} };

    if (updateData.summary) {
      payload.fields.summary = updateData.summary;
    }

    if (updateData.description) {
      payload.fields.description = {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: updateData.description }],
          },
        ],
      };
    }

    if (updateData.priority) {
      payload.fields.priority = { name: updateData.priority };
    }

    if (updateData.labels) {
      payload.fields.labels = updateData.labels;
    }

    const response = await jiraClient.put(ENDPOINTS.ISSUE_BY_KEY(issueIdOrKey), payload);
    return response.data || { success: true };
  } catch (error) {
    throw new Error(`Failed to update issue ${issueIdOrKey}: ${error.message}`);
  }
}

/**
 * Deletes an issue
 * @param {string} issueIdOrKey - Issue ID or key
 * @param {boolean} deleteSubtasks - Delete subtasks
 * @returns {Promise<Object>} Delete response
 */
export async function deleteIssue(issueIdOrKey, deleteSubtasks = false) {
  try {
    const response = await jiraClient.delete(ENDPOINTS.ISSUE_BY_KEY(issueIdOrKey), {
      params: { deleteSubtasks: deleteSubtasks ? 'true' : 'false' },
    });
    return response.data || { success: true, message: `Issue ${issueIdOrKey} deleted` };
  } catch (error) {
    throw new Error(`Failed to delete issue ${issueIdOrKey}: ${error.message}`);
  }
}

/**
 * Assigns an issue to a user
 * @param {string} issueIdOrKey - Issue ID or key
 * @param {string} accountId - User account ID
 * @returns {Promise<Object>} Assignment response
 */
export async function assignIssue(issueIdOrKey, accountId) {
  try {
    const payload = { accountId };
    const response = await jiraClient.put(ENDPOINTS.ISSUE_ASSIGNEE(issueIdOrKey), payload);
    return response.data || { success: true };
  } catch (error) {
    throw new Error(`Failed to assign issue ${issueIdOrKey}: ${error.message}`);
  }
}

/**
 * Gets issue changelog
 * @param {string} issueIdOrKey - Issue ID or key
 * @param {Object} options - Query options
 * @returns {Promise<Object>} Changelog data
 */
export async function getIssueChangelog(issueIdOrKey, options = {}) {
  try {
    const { startAt = 0, maxResults = 50 } = options;

    const response = await jiraClient.get(ENDPOINTS.ISSUE_CHANGELOG(issueIdOrKey), {
      params: { startAt, maxResults },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get changelog for ${issueIdOrKey}: ${error.message}`);
  }
}

/**
 * Bulk creates issues
 * @param {Array} issues - Array of issue data
 * @returns {Promise<Object>} Bulk create response
 */
export async function bulkCreateIssues(issues) {
  try {
    const payload = {
      issueUpdates: issues.map((issue) => ({
        fields: {
          project: { key: issue.projectKey },
          summary: issue.summary,
          issuetype: { name: issue.issueType },
          description: issue.description ? {
            type: 'doc',
            version: 1,
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: issue.description }],
              },
            ],
          } : undefined,
        },
      })),
    };

    const response = await jiraClient.post(ENDPOINTS.BULK_CREATE_ISSUES, payload);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to bulk create issues: ${error.message}`);
  }
}

/**
 * Gets create metadata for issues
 * @param {Object} options - Query options
 * @returns {Promise<Object>} Create metadata
 */
export async function getCreateMetadata(options = {}) {
  try {
    const params = {};

    if (options.projectKeys) {
      params.projectKeys = options.projectKeys.join(',');
    }

    if (options.issueTypeNames) {
      params.issueTypeNames = options.issueTypeNames.join(',');
    }

    const response = await jiraClient.get(ENDPOINTS.CREATE_METADATA, { params });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get create metadata: ${error.message}`);
  }
}

export default {
  createIssue,
  getIssue,
  updateIssue,
  deleteIssue,
  assignIssue,
  getIssueChangelog,
  bulkCreateIssues,
  getCreateMetadata,
};
