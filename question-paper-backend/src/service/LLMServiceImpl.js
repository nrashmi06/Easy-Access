const fetch = require('node-fetch');
const LLMResponseDTO = require('../dto/LLMResponseDTO');
const LLMUsageRepository = require('../repository/LLMUsageRepository');
const LLMService = require('./LLMService');

const GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error('GOOGLE_GEMINI_API_KEY is not defined in environment variables.');
}

const DAILY_LIMIT = 3;

class LLMServiceImpl extends LLMService {
  static async askLLM(userId, question) {
    const usage = await LLMUsageRepository.getTodayUsage(userId);
    if (usage && usage.count >= DAILY_LIMIT) {
      throw new Error('Daily question limit reached.');
    }

    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: question }]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('🔥 Gemini API Error:', errorText);
      throw new Error(`LLM error: ${errorText}`);
    }

    const data = await response.json();
    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      console.error('Unexpected response format:', data);
      throw new Error('Invalid Gemini response');
    }

    await LLMUsageRepository.incrementUsage(userId);
    return new LLMResponseDTO(content.trim());
  }
}

module.exports = LLMServiceImpl;
