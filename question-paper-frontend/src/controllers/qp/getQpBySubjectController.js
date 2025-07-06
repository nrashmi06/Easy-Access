import { getQpBySubject } from "../../services/qp/getQpBySubject";

/**
 * Controller for getting question papers by subject.
 * @param {import("../../types/qp").GetQuestionPaperBySubjectId} data - The data containing the subject ID.
 * @param {string} accessToken - The access token for authentication.
 * @returns {Promise<import("../../types/qp").QuestionPaperResponse>} - The response from the API.
 */
export const getQpBySubjectController = async (data, accessToken) => {
  return getQpBySubject(data, accessToken);
};
