const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  otpSecret: {
    type: String,
    default: null
  },
  is2FAEnabled: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('User', UserSchema);
