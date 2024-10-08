const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const { User, validateUpdateUser } = require('../models/User');
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require('../utils/cloudinary');

module.exports.getAllUsersCtrl = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.status(200).json(users);
});

module.exports.getUserProfileCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
});

module.exports.updateUserProfileCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, {
    $set: {
      username: req.body.username,
      password: req.body.password,
      bio: req.body.bio,
    },
  }, { new: true }).select('-password');
  res.status(200).json(updatedUser);
});

module.exports.getUsersCountCtrl = asyncHandler(async (req, res) => {
  const count = await User.countDocuments();
  res.status(200).json(count);
});

module.exports.profilePhotoUploadCtrl = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file provided' });
  }
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);
  const user = await User.findById(req.user.id);
  if (user.profilePhoto.publicId !== null) {
    await cloudinaryRemoveImage(user.profilePhoto.publicId);
  }
  user.profilePhoto = {
    url: result.secure_url,
    publicId: result.public_id,
  };
  await user.save();
  res.status(200).json({
    message: 'Your profile photo uploaded successfully',
    profilePhoto: { url: result.secure_url, publicId: result.public_id },
  });
  fs.unlinkSync(imagePath);
});

module.exports.deleteUserProfileCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  await cloudinaryRemoveImage(user.profilePhoto.publicId);
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: 'Your profile has been deleted' });
});
