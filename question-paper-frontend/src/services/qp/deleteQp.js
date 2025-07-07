import { QP_PATHS } from "../../mapper/qp.paths";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

/**
 * Deletes a question paper by its ID.
 * @param { import("../../types/qp").DeleteQuestionPaperData } data - The data containing the question paper ID to delete.
 * @param {string} accessToken - The access token for authentication.
 * @returns {Promise<import("../../types/qp").QuestionPaperResponse>} - The response from the API.
 */
export const deleteQp = async (data, accessToken) => {
  const path = QP_PATHS.DELETE(data.id);

  try {
    const response = await fetchWithAuth(path, {
      method: "DELETE",
    }, accessToken);

    const result = await response.json();

    return {
      success: response.ok,
      error: response.ok ? null : result.error || result.message || "Failed to delete question paper",
      message: result.message || (response.ok ? "Question paper deleted successfully" : "Failed to delete question paper"),
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
