/**
 * @typedef {Object} Subject
 * @property {string} _id
 * @property {string} name
 */

/**
 * @typedef {Object} CreateSubjectData
 * @property {string} name - The name of the subject to create.
 */

/**
 * @typedef {Object} UpdateSubjectData
 * @property {string} _id - The ID of the subject to update.
 * @property {string} name - The name of the subject to update.
 */

/** * @typedef {Object} DeleteSubjectData
 * @property {string} _id - The
 * ID of the subject to delete.
 * */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {string} message
 * @property {string|null} error
 * @property {any} data
 * @property {string} path
 */

/**
 * @returns {Promise<ApiResponse>}
 */

export{};