import { resetPassword } from '../../services/auth/resetPassword.js';

/** * Handles the reset password submission.
 * * @param {import('../../types/auth.js').ResetPasswordData} resetData
 * * @returns {Promise<import('../../types/auth.js').AuthResponse>}
 */
export async function handleResetPassword(resetData) {
  const response = await resetPassword(resetData);
  return response;
}
