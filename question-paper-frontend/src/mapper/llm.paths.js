// Load base URL from environment or default to localhost
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

/**
 * LLM API Endpoints
 */
export const LLM_PATHS = {
  ASK_QUESTION: `${BASE_URL}/api/llm/ask`,
};
