const QPService = require('../service/QPServiceImpl');
const { successResponse, errorResponse } = require('../utils/apiResponse');

module.exports = {
  getBySubject: async (req, res) => {
    try {
      const qps = await QPService.getBySubject(req.params.subjectId);
      res.json(successResponse({ message: 'Fetched successfully', data: qps, path: req.originalUrl }));
    } catch (e) {
      res.status(500).json(errorResponse({ message: 'Fetch failed', error: e.message, path: req.originalUrl }));
    }
  },

  createQP: async (req, res) => {
  try {
    const qp = await QPService.createQP(req.body, req.file);
    res.status(201).json(successResponse({ message: 'QP created', data: qp, path: req.originalUrl }));
  } catch (e) {
    res.status(400).json(errorResponse({ message: 'Creation failed', error: e.message, path: req.originalUrl }));
  }
},

  updateQP: async (req, res) => {
  try {
    const qp = await QPService.updateQP(req.params.qpId, req.body, req.file);
    res.json(successResponse({ message: 'QP updated', data: qp, path: req.originalUrl }));
  } catch (e) {
    res.status(400).json(errorResponse({ message: 'Update failed', error: e.message, path: req.originalUrl }));
  }
},

  deleteQP: async (req, res) => {
    try {
      await QPService.deleteQP(req.params.qpId);
      res.json(successResponse({ message: 'QP deleted', path: req.originalUrl }));
    } catch (e) {
      res.status(400).json(errorResponse({ message: 'Delete failed', error: e.message, path: req.originalUrl }));
    }
  }
};
