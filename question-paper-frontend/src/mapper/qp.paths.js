// Load base URL from environment (fallback to localhost if not defined)
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

/**
 * Question Paper API Endpoints
 */
export const QP_PATHS = {
  ADD: `${BASE_URL}/api/qps`,                 // POST - Add new question paper (multipart)
  UPDATE: (id) => `${BASE_URL}/api/qps/${id}`, // PUT - Update question paper by ID
  DELETE: (id) => `${BASE_URL}/api/qps/${id}`, // DELETE - Delete question paper by ID
  GET_ONE: (subjectId) => `${BASE_URL}/api/qps/subject/${subjectId}`, // GET - Fetch question paper by subject_id
};
