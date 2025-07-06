import { QP_PATHS } from "../../mapper/qp.paths";
/**
 * Creates a new question paper.
 * @param {import("../../types/qp").QuestionPaperFormData} formData - The form data containing the question paper details.
 * @param {string} accessToken - The access token for authentication.
 * @returns {Promise<import("../../types/qp.js").QuestionPaperResponse>} - The response from the API.
 */

export const updateQp = async (formData, accessToken) => {
  const path = QP_PATHS.UPDATE(formData.id);

  try {
    const response = await fetch(path, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

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
