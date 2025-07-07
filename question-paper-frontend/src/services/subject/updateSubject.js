import { SUBJECT_PATHS } from "../../mapper/subject.paths";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

/**
 * Updates a subject by sending a PUT request to the API.
 * @param {import('../../types/subject.js').UpdateSubjectData} data - The subject data to update.
 * @param {string} accessToken - The access token for authentication.
 * @returns {Promise<import('../../types/subject.js').ApiResponse>}
 */
export const updateSubject = async (data, accessToken) => {
  const path = SUBJECT_PATHS.UPDATE(data._id);

  try {
    const response = await fetchWithAuth(
      path,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
      accessToken
    );

    const result = await response.json();

    return {
      success: response.ok,
      error: response.ok ? null : result.error || result.message || "Failed to update subject",
      message: result.message || (response.ok ? "Subject updated successfully" : "Failed to update subject"),
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
