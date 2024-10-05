const asyncHandler = require('express-async-handler');
const { User } = require('../models/User');

module.exports.getAllUsersCtrl = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});
