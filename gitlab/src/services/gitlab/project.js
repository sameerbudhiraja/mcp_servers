// Project Service
// GitLab project operations

import gitlab from '../gitlab-client.js';

/**
 * List all accessible projects
 */
async function listProjects(payload) {
  try {
    const params = {};
    if (payload.membership) params.membership = true;
    if (payload.owned) params.owned = true;
    if (payload.starred) params.starred = true;
    
    const res = await gitlab.get('/projects', { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list projects: ${error.message}`);
  }
}

/**
 * Get project details
 */
async function getProject(payload) {
  try {
    const encodedId = encodeURIComponent(payload.projectId);
    const res = await gitlab.get(`/projects/${encodedId}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get project ${payload.projectId}: ${error.message}`);
  }
}

/**
 * Create a new project
 */
async function createProject(payload) {
  try {
    const res = await gitlab.post('/projects', {
      name: payload.name,
      description: payload.description,
      visibility: payload.visibility,
      initialize_with_readme: payload.initializeWithReadme,
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to create project ${payload.name}: ${error.message}`);
  }
}

/**
 * List project forks
 */
async function listProjectForks(payload) {
  try {
    const encodedId = encodeURIComponent(payload.projectId);
    const res = await gitlab.get(`/projects/${encodedId}/forks`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list forks for project ${payload.projectId}: ${error.message}`);
  }
}

export {
  listProjects,
  getProject,
  createProject,
  listProjectForks,
};
