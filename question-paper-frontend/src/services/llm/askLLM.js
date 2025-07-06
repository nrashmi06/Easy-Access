import { LLM_PATHS } from "../../mapper/llm.paths";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

/**
 * Asks a question to the LLM and retrieves the response.
 * 
 * @param { import("../../types/llm").AskQuestionPayload } data 
 * @returns {Promise<import("../../types/llm").AskQuestionResponse>} - The response from the LLM API.
 */
export const askLLM = async (data) => {
  try {
    const response = await fetchWithAuth(LLM_PATHS.ASK_QUESTION, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return {
        success: response.ok,
        error: response.ok ? null : result.error || result.message || "Failed to ask question",
        message: result.message || (response.ok ? "Question asked successfully" : "Failed to ask question"),
        data: response.ok ? result.data : null,
        path: LLM_PATHS.ASK_QUESTION,
    }
    } catch (err) { 
    return {
      success: false,
      error: err.message,
      message: "Network error",
      data: null,
      path: LLM_PATHS.ASK_QUESTION,
    };
  }
};
