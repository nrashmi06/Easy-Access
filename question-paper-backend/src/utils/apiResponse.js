function successResponse({ message, data = null, path = null, status = 200 }) {
  return {
    success: true,
    message,
    data,
    path,
    status,
  };
}

function errorResponse({ message, error = null, path = null, status = 500 }) {
  return {
    success: false,
    message,
    error,
    path,
    status,
  };
}

module.exports = { successResponse, errorResponse };
