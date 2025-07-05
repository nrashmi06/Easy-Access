const SubjectRepository = require('../repository/SubjectRepository');
const SubjectService = require('./SubjectService');
const QPRepository = require('../repository/QPRepository'); 

class SubjectServiceImpl extends SubjectService {
  static async getAll() {
    return await SubjectRepository.getAll();
  }

  static async create(data) {
    const name = data.name?.trim().toLowerCase();
    if (!name) throw new Error('Subject name is required');

    const existing = await SubjectRepository.findByName(name);
    if (existing) throw new Error('Subject already exists');

    return await SubjectRepository.create({ name });
  }

  static async update(id, name) {
    if (!name) throw new Error('New name is required');

    const updated = await SubjectRepository.update(id, name);
    if (!updated) throw new Error('Subject not found');

    return updated;
  }

  static async delete(id) {
  // Check if any QPs use this subject
  const qpsUsingSubject = await QPRepository.findBySubject(id);
  if (qpsUsingSubject.length > 0) {
    throw new Error('Cannot delete subject: It is used in one or more question papers');
  }

  const deleted = await SubjectRepository.delete(id);
  if (!deleted) throw new Error('Subject not found');
}
}
module.exports = SubjectServiceImpl;
