import { signupUserService } from "../../services/auth/signupUser.js";

/**
 * Handles user signup submission.
 *
 * @param {import("../types/auth.types.js").SignupFormData} form
 * @returns {Promise<import("../types/auth.types.js").APIResponse>}
 */
// registerController.js
export async function handleSignup(formData) {
  // Check if it's actually FormData
  if (!(formData instanceof FormData)) {
    throw new Error("Expected FormData in handleSignup");
  }

  const profileFile = formData.get("profile");
  console.log("profile file from FormData:", profileFile);

  // forward to service
  return await signupUserService(formData);
}
