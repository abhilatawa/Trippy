const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['traveler', 'agent', 'admin'],
    default: 'traveler',
  },
  agency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agency',
    required: function () {
      return this.role === 'agent';
    },
  },
  isApproved: {
    type: Boolean,
    default: function () {
      return this.role !== 'agent';
    },
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
  },
  username: {
    type: String,
  },
  website: {
    type: String,
  },
  contact: {
    type: String,
  },
  bio: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

module.exports = mongoose.model('User', userSchema);
