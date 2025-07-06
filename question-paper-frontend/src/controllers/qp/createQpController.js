import { createQp } from "../../services/qp/createQp";
/**
 * Controller for creating a new question paper.
 * @param {import("../../types/qp").QuestionPaperFormData} formData - The form data for the question paper.
 * @param {string} accessToken - The access token for authentication.
 * @returns {Promise<import("../../types/qp").QuestionPaperResponse>} - The response from the API.
 */
export const createQpController = async (formData, accessToken) => {
  return createQp(formData, accessToken);
};
