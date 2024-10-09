const router = require('express').Router();
const {
  createRecipeCtrl, getAllRecipesCtrl, getSingleRecipeCtrl, getRecipesCountCtrl,
} = require('../controllers/recipeController');
const photoUpload = require('../middlewares/photoUpload');
const { verifyToken } = require('../middlewares/verifyToken');
const validateObjectId = require('../middlewares/validateObjectId');

router.route('/')
  .post(verifyToken, photoUpload.single('image'), createRecipeCtrl)
  .get(getAllRecipesCtrl);

router.route('/count').get(getRecipesCountCtrl);
router.route('/:id').get(validateObjectId, getSingleRecipeCtrl);

module.exports = router;
