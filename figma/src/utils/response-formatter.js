// Response Formatter Utility
// Consistent response formatting for all tools

/**
 * Helper function to handle circular references in JSON.stringify
 * @returns {Function} Replacer function for JSON.stringify
 */
function getCircularReplacer() {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return '[Circular]';
      }
      seen.add(value);
    }
    return value;
  };
}

/**
 * Format successful response
 * @param {*} data - Response data
 * @param {boolean} stringify - Whether to stringify the data
 * @returns {Object} Formatted MCP response
 */
function formatSuccess(data, stringify = true) {
  const content = stringify ? JSON.stringify(data, getCircularReplacer(), 2) : data;
  
  return {
    content: [
      {
        type: 'text',
        text: content,
      },
    ],
  };
}

/**
 * Format error response
 * @param {string|Object} error - Error message or error object
 * @returns {Object} Formatted MCP error response
 */
function formatError(error) {
  const errorMessage = typeof error === 'string' ? error : error.message || 'An error occurred';
  const errorDetails = typeof error === 'object' ? error : {};

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            error: true,
            message: errorMessage,
            ...errorDetails,
          },
          getCircularReplacer(),
          2
        ),
      },
    ],
    isError: true,
  };
}

/**
 * Format list response with metadata
 * @param {Array} items - List items
 * @param {Object} metadata - Additional metadata (count, pagination, etc.)
 * @returns {Object} Formatted MCP response
 */
function formatList(items, metadata = {}) {
  return formatSuccess({
    items,
    count: items.length,
    ...metadata,
  });
}

/**
 * Format simple text response
 * @param {string} text - Text to return
 * @returns {Object} Formatted MCP response
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

export {
  formatSuccess,
  formatError,
  formatList,
  formatText,
};
