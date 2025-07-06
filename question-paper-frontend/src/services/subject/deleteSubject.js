import { SUBJECT_PATHS } from "../../mapper/subject.paths";
/**
 * Deletes a subject by sending a DELETE request to the API.
 * * @param {string} accessToken - The access token for authentication.
 * @param {import('../../types/subject.js').DeleteSubjectData} data - The subject data to delete.
 * * @returns {Promise<import('../types/subject.js').ApiResponse>}
 */

export const deleteSubject = async (data, accessToken) => {
  const path = SUBJECT_PATHS.DELETE;

  try {
    const response = await fetch(path, {
      method: "DELETE",
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
      error: response.ok ? null : result.error || result.message || "Failed to delete subject",
      message: result.message || (response.ok ? "Subject deleted successfully" : "Failed to delete subject"),
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
