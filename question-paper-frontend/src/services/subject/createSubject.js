import { SUBJECT_PATHS } from "../../mapper/subject.paths";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

/**
 * Creates a new subject by sending a POST request to the API.
 * @param {import('../../types/subject.js').CreateSubjectData} data - The subject data to create.
 * @param {string} accessToken - The access token for authentication.
 * @returns {Promise<import('../../types/subject.js').ApiResponse>}
 */
export const createSubject = async (data, accessToken) => {
  const path = SUBJECT_PATHS.CREATE;

  try {
    const response = await fetchWithAuth(
      path,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
      accessToken
    );

    const result = await response.json();

    return {
      success: response.ok,
      error: response.ok ? null : result.error || result.message || "Failed to create subject",
      message: result.message || (response.ok ? "Subject created successfully" : "Failed to create subject"),
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
