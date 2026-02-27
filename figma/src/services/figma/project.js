// Project Service
// Figma project-related operations

import figma from '../figma-client.js';

/**
 * Get all projects within a specified team
 */
async function getTeamProjects(teamId) {
  try {
    const res = await figma.get(`/v1/teams/${teamId}/projects`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get projects for team ${teamId}: ${error.message}`);
  }
}

/**
 * Get all files within a specified project
 */
async function getProjectFiles(projectId) {
  try {
    const res = await figma.get(`/v1/projects/${projectId}/files`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get files for project ${projectId}: ${error.message}`);
  }
}

export {
  getTeamProjects,
  getProjectFiles,
};
