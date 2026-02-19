// Component Service
// Figma component-related operations

import figma from '../figma-client.js';

/**
 * Get published components in a file
 */
async function getFileComponents(key) {
  try {
    const res = await figma.get(`/v1/files/${key}/components`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get components for file ${key}: ${error.message}`);
  }
}

/**
 * Get published components in a team
 */
async function getTeamComponents(teamId) {
  try {
    const res = await figma.get(`/v1/teams/${teamId}/components`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get components for team ${teamId}: ${error.message}`);
  }
}

/**
 * Get a specific published component
 */
async function getComponent(key) {
  try {
    const res = await figma.get(`/v1/components/${key}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get component ${key}: ${error.message}`);
  }
}

/**
 * Get published component sets in a team
 */
async function getTeamComponentSets(teamId) {
  try {
    const res = await figma.get(`/v1/teams/${teamId}/component_sets`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get component sets for team ${teamId}: ${error.message}`);
  }
}

/**
 * Get a specific published component set
 */
async function getComponentSet(key) {
  try {
    const res = await figma.get(`/v1/component_sets/${key}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get component set ${key}: ${error.message}`);
  }
}

export {
  getFileComponents,
  getTeamComponents,
  getComponent,
  getTeamComponentSets,
  getComponentSet,
};
