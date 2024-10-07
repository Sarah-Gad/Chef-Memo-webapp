const router = require('express').Router();
const {
  getAllUsersCtrl, getUserProfileCtrl, updateUserProfileCtrl, getUsersCountCtrl,
  profilePhotoUploadCtrl,
} = require('../controllers/usersController');
const { verifyTokenAndAdmin, verifyTokenAndOnlyUser, verifyToken } = require('../middlewares/verifyToken');
const validateObjectId = require('../middlewares/validateObjectId');
const photoUpload = require('../middlewares/photoUpload');

router.route('/profile').get(verifyTokenAndAdmin, getAllUsersCtrl);
router.route('/profile/:id')
  .get(validateObjectId, getUserProfileCtrl)
  .put(validateObjectId, verifyTokenAndOnlyUser, updateUserProfileCtrl);

router.route('/profile/profile-photo-upload')
  .post(verifyToken, photoUpload.single('image'), profilePhotoUploadCtrl);
router.route('/count').get(verifyTokenAndAdmin, getUsersCountCtrl);

module.exports = router;
