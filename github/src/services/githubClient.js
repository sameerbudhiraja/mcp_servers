/**
 * GitHub API Client
 * Configured axios instance for GitHub API requests
 */

import axios from 'axios';
import 'dotenv/config';
import config from '../config/index.js';

const github = axios.create({
  baseURL: config.github.baseUrl,
  timeout: config.github.timeout,
  headers: {
    Authorization: `Bearer ${config.github.token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': config.github.apiVersion,
  },
});

// Add response interceptor to handle circular references
// This ensures we only work with the data property and avoid circular refs in axios internals
github.interceptors.response.use(
  (response) => {
    // Deep clone the data to ensure no circular references
    // This completely breaks any references to the original response object
    const clonedData = JSON.parse(JSON.stringify(response.data));
    
    return {
      data: clonedData,
      status: response.status,
      statusText: response.statusText,
      headers: {},  // Simplified - don't include headers to avoid any potential issues
    };
  },
  (error) => {
    // For errors, create a completely clean error object
    const cleanError = new Error(error.message);
    
    if (error.response) {
      cleanError.response = {
        data: JSON.parse(JSON.stringify(error.response.data || {})),
        status: error.response.status,
        statusText: error.response.statusText,
      };
    }
    
    return Promise.reject(cleanError);
  }
);

export default github;
