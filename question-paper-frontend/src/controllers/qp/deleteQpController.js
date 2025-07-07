import {deleteQp} from "../../services/qp/deleteQp";

/**
 * Controller for deleting a question paper.
 * * @param {import("../../types/qp").DeleteQuestionPaperData} data - The data containing the question paper ID to delete.
 * @param {string} accessToken - The access token for authentication.
 * @returns {Promise<import("../../types/qp").QuestionPaperResponse>} - The response from the API.
 */
export const deleteQpController = async (data, accessToken) => {
  return deleteQp(data, accessToken);
};
