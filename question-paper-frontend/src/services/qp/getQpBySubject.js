import { QP_PATHS } from "../../mapper/qp.paths";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

/**
 * Fetches a question paper by subject ID.
 * @param { import("../../types/qp").GetQuestionPaperBySubjectId } data - The object containing the subject ID.
 * @param {string} accessToken - The access token for authentication.
 * @returns {Promise<import("../../types/qp").QuestionPaperResponse>} - The response from the API.
 */
export const getQpBySubject = async (data, accessToken) => {
  const path = QP_PATHS.GET_ONE(data.subjectId);

  try {
    const response = await fetchWithAuth(path, {
      method: "GET",
    }, accessToken);

    const result = await response.json();

    return {
      success: response.ok,
      error: response.ok ? null : result.error || result.message || "Failed to fetch question paper",
      message: result.message || (response.ok ? "Question paper fetched successfully" : "Failed to fetch question paper"),
      data: response.ok ? result.data : null,
      path,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      error: error.message,
      data: [],
      path,
    };
  }
};
