import { updateSubject } from '../../services/subject/updateSubject.js';

/** * Handles the update of a subject.
 * @param {string} accessToken - The access token for authentication.
 * @param {import('../../types/subject.js').UpdateSubjectData} formData - The data for the subject to update.
 * @returns {Promise<import("../../types/subject.js").ApiResponse>} - The response from the API.
 */
export const updateSubjectController = async (accessToken, formData) => {
  return await updateSubject(formData, accessToken);
};
