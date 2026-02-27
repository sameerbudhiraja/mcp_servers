// User Service
// Figma user-related operations

import figma from '../figma-client.js';

/**
 * Get information about the authenticated user
 */
async function getCurrentUser() {
  try {
    const res = await figma.get('/v1/me');
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get current user: ${error.message}`);
  }
}

export {
  getCurrentUser,
};
