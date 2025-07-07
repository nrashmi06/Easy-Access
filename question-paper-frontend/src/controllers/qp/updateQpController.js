import { updateQp } from "../../services/qp/updateQp";

/**
 * Controller for updating a question paper.
 * @param {import("../../types/qp").QuestionPaperFormData} formData - The form data for the question paper.
 * @param {string} accessToken - The access token for authentication.
 * @returns {Promise<import("../../types/qp").QuestionPaperResponse>} - The response from the API.
 */
export const updateQpController = async (id, formData, accessToken) => {
  return updateQp(id, formData, accessToken);
};
