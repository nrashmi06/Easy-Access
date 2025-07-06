import { AUTH_PATHS } from "../../mapper/auth.paths.js";

/**
 * @param {import('../types/auth.js').SignupFormData} formDataInput
 * @returns {Promise<import('../types/auth.js').APIResponse>}
 */
export async function signupUserService(formDataInput) {
  const path = AUTH_PATHS.SIGNUP;
  console.log("Signup path:", path);

  try {
    const response = await fetch(path, {
      method: "POST",
      body: formDataInput,
    });

    const result = await response.json();

    return {
      success: response.ok,
      error: response.ok ? null : result.error || result.message || "Signup failed",
      message: result.message || (response.ok ? "Signup successful" : "Signup failed"),
      data: response.ok ? result.data : null,
      path,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
      message: "Network error",
      data: null,
      path,
    };
  }
}
