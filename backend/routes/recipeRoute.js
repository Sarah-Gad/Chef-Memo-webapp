const router = require('express').Router();
const {
  createRecipeCtrl, getAllRecipesCtrl, getSingleRecipeCtrl, getRecipesCountCtrl,
  deleteRecipeCtrl,
  updateRecipeCtrl,
  updateRecipeImageCtrl,
  likeCtrl,
} = require('../controllers/recipeController');
const photoUpload = require('../middlewares/photoUpload');
const { verifyToken } = require('../middlewares/verifyToken');
const validateObjectId = require('../middlewares/validateObjectId');

router.route('/')
  .post(verifyToken, photoUpload.single('image'), createRecipeCtrl)
  .get(getAllRecipesCtrl);

router.route('/count').get(getRecipesCountCtrl);
router.route('/:id')
  .get(validateObjectId, getSingleRecipeCtrl)
  .delete(validateObjectId, verifyToken, deleteRecipeCtrl)
  .put(validateObjectId, verifyToken, updateRecipeCtrl);

router.route('/update-image/:id')
  .put(validateObjectId, verifyToken, photoUpload.single('image'), updateRecipeImageCtrl);

router.route('/like/:id').put(validateObjectId, verifyToken, likeCtrl);

module.exports = router;
