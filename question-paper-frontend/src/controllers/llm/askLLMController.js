import { askLLM } from "../../services/llm/askLLM";
/**
 * Controller for asking a question to the LLM.
 * @param {import("../../types/llm").AskQuestionPayload} data - The data containing the question and other parameters.
 * @param {string} accessToken - The access token for authentication.
 * @returns {Promise<import("../../types/llm").AskQuestionResponse>} - The response from the LLM API.
 */
export const askLLMController = async (data, accessToken) => {
  return askLLM(data, accessToken);
};
