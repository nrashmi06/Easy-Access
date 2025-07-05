const express = require('express');
const router = express.Router();
const LLMController = require('../controller/LLMController');
const auth = require('../middleware/auth');

router.post('/ask', auth, LLMController.ask);

module.exports = router;
