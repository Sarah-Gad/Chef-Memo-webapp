const mongoose = require('mongoose');
const Joi = require('joi');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
  profilePhoto: {
    type: Object,
    default: {
      url: 'https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_640.png',
      publicId: null,
    },
  },
  bio: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isAccountVerified: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', UserSchema);

function validateRegisterUser(obj) {
  const schema = Joi.object({
    username: Joi.string().trim().min(2).max(100)
      .required(),
    email: Joi.string().trim().min(5).max(100)
      .required()
      .email(),
    password: Joi.string().trim().min(8).required(),
  });
  return schema.validate(obj);
}

module.exports = {
  User,
  validateRegisterUser,
};
