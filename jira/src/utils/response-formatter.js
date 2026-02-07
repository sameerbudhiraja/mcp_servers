/**
 * Formats a successful response
 * @param {*} data - Response data
 * @param {string} message - Optional success message
 * @returns {Object} Formatted success response
 */
export function formatSuccess(data, message = '') {
  return {
    content: [
      {
        type: 'text',
        text: message || JSON.stringify(data, null, 2),
      },
    ],
  };
}

/**
 * Formats an error response
 * @param {Error|string} error - Error object or message
 * @returns {Object} Formatted error response
 */
export function formatError(error) {
  const errorMessage = typeof error === 'string' ? error : error.message;
  const errorDetails = typeof error === 'object' && error.response
    ? `\n\nDetails: ${JSON.stringify(error.response.data, null, 2)}`
    : '';

  return {
    content: [
      {
        type: 'text',
        text: `Error: ${errorMessage}${errorDetails}`,
      },
    ],
    isError: true,
  };
}

/**
 * Formats text response
 * @param {string} text - Text to format
 * @returns {Object} Formatted text response
 */
export function formatText(text) {
  return {
    content: [
      {
        type: 'text',
        text,
      },
    ],
  };
}

export default {
  formatSuccess,
  formatError,
  formatText,
};
