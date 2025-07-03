const User = require('../model/User');
module.exports = {
  create: (data) => User.create(data),
  findByEmail: (email) => User.findOne({ email }),
  findById: (id) => User.findById(id),
  updatePassword: (email, password) => User.findOneAndUpdate({ email }, { password }),
  setResetToken: (email, token, expiry) => User.findOneAndUpdate({ email }, { resetToken: token, resetTokenExpiry: expiry }),
  findByResetToken: (token) => User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } }),
};