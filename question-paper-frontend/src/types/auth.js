/**
 * @typedef {Object} SignupFormData
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {File|null} profile
 */

/**
 * @typedef {Object} SigninFormData
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} ForgotPasswordData
 * @property {string} email
 */

/**
 * @typedef {Object} ResetPasswordData
 * @property {string} token
 * @property {string} newPassword
 */

/**
 * @typedef {Object} ResendVerificationData
 * @property {string} email
 */


/**
 * @typedef {Object} APIResponse
 * @property {boolean} success
 * @property {string|null} error
 * @property {string} message
 * @property {any} data
 * @property {string} path
 */

export {}; // keep it a module
