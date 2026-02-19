// Webhook Service
// Figma webhook-related operations

import figma from '../figma-client.js';

/**
 * Create a new webhook
 */
async function createWebhook(teamId, eventType, endpoint, passcode, description) {
  try {
    const res = await figma.post('/v2/webhooks', {
      team_id: teamId,
      event_type: eventType,
      endpoint,
      passcode,
      description,
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to create webhook: ${error.message}`);
  }
}

/**
 * Get a specific webhook
 */
async function getWebhook(id) {
  try {
    const res = await figma.get(`/v2/webhooks/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get webhook ${id}: ${error.message}`);
  }
}

/**
 * Update an existing webhook
 */
async function updateWebhook(id, data) {
  try {
    const res = await figma.put(`/v2/webhooks/${id}`, data);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to update webhook ${id}: ${error.message}`);
  }
}

/**
 * Delete a specific webhook
 */
async function deleteWebhook(id) {
  try {
    const res = await figma.delete(`/v2/webhooks/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to delete webhook ${id}: ${error.message}`);
  }
}

/**
 * Get all webhooks in a team
 */
async function getTeamWebhooks(teamId) {
  try {
    const res = await figma.get(`/v2/teams/${teamId}/webhooks`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get webhooks for team ${teamId}: ${error.message}`);
  }
}

export {
  createWebhook,
  getWebhook,
  updateWebhook,
  deleteWebhook,
  getTeamWebhooks,
};
