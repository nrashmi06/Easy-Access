const express = require('express');
const router = express.Router();
const SubjectController = require('../controller/SubjectController');
const auth = require('../middleware/auth'); // Validates token
const authorize = require('../middleware/authorize'); // Checks role

// Public: Get all subjects (no auth required)
router.get('/', SubjectController.getAll);

// Admin only: Create, Update, Delete
router.post('/', auth, authorize('ADMIN'), SubjectController.create);
router.put('/:id', auth, authorize('ADMIN'), SubjectController.update);
router.delete('/:id', auth, authorize('ADMIN'), SubjectController.delete);

module.exports = router;
