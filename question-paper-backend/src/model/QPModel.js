const mongoose = require('mongoose');

const QPSchema = new mongoose.Schema({
  title: { type: String, required: true },
  pdfUrl: { type: String, required: true },
  cloudinaryId: { type: String, required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  year: { type: Number, required: true },
  type: {
    type: String,
    enum: ['MCQ', 'MSE', 'SEE'],
    required: true, 
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('QP', QPSchema);
