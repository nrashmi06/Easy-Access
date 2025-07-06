import { createSubject } from "../../services/subject/createSubject";
/**
 * Handles the creation of a new subject.
 * @param {string} accessToken - The access token for authentication.
 * @param {import("../../types/subject.js").CreateSubjectData} formData - The data for the new subject.
 * @returns {Promise<import("../../types/subject.js").ApiResponse>} - The response from the API.
 */
export const createSubjectController = async (accessToken, formData) => {
  return await createSubject(formData, accessToken);
};
