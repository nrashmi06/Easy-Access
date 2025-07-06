import { AUTH_PATHS } from "../../mapper/auth.paths.js";
/**
 * @param {import('../types/auth.js').ResetPasswordData} resetData
 */
export async function resetPassword(resetData) {
  try {
    const result = await fetch(AUTH_PATHS.RESET_PASSWORD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resetData),
    });

    return {
      success: result.ok,
      error: result.ok ? null : result.error || result.message || "Login failed",
      message: result.message || (result.ok ? "Login successful" : "Login failed"),
      data: result.ok ? result.data : null,
      path : AUTH_PATHS.RESET_PASSWORD,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
      message: "Network error",
      data: null,
      path: AUTH_PATHS.RESET_PASSWORD,
    };
  }
}
