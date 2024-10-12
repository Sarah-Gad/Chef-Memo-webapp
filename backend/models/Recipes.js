const mongoose = require('mongoose');
const joi = require('joi');

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 200,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
  },
  ingredients: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
  },
  instructions: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
  },
  cookTime: {
    type: Number,
    required: true,
    min: 1,
  },
  chef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
    default: {
      url: '',
      publicId: null,
    },
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

RecipeSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'recipeId',
  localField: '_id',
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

function validateCreateRecipe(obj) {
  const schema = joi.object({
    title: joi.string().trim().min(2).max(200)
      .required(),
    description: joi.string().trim().min(10).required(),
    ingredients: joi.string().trim().min(10).required(),
    instructions: joi.string().trim().min(10).required(),
    cookTime: joi.number().integer().min(1).required(),
    category: joi.string().trim().required(),
  });
  return schema.validate(obj);
}

function validateUpdateRecipe(obj) {
  const schema = joi.object({
    title: joi.string().trim().min(2).max(200),
    description: joi.string().trim().min(10),
    ingredients: joi.string().trim().min(10),
    instructions: joi.string().trim().min(10),
    cookTime: joi.number().integer().min(1),
    category: joi.string().trim(),
  });
  return schema.validate(obj);
}

module.exports = {
  Recipe,
  validateCreateRecipe,
  validateUpdateRecipe,
};
