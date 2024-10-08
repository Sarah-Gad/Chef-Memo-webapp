const router = require('express').Router();
const { createRecipeCtrl } = require('../controllers/recipeController');
const photoUpload = require('../middlewares/photoUpload');
const { verifyToken } = require('../middlewares/verifyToken');

router.route('/')
  .post(verifyToken, photoUpload.single('image'), createRecipeCtrl);

module.exports = router;
