import { AUTH_PATHS } from "../../mapper/auth.paths";

/**
 * @param { import("../../types/auth").ResendVerificationData } data
 * @returns {Promise<import("../../types/auth").APIResponse>}
 */

export async function resendVerification(data) {
  try {
    const response = await fetch(AUTH_PATHS.RESEND_VERIFICATION, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to resend verification email",
        message: errorData.message || "An error occurred",
        data: null, 
        path: AUTH_PATHS.RESEND_VERIFICATION,
      };
    }
    const responseData = await response.json();
    return {        
      success: true,
      error: null,
      message: responseData.message || "Verification email resent successfully",
      data: responseData.data || null,
      path: AUTH_PATHS.RESEND_VERIFICATION,
    };
  } catch (error) { 
    console.error("Resend verification error:", error);
    return {
      success: false,
      error: error.message || "Network error",
      message: "Failed to resend verification email",
      data: null,
      path: AUTH_PATHS.RESEND_VERIFICATION,
    };
  }
}