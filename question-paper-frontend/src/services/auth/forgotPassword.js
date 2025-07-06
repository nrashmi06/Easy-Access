import { AUTH_PATHS } from "../../mapper/auth.paths.js";

/**
 * @param {import('../types/auth.js').ForgotPasswordFormData} formDataInput
 */
export const forgotPassword = async (formDataInput) => {
  try {
    const response = await fetch(AUTH_PATHS.FORGOT_PASSWORD, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataInput),
    });

    const result = await response.json();

    return {
      success: response.ok,
      error: response.ok ? null : result.error || result.message || "Forgot password failed",
      message: result.message || (response.ok ? "Forgot password successful" : "Forgot password failed"),
      data: response.ok ? result.data : null,
      path: AUTH_PATHS.FORGOT_PASSWORD,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
      message: "Network error",
      data: null,
      path: AUTH_PATHS.FORGOT_PASSWORD,
    };
  }
};
