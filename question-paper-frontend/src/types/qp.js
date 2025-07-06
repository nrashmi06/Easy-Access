/**
 * Represents a single Question Paper.
 * @typedef {Object} QuestionPaper
 * @property {string} _id - Unique ID of the question paper.
 * @property {string} title - Title of the paper.
 * @property {number} year - Year of the exam.
 * @property {string} type - Type of the paper (e.g., MSE, ESE).
 * @property {string} subjectName - Subject name.
 * @property {string} pdfUrl - URL to the uploaded PDF file.
 * @property {string} createdAt - Timestamp of creation.
 * @property {string} updatedAt - Timestamp of last update.
 */

/**
 * Data for getting a question paper by subject ID.
 * @typedef {Object} GetQuestionPaperBySubjectId
 * @property {string} subjectId - The ID of the subject to fetch the question paper for.
 */

/**
 * Data for deleting a question paper.
 * @typedef {Object} DeleteQuestionPaperData
 * @property {string} id - The ID of the question paper to delete.
 */

/**
 * Form data for adding or updating a question paper.
 * Used when sending multipart/form-data.
 * @typedef {Object} QuestionPaperFormData
 * @property {string} title - Title of the paper.
 * @property {number} year - Year of the paper.
 * @property {string} type - Type (e.g., MSE, ESE).
 * @property {string} subjectName - Subject name.
 * @property {File} pdf - PDF file of the paper.
 */

/**
 * Generic API Response for question paper operations.
 * @typedef {Object} QuestionPaperResponse
 * @property {boolean} success - Whether the operation was successful.
 * @property {string} [message] - Optional message from server.
 * @property {string} [error] - Error message if failed.
 * @property {QuestionPaper | null} [data] - Returned question paper data.
 * @property {string} [path] - API path used.
 */
export {};