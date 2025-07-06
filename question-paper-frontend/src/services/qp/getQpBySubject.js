import { QP_PATHS } from "../../mapper/qp.paths";

/**
 * Fetches a question paper by subject ID.
 * @param { import("../../types/qp").GetQuestionPaperBySubjectId } subjectId - The ID of the subject to fetch the question paper for.
 * @param {string} accessToken - The access token for authentication.
 * @returns {Promise<import("../../types/qp.js").QuestionPaperResponse>} - The response from the API.
 */
export const getQpBySubject = async (data, accessToken) => {
  try {
    const response = await fetch(QP_PATHS.GET_ONE(data.subjectId), {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    const result = await response.json();
    return {
      success: response.ok,
      error: response.ok ? null : result.error || result.message || "Failed to fetch question paper",
      message: result.message || (response.ok ? "Question paper fetched successfully" : "Failed to fetch question paper"),
      data: response.ok ? result.data : null,
      path: QP_PATHS.GET_ONE(data.subjectId),
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      error: error.message,
      data: [],
      path: QP_PATHS.GET_ONE(data.subjectId),
    };
};

};