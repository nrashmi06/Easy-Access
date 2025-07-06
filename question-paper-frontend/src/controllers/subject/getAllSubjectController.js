import { getAllSubjects } from "../../services/subject/getAllSubjects";

/** * Controller to fetch all subjects.
 *  * @param {string} accessToken - The access token for authentication.
 *  * @returns {Promise<import("../../types/subject.js").ApiResponse>}
 */
export const getAllSubjectController = async (accessToken) => {
  return await getAllSubjects(accessToken);
};
