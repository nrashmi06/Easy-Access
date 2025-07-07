import { QP_PATHS } from "../../mapper/qp.paths";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

/**
 * Updates a question paper by ID.
 * @param {string} id - The ID of the question paper to update.
 * @param {import("../../types/qp").QuestionPaperFormData} formData - The form data containing the updated question paper details.
 * @param {string} accessToken - The access token for authentication.
 * @returns {Promise<import("../../types/qp.js").QuestionPaperResponse>} - The response from the API.
 */
export const updateQp = async (id, formData, accessToken) => {
  const path = QP_PATHS.UPDATE(id);

  try {
    const response = await fetchWithAuth(path, {
      method: "PUT",
      body: formData,
    }, accessToken);

    const result = await response.json();

    return {
      success: response.ok,
      error: response.ok ? null : result.error || result.message || "Failed to update question paper",
      message: result.message || (response.ok ? "Question paper updated successfully" : "Failed to update question paper"),
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
