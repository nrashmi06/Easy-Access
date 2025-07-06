import { SUBJECT_PATHS } from "../../mapper/subject.paths";
/**
 * Creates a new subject by sending a POST request to the API.
 * * @param {string} accessToken - The access token for authentication.
 * @param {import('../../types/subject.js').UpdateSubjectData} data - The subject data to create.
 * * @returns {Promise<import('../types/subject.js').ApiResponse>}
 */

export const updateSubject = async (data , accessToken) => {
  const path = SUBJECT_PATHS.UPDATE;

  try {
    const response = await fetch(path, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

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
