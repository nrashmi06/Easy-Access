import { logoutService } from "../../services/auth/logoutService";

/** * Controller for logging out the user.
 * @param {string} accessToken - The access token of the user to be logged out.
 * @returns {Promise<import("../types/auth.types.js").APIResponse>}
 */
export const logoutController = async (accessToken) => {
  const response = await logoutService(accessToken);
  return response;
};
