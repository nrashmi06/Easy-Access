module.exports = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const expectedKey = process.env.LLM_API_KEY;

  if (!apiKey || apiKey !== expectedKey) {
    return res.status(401).json({ success: false, message: 'Invalid API key' });
  }

  next();
};
