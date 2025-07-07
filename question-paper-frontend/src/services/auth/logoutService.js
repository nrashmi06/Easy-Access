import { AUTH_PATHS } from "../../mapper/auth.paths.js";
import { fetchWithAuth } from "../../utils/fetchWithAuth.js";

export const logoutService = async () => {
  try {
    const response = await fetchWithAuth(AUTH_PATHS.LOGOUT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json" // ONLY this
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Logout failed");
    }

    return {
      success: true,
      message: data.message,
      error: null,
      data: data.data || null,
      path: AUTH_PATHS.LOGIN,
    };
  } catch (error) {
    console.error("Logout error:", error);
    return {
      success: false,
      message: error.message || "Logout failed",
      error,
      data: null,
      path: AUTH_PATHS.LOGIN,
    };
  }
};
