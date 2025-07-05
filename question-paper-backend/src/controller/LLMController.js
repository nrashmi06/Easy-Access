const LLMServiceImpl = require('../service/LLMServiceImpl');
const { successResponse, errorResponse } = require('../utils/apiResponse');

module.exports = {
  ask: async (req, res) => {
    try {
      const userId = req.user.id; // assuming req.user is set by auth middleware
      const { question } = req.body;
      if (!question) throw new Error('Question is required');

      const response = await LLMServiceImpl.askLLM(userId, question);
      res.json(successResponse({ message: 'LLM answered', data: response, path: req.originalUrl }));
    } catch (e) {
      res.status(400).json(errorResponse({ message: 'Failed to query LLM', error: e.message, path: req.originalUrl }));
    }
  }
};
