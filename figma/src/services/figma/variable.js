// Variable Service
// Figma variable-related operations

import figma from '../figma-client.js';

/**
 * Get local variables defined in a file
 */
async function getLocalVariables(key) {
  try {
    const res = await figma.get(`/v1/files/${key}/variables/local`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get local variables for file ${key}: ${error.message}`);
  }
}

/**
 * Get published variables defined in a file
 */
async function getPublishedVariables(key) {
  try {
    const res = await figma.get(`/v1/files/${key}/variables/published`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get published variables for file ${key}: ${error.message}`);
  }
}

/**
 * Create or update variables in a file
 */
async function postVariables(key, params) {
  try {
    const res = await figma.post(`/v1/files/${key}/variables`, params);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to post variables for file ${key}: ${error.message}`);
  }
}

export {
  getLocalVariables,
  getPublishedVariables,
  postVariables,
};
