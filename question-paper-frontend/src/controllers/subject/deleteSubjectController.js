import { deleteSubject } from '../../services/subject/deleteSubject.js';
/**
 * Handles the deletion of a subject.
 * @param {string} accessToken - The access token for authentication.
 * @param { import("../../types/subject.js").DeleteSubjectData} formData - The data for the subject to delete.
 * @returns {Promise<import("../../types/subject.js").ApiResponse>} - The response from the API.
 */
export const deleteSubjectController = async (accessToken, formData) => {
  return await deleteSubject(formData, accessToken);
};
