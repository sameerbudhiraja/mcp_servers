// Figma API Client
// Configured axios instance for Figma API requests

import axios from 'axios';
import config from '../config/index.js';
import { logger } from '../utils/index.js';

const figmaClient = axios.create({
  baseURL: config.figma.baseUrl,
  timeout: config.figma.timeout,
  headers: {
    'X-Figma-Token': config.figma.token,
    Accept: 'application/json',
  },
});

// Request interceptor for logging
figmaClient.interceptors.request.use(
  (requestConfig) => {
    logger.debug(`Figma API Request: ${requestConfig.method?.toUpperCase()} ${requestConfig.url}`);
    return requestConfig;
  },
  (error) => {
    logger.error('Figma API Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle circular references and clean data
figmaClient.interceptors.response.use(
  (response) => {
    // Deep clone the data to ensure no circular references
    const clonedData = JSON.parse(JSON.stringify(response.data || {}));
    
    return {
      data: clonedData,
      status: response.status,
      statusText: response.statusText,
      headers: {},
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
      
      logger.error(
        `Figma API Error: ${error.response.status} ${error.response.statusText}`,
        { data: error.response.data }
      );
    } else {
      logger.error('Figma API Network/Request Error:', error.message);
    }
    
    return Promise.reject(cleanError);
  }
);

export default figmaClient;
