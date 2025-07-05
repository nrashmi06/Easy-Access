const mongoose = require('mongoose');

const LLMUsageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // format: YYYY-MM-DD
  count: { type: Number, default: 0 }
});

LLMUsageSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('LLMUsage', LLMUsageSchema);
