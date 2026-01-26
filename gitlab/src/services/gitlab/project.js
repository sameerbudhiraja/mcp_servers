// Project Service
// GitLab project operations

import gitlab from '../gitlab-client.js';

/**
 * List all accessible projects
 */
async function listProjects(membership = false, owned = false, starred = false) {
  try {
    const params = {};
    if (membership) params.membership = true;
    if (owned) params.owned = true;
    if (starred) params.starred = true;
    
    const res = await gitlab.get('/projects', { params });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list projects: ${error.message}`);
  }
}

/**
 * Get project details
 */
async function getProject(projectId) {
  try {
    const encodedId = encodeURIComponent(projectId);
    const res = await gitlab.get(`/projects/${encodedId}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get project ${projectId}: ${error.message}`);
  }
}

/**
 * Create a new project
 */
async function createProject(name, description = '', visibility = 'private', initializeWithReadme = false) {
  try {
    const res = await gitlab.post('/projects', {
      name,
      description,
      visibility,
      initialize_with_readme: initializeWithReadme,
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to create project ${name}: ${error.message}`);
  }
}

/**
 * List project forks
 */
async function listProjectForks(projectId) {
  try {
    const encodedId = encodeURIComponent(projectId);
    const res = await gitlab.get(`/projects/${encodedId}/forks`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to list forks for project ${projectId}: ${error.message}`);
  }
}

export {
  listProjects,
  getProject,
  createProject,
  listProjectForks,
};
