// src/middleware/upload.js
const multer = require('multer');

const storage = multer.memoryStorage(); // buffer in memory

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit (adjust if needed)
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, WEBP images or PDFs are allowed'), false);
    }
  },
});

module.exports = upload;
