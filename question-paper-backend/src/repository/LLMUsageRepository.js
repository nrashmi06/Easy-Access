const LLMUsage = require('../model/LLMUsageModel');

module.exports = {
  async getTodayUsage(userId) {
    const today = new Date().toISOString().split('T')[0];
    return await LLMUsage.findOne({ userId, date: today });
  },

  async incrementUsage(userId) {
    const today = new Date().toISOString().split('T')[0];
    return await LLMUsage.findOneAndUpdate(
      { userId, date: today },
      { $inc: { count: 1 } },
      { upsert: true, new: true }
    );
  }
};
