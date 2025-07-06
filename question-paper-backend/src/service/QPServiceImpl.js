const cloudinary = require('../config/cloudinary');
const QPRepository = require('../repository/QPRepository');
const SubjectRepository = require('../repository/SubjectRepository'); // You must implement this
const QPDTO = require('../dto/QPDTO');
const QPService = require('./QPService');

class QPServiceImpl extends QPService {
  static async getBySubject(subjectId) {
    const qps = await QPRepository.findBySubject(subjectId);
    return qps.map(qp => new QPDTO(qp));
  }

  static async createQP(data, file) {
  const { title, subjectName, year, type } = data;


  if (!title || !subjectName || !year || !type) {
  throw new Error('Title, Subject, Year, and Type are required');
}

  let subject = await SubjectRepository.findByName(subjectName);
  if (!subject) {
    throw new Error('Subject not found');
  }

  const streamifier = require('streamifier');

const streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw',
        folder: 'qps',
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

const uploaded = await streamUpload(file.buffer);


  const qp = await QPRepository.create({
    title,
    year,
    type,
    subject: subject._id,
    pdfUrl: uploaded.secure_url,
    cloudinaryId: uploaded.public_id,
  });

  return new QPDTO(qp);
}

  static async updateQP(qpId, data, file) {
  const existingQP = await QPRepository.findById(qpId);
  if (!existingQP) throw new Error('QP not found');

  const updateFields = {
    title: data.title || existingQP.title,
    year: data.year || existingQP.year,
    type: data.type || existingQP.type,
  };

  // Handle subject update
  if (data.subjectName) {
    const subject = await SubjectRepository.findByName(data.subjectName);
    if (!subject) {
      throw new Error(`Subject "${data.subjectName}" not found`);
    }
    updateFields.subject = subject._id;
  }

  // Handle file (PDF) update
  if (file) {
    // Delete the old file from Cloudinary
    await cloudinary.uploader.destroy(existingQP.cloudinaryId, { resource_type: 'raw' });

    // Upload the new file
    const streamifier = require('streamifier');

const streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw',
        folder: 'qps',
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

const uploaded = await streamUpload(file.buffer);


    updateFields.pdfUrl = uploaded.secure_url;
    updateFields.cloudinaryId = uploaded.public_id;
  }

  const updatedQP = await QPRepository.update(qpId, updateFields);
  return new QPDTO(updatedQP);
}


  static async deleteQP(qpId) {
    const qp = await QPRepository.findById(qpId);
    if (!qp) throw new Error('QP not found');

    await cloudinary.uploader.destroy(qp.cloudinaryId, { resource_type: 'raw' });
    await QPRepository.delete(qpId);
  }
}

module.exports = QPServiceImpl;
