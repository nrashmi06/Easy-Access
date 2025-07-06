import { resendVerification } from "../../services/auth/resendVerification";

/**
 * @param { import("../../types/auth").ResendVerificationData } data
 * @returns {Promise<import("../../types/auth").APIResponse>}
 */
export async function resendVerificationController(data) {
  return await resendVerification(data);
}
