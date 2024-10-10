const asyncHandler = require('express-async-handler');
const { Comment, validateCreateComment, validateUpdateComment } = require('../models/Comment');
const { User } = require('../models/User');

module.exports.createCommentCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateComment(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const profile = await User.findById(req.user.id);
  const comment = await Comment.create({
    recipeId: req.body.recipeId,
    text: req.body.text,
    user: req.user.id,
    username: profile.username,
  });
  res.status(201).json(comment);
});
