import { SUBJECT_PATHS } from "../../mapper/subject.paths";
/**
 * Fetches all subjects from the API.
 * * @param {string} accessToken - The access token for authentication.
 * @returns {Promise<import('../types/subject.js').ApiResponse>}
 */
export const getAllSubjects = async (accessToken) => {
  try {
    const response = await fetch(SUBJECT_PATHS.GET_ALL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch subjects');
    }

    return {
      success: true,
      message: 'Subjects fetched successfully',
      data: data,
      path: SUBJECT_PATHS.GET_ALL,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      error: error.message,
      data: [],
      path: SUBJECT_PATHS.GET_ALL,
    };
  }
};
