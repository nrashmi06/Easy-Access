import { forgotPassword } from "../../services/auth/forgotPassword.js";
/**
 * Handles forgot password submission.
 *
 * @param {import("../types/auth.js").ForgotPasswordFormData} formData
 * @returns {Promise<import("../types/auth.js").APIResponse>}
 */
export const forgotPasswordController = async (formData) => {
  return await forgotPassword(formData);
};
