import fs from 'fs';
import FormData from 'form-data';
import jiraClient from '../jira-client.js';
import { ENDPOINTS } from '../../constants/index.js';

/**
 * Attachment Service
 * Handles attachment operations
 */

/**
 * Adds an attachment to an issue
 * @param {string} issueIdOrKey - Issue ID or key
 * @param {string} filePath - Path to file
 * @returns {Promise<Object>} Attachment response
 */
export async function addAttachment(issueIdOrKey, filePath) {
  try {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    const response = await jiraClient.post(ENDPOINTS.ISSUE_ATTACHMENTS(issueIdOrKey), formData, {
      headers: {
        ...formData.getHeaders(),
        'X-Atlassian-Token': 'no-check',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to add attachment to ${issueIdOrKey}: ${error.message}`);
  }
}

/**
 * Gets attachments for an issue
 * @param {string} issueIdOrKey - Issue ID or key
 * @returns {Promise<Object>} Attachments data
 */
export async function getAttachments(issueIdOrKey) {
  try {
    const response = await jiraClient.get(ENDPOINTS.ISSUE_BY_KEY(issueIdOrKey), {
      params: { fields: 'attachment' },
    });
    return response.data.fields.attachment || [];
  } catch (error) {
    throw new Error(`Failed to get attachments for ${issueIdOrKey}: ${error.message}`);
  }
}

/**
 * Deletes an attachment
 * @param {string} attachmentId - Attachment ID
 * @returns {Promise<Object>} Delete response
 */
export async function deleteAttachment(attachmentId) {
  try {
    const response = await jiraClient.delete(ENDPOINTS.ATTACHMENT_BY_ID(attachmentId));
    return response.data || { success: true, message: `Attachment ${attachmentId} deleted` };
  } catch (error) {
    throw new Error(`Failed to delete attachment ${attachmentId}: ${error.message}`);
  }
}

export default {
  addAttachment,
  getAttachments,
  deleteAttachment,
};
