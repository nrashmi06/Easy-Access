const express = require('express');
const router = express.Router();
const QPController = require('../controller/QPController');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

// user or admin
router.get('/:subjectId', auth, QPController.getBySubject);

// admin only
router.post('/', auth, authorize('ADMIN'), upload.single('pdf'), QPController.createQP);
router.put('/:qpId', auth, authorize('ADMIN'), upload.single('pdf'), QPController.updateQP);
router.delete('/:qpId', auth, authorize('ADMIN'), QPController.deleteQP);

module.exports = router;
