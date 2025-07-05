const QP = require('../model/QPModel');

module.exports = {
  async findBySubject(subjectId) {
    return await QP.find({ subject: subjectId }).populate('subject');
  },

  async findById(id) {
    return await QP.findById(id).populate('subject');
  },

  async create(qpData) {
    return await QP.create(qpData);
  },

  async update(id, data) {
    return await QP.findByIdAndUpdate(id, data, { new: true });
  },

  async delete(id) {
    return await QP.findByIdAndDelete(id);
  }
};
