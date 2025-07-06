// Load base URL from environment (fallback to localhost if not defined)
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

/**
 * Auth API Endpoints
 */
export const AUTH_PATHS = {
  SIGNUP: `${BASE_URL}/api/auth/signup`,
  LOGIN: `${BASE_URL}/api/auth/login`,
  FORGOT_PASSWORD: `${BASE_URL}/api/auth/forgot-password`,
  RESET_PASSWORD: `${BASE_URL}/api/auth/reset-password`,
  REFRESH_TOKEN: `${BASE_URL}/api/auth/refresh-token`,
  RESEND_VERIFICATION: `${BASE_URL}/api/auth/resend-verification`,
  LOGOUT: `${BASE_URL}/api/auth/logout`,
};
