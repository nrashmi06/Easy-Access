import { SUBJECT_PATHS } from "../../mapper/subject.paths";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

/**
 * Fetches all subjects from the API.
 * @param {string} accessToken - The access token for authentication.
 * @returns {Promise<import('../../types/subject.js').ApiResponse>}
 */
export const getAllSubjects = async (accessToken) => {
  const path = SUBJECT_PATHS.GET_ALL;

  try {
    const response = await fetchWithAuth(
      path,
      {
        method: "GET",
      },
      accessToken
    );

    const result = await response.json();

    return {
      success: response.ok,
      error: response.ok ? null : result.error || result.message || "Failed to fetch subjects",
      message: result.message || (response.ok ? "Subjects fetched successfully" : "Failed to fetch subjects"),
      data: response.ok ? result.data : [],
      path,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: "Network error",
      data: [],
      path,
    };
  }
};
