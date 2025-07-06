// Load base URL from environment (fallback to localhost if not defined)
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

/**
 * Subject API Endpoints
 */
export const SUBJECT_PATHS = {
  GET_ALL: `${BASE_URL}/api/subjects`,
  CREATE: `${BASE_URL}/api/subjects`,
  UPDATE: (id) => `${BASE_URL}/api/subjects/${id}`,
  DELETE: (id) => `${BASE_URL}/api/subjects/${id}`,
};
