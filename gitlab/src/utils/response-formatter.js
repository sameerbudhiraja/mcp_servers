// Response Formatter Utility
// Standardized response formatting for MCP tools

/**
 * Format successful response
 * @param {any} data - Response data
 * @returns {Object} Formatted success response
 */
function formatSuccess(data) {
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

/**
 * Format error response
 * @param {Error|Object} error - Error object or formatted error
 * @returns {Object} Formatted error response
 */
function formatError(error) {
  const errorMessage = error.message || error.error || 'An error occurred';
  const errorDetails = error.details || error;

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            error: true,
            message: errorMessage,
            details: errorDetails,
          },
          null,
          2
        ),
      },
    ],
    isError: true,
  };
}

/**
 * Format text-only response
 * @param {string} text - Text content
 * @returns {Object} Formatted text response
 */
function formatText(text) {
  return {
    content: [
      {
        type: 'text',
        text,
      },
    ],
  };
}

export { formatSuccess, formatError, formatText };
