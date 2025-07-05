const cron = require('node-cron');
const LLMUsage = require('../model/LLMUsageModel');

// Runs every day at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    console.log('Running daily cleanup job...');
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    await LLMUsage.deleteMany({ date: { $lt: yesterday.toISOString().split('T')[0] } });
    console.log('Old usage records deleted');
  } catch (error) {
    console.error('Cleanup job failed:', error.message);
  }
});
