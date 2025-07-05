const Subject = require('../model/SubjectModel');

module.exports = {
  async findByName(name) {
    return await Subject.findOne({ name: name.trim().toLowerCase() });
  },

  async create(subjectData) {
    const name = subjectData.name.trim().toLowerCase();
    const newSubject = new Subject({ name });
    return await newSubject.save();
  },

  async findById(id) {
    return await Subject.findById(id);
  },

  async getAll() {
    return await Subject.find().sort({ name: 1 });
  },

  async update(id, newName) {
    return await Subject.findByIdAndUpdate(
      id,
      { name: newName.trim().toLowerCase() },
      { new: true }
    );
  },

  async delete(id) {
    return await Subject.findByIdAndDelete(id);
  }
};
