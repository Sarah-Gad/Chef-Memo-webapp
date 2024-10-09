const fs = require('fs');
const path = require('path');
const asyncHandler = require('express-async-handler');
const { Recipe, validateCreateRecipe, validateUpdateRecipe } = require('../models/Recipes');
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require('../utils/cloudinary');

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

module.exports.getAllRecipesCtrl = asyncHandler(async (req, res) => {
  const RECIPE_PER_PAGE = 3;
  const { pageNumber, category } = req.query;
  let recipes;
  if (pageNumber) {
    recipes = await Recipe.find()
      .skip((pageNumber - 1) * RECIPE_PER_PAGE)
      .limit(RECIPE_PER_PAGE)
      .sort({ createdAt: -1 })
      .populate('chef', ['-password']);
  } else if (category) {
    recipes = await Recipe.find({ category })
      .sort({ createdAt: -1 })
      .populate('chef', ['-password']);
  } else {
    recipes = await Recipe.find()
      .sort({ createdAt: -1 })
      .populate('chef', ['-password']);
  }
  res.status(200).json(recipes);
});
module.exports.getSingleRecipeCtrl = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id).populate('chef', ['-password']);
  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }
  res.status(200).json(recipe);
});
module.exports.getRecipesCountCtrl = asyncHandler(async (req, res) => {
  const count = await Recipe.countDocuments();
  res.status(200).json(count);
});

module.exports.deleteRecipeCtrl = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }
  if (req.user.isAdmin || req.user.id === recipe.chef.toString()) {
    await Recipe.findByIdAndDelete(req.params.id);
    await cloudinaryRemoveImage(recipe.image.publicId);
    res.status(200).json({
      message: 'Recipe has been deleted successfully',
      recipeId: recipe._id,
    });
  } else {
    res.status(403).json({ message: 'Access denied, forbidden ' });
  }
});

module.exports.updateRecipeCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateRecipe(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }
  if (req.user.id !== recipe.chef.toString()) {
    return res.status(403).json({ message: 'Access denied, you are not allowed' });
  }
  const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      description: req.body.description,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      cookTime: req.body.cookTime,
      category: req.body.category,
    },
  }, { new: true }).populate('chef', ['-password']);
  res.status(200).json(updatedRecipe);
});

module.exports.updateRecipeImageCtrl = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image provided' });
  }
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }
  if (req.user.id !== recipe.chef.toString()) {
    return res.status(403).json({ message: 'Access denied, you are not allowed' });
  }
  await cloudinaryRemoveImage(recipe.image.publicId);
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);
  const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, {
    $set: {
      image: {
        url: result.secure_url,
        publicId: result.public_id,
      },
    },
  }, { new: true }).populate('chef', ['-password']);
  res.status(200).json(updatedRecipe);
  fs.unlinkSync(imagePath);
});
