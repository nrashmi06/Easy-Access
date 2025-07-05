const SubjectService = require('../service/SubjectServiceImpl');
const { successResponse, errorResponse } = require('../utils/apiResponse');

module.exports = {
  getAll: async (req, res) => {
    try {
      const subjects = await SubjectService.getAll();
      res.json(successResponse({ message: 'Subjects fetched', data: subjects, path: req.originalUrl }));
    } catch (e) {
      res.status(500).json(errorResponse({ message: 'Failed to fetch subjects', error: e.message, path: req.originalUrl }));
    }
  },

  create: async (req, res) => {
    try {
      const subject = await SubjectService.create(req.body);
      res.status(201).json(successResponse({ message: 'Subject created', data: subject, path: req.originalUrl }));
    } catch (e) {
      res.status(400).json(errorResponse({ message: 'Create failed', error: e.message, path: req.originalUrl }));
    }
  },

  update: async (req, res) => {
    try {
      const updated = await SubjectService.update(req.params.id, req.body.name);
      res.json(successResponse({ message: 'Subject updated', data: updated, path: req.originalUrl }));
    } catch (e) {
      res.status(400).json(errorResponse({ message: 'Update failed', error: e.message, path: req.originalUrl }));
    }
  },

  delete: async (req, res) => {
    try {
      await SubjectService.delete(req.params.id);
      res.json(successResponse({ message: 'Subject deleted', path: req.originalUrl }));
    } catch (e) {
      res.status(400).json(errorResponse({ message: 'Delete failed', error: e.message, path: req.originalUrl }));
    }
  }
};
