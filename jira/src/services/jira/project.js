import jiraClient from '../jira-client.js';
import { ENDPOINTS } from '../../constants/index.js';

/**
 * Project Service
 * Handles all Jira project-related operations
 */

/**
 * Lists all accessible projects
 * @param {Object} options - Query options
 * @returns {Promise<Object>} Project list
 */
export async function listProjects(options = {}) {
  try {
    const { startAt = 0, maxResults = 50 } = options;

    const response = await jiraClient.get(ENDPOINTS.PROJECT_SEARCH, {
      params: { startAt, maxResults },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to list projects: ${error.message}`);
  }
}

/**
 * Gets details of a specific project
 * @param {string} projectIdOrKey - Project ID or key
 * @returns {Promise<Object>} Project details
 */
export async function getProject(projectIdOrKey) {
  try {
    const response = await jiraClient.get(ENDPOINTS.PROJECT_BY_KEY(projectIdOrKey));
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get project ${projectIdOrKey}: ${error.message}`);
  }
}

/**
 * Creates a new project
 * @param {Object} projectData - Project data
 * @returns {Promise<Object>} Created project
 */
export async function createProject(projectData) {
  try {
    const payload = {
      key: projectData.key,
      name: projectData.name,
      projectTypeKey: projectData.projectTypeKey,
      leadAccountId: projectData.leadAccountId,
      description: projectData.description,
    };

    const response = await jiraClient.post(ENDPOINTS.PROJECTS, payload);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create project: ${error.message}`);
  }
}

export default {
  listProjects,
  getProject,
  createProject,
};
