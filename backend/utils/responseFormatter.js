/**
 * Standardized API response utility
 * Ensures consistent response format across all endpoints
 */

/**
 * @param {res} response
 * @param {data} data
 * @param {message} message
 * @param {statusCode} statusCode
 * @returns "send response with statuscode"
 */
export const sendSuccess = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Success response with pagination info
 */
export const sendPaginatedSuccess = (res, data, pagination, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    pagination,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Error response
 */
export const sendError = (res, message, statusCode = 500, code = 'ERROR', details = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    code,
    ...(details && { details }),
    timestamp: new Date().toISOString(),
  });
};
