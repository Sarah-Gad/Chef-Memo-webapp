const fs = require('fs');
const path = require('path');
const asyncHandler = require('express-async-handler');
const { Recipe, validateCreateRecipe, validateUpdateRecipe } = require('../models/Recipes');
const { cloudinaryUploadImage } = require('../utils/cloudinary');

module.exports.createRecipeCtrl = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image provided ' });
  }
  const { error } = validateCreateRecipe(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);
  const recipe = await Recipe.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    cookTime: req.body.cookTime,
    chef: req.user.id,
    image: {
      url: result.secure_url,
      publicId: result.public_id,
    },
  });
  res.status(201).json(recipe);
  fs.unlinkSync(imagePath);
});
