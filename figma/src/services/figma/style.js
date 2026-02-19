// Style Service
// Figma style-related operations

import figma from '../figma-client.js';

/**
 * Get published styles in a file
 */
async function getFileStyles(key) {
  try {
    const res = await figma.get(`/v1/files/${key}/styles`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get styles for file ${key}: ${error.message}`);
  }
}

/**
 * Get published styles in a team
 */
async function getTeamStyles(teamId) {
  try {
    const res = await figma.get(`/v1/teams/${teamId}/styles`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get styles for team ${teamId}: ${error.message}`);
  }
}

/**
 * Get a specific published style
 */
async function getStyle(key) {
  try {
    const res = await figma.get(`/v1/styles/${key}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get style ${key}: ${error.message}`);
  }
}

export {
  getFileStyles,
  getTeamStyles,
  getStyle,
};
