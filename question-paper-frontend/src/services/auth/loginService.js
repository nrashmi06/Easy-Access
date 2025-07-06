import { AUTH_PATHS } from "../../mapper/auth.paths.js";
// import types only for JSDoc if you're using VSCode / JSDoc linting
/**
 * @param {import('../types/auth.js').SigninFormData} data
 * @returns {Promise<import('../types/auth.js').AuthResponse>}
 */
export const loginUserService = async (data) => {
  const path = AUTH_PATHS.LOGIN;

  try {
    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    return {
      success: response.ok,
      error: response.ok ? null : result.error || result.message || "Login failed",
      message: result.message || (response.ok ? "Login successful" : "Login failed"),
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
};
