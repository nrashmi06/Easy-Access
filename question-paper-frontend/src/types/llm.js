/**
 * Payload for asking a question via LLM API.
 * @typedef {Object} AskQuestionPayload
 * @property {string} userId - The ID of the user asking the question.
 * @property {string} question - The question being asked.
 */

/**
 * Response returned by the LLM ask question API.
 * @typedef {Object} AskQuestionResponse
 * @property {boolean} success - Indicates if the request was successful.
 * @property {string} [message] - Informational or error message.
 * @property {string|null} [error] - Error message if applicable.
 * @property {any} [data] - Response data from the LLM (answer or context).
 */
