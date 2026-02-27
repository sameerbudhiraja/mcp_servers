// File Service
// Figma file-related operations

import figma from '../figma-client.js';

/**
 * Get file content
 */
async function getFile(key, options = {}) {
  try {
    const res = await figma.get(`/v1/files/${key}`, { params: options });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get file ${key}: ${error.message}`);
  }
}

/**
 * Get file nodes
 */
async function getFileNodes(key, ids, options = {}) {
  try {
    const res = await figma.get(`/v1/files/${key}/nodes`, { 
      params: { ids, ...options } 
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get nodes for file ${key}: ${error.message}`);
  }
}

/**
 * Get images rendered from nodes
 */
async function getImages(key, ids, options = {}) {
  try {
    const res = await figma.get(`/v1/images/${key}`, { 
      params: { ids, ...options } 
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get images for file ${key}: ${error.message}`);
  }
}

/**
 * Get public URLs for image fills
 */
async function getImageFills(key) {
  try {
    const res = await figma.get(`/v1/files/${key}/images`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get image fills for file ${key}: ${error.message}`);
  }
}

/**
 * Get file version history
 */
async function getFileVersions(key) {
  try {
    const res = await figma.get(`/v1/files/${key}/versions`);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to get versions for file ${key}: ${error.message}`);
  }
}

export {
  getFile,
  getFileNodes,
  getImages,
  getImageFills,
  getFileVersions,
};
