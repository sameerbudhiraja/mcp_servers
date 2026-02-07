import axios from 'axios';
import config from '../config/index.js';
import { logger } from '../utils/index.js';

/**
 * Create Jira API client with axios
 * Configured with authentication and interceptors
 */
const jiraClient = axios.create({
  baseURL: config.jira.baseUrl,
  timeout: config.jira.timeout,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    // Basic Authentication: email + API token (base64 encoded)
    Authorization: `Basic ${Buffer.from(
      `${config.jira.email}:${config.jira.apiToken}`,
    ).toString('base64')}`,
  },
});

/**
 * Request interceptor
 * Logs outgoing requests
 */
jiraClient.interceptors.request.use(
  (requestConfig) => {
    logger.debug(`Jira API Request: ${requestConfig.method?.toUpperCase()} ${requestConfig.url}`);
    return requestConfig;
  },
  (error) => {
    logger.error('Request interceptor error:', error);
    return Promise.reject(error);
  },
);

/**
 * Response interceptor
 * Handles response formatting and error handling
 */
jiraClient.interceptors.response.use(
  (response) => {
    // Deep clone the data to ensure no circular references
    const clonedData = JSON.parse(JSON.stringify(response.data));

    return {
      data: clonedData,
      status: response.status,
      statusText: response.statusText,
      headers: {}, // Simplified to avoid potential issues
    };
  },
  (error) => {
    // Create clean error object
    const cleanError = new Error(error.message);

    if (error.response) {
      cleanError.response = {
        data: JSON.parse(JSON.stringify(error.response.data || {})),
        status: error.response.status,
        statusText: error.response.statusText,
      };

      logger.error(
        `Jira API Error: ${error.response.status} ${error.response.statusText}`,
        { data: error.response.data },
      );
    } else {
      logger.error('Jira API Network Error:', error.message);
    }

    return Promise.reject(cleanError);
  },
);

export default jiraClient;
