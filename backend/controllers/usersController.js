const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const { User, validateUpdateUser } = require('../models/User');
const { cloudinaryUploadImage, cloudinaryRemoveImage, cloudinaryRemoveMultiImages } = require('../utils/cloudinary');
const { Recipe } = require('../models/Recipes');
const { Comment } = require('../models/Comment');

module.exports.getAllUsersCtrl = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').populate('recipes');
  res.status(200).json(users);
});

module.exports.getUserProfileCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password').populate('recipes');
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
  const user = await User.findById(req.user.id);
  if (user.profilePhoto.publicId !== null) {
    await cloudinaryRemoveImage(user.profilePhoto.publicId);
  }
  try {
    const result = await cloudinaryUploadImage(req.file);
    user.profilePhoto = {
      url: result.secure_url,
      publicId: result.public_id,
    };
    await user.save();

    res.status(200).json({
      message: 'Your profile photo uploaded successfully',
      profilePhoto: { url: result.secure_url, publicId: result.public_id },
    });
  } catch (error) {
    console.error('Error uploading profile photo:', error);
    res.status(500).json({ message: 'Error uploading profile photo' });
  }
});

module.exports.deleteUserProfileCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const recipes = await Recipe.find({ chef: user._id });
  const publicIds = recipes?.map((recipe) => recipe.image.publicId);
  if (publicIds?.length > 0) {
    await cloudinaryRemoveMultiImages(publicIds);
  }
  if(user.profilePhoto.publicId !== null) {
    await cloudinaryRemoveImage(user.profilePhoto.publicId);
  }
  await Recipe.deleteMany({ chef: user._id });
  await Comment.deleteMany({ user: user._id });
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: 'Your profile has been deleted' });
});
