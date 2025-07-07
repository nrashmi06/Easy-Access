import { QP_PATHS } from "../../mapper/qp.paths";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

/**
 * Creates a new question paper.
 * @param {import("../../types/qp").QuestionPaperFormData} formData - The form data for the question paper.
 * @param {string} accessToken - The access token for authentication.
 * @returns {Promise<import("../../types/qp").QuestionPaperResponse>} - The response from the API.
 */
export const createQp = async (formData, accessToken) => {
  const path = QP_PATHS.ADD;

  try {
    const response = await fetchWithAuth(path, {
      method: "POST",
      body: formData,
    }, accessToken);

    const result = await response.json();

    return {
      success: response.ok,
      error: response.ok ? null : result.error || result.message || "Failed to create question paper",
      message: result.message || (response.ok ? "Question paper created successfully" : "Failed to create question paper"),
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
