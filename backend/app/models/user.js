const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  mobile: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  profile: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  isDelete: {
    type: Boolean,
    default: false
  },
  permission: {
    type: Array,
    default: null
  },
  last_login: {
    type: Date, // Using `Date` to store timestamps instead of `String`
    default: null
  },
  token: {
    type: String,
    default: ''
  }
}, {
  timestamps: true // Automatically add `createdAt` and `updatedAt` timestamps
});

// Exporting the User model
module.exports = mongoose.model('User', UserSchema);
