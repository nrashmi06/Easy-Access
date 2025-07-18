const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String, default: '' },               // URL from Cloudinary
  profileCloudinaryId: { type: String, default: '' },        // <-- ✅ Add this line
  isActive: { type: Boolean, default: false },
  emailVerificationToken: { type: String },
  emailVerificationTokenExpiry: { type: Date },
  resetToken: String,
  resetTokenExpiry: Date,
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
  },
  refreshToken: { type: String },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
