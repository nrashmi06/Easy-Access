import { loginUserService } from "../../services/auth/loginService.js";

/**
 * Handles user login submission.
 *
 * @param {{ email: string, password: string }} form
 * @returns {Promise<import("../../types/auth.js").AuthResponse>}
 */
export async function handleLogin(form) {
  return await loginUserService({
    email: form.email,
    password: form.password,
  });
}
