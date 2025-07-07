import { logoutService } from "../../services/auth/logoutService";

/** * Controller for logging out the user.
 * @returns {Promise<import("../types/auth.types.js").APIResponse>}
 */
export const logoutController = async () => {
  const response = await logoutService();
  return response;
};
