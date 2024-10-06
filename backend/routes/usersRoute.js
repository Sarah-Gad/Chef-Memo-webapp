const router = require('express').Router();
const {
  getAllUsersCtrl, getUserProfileCtrl, updateUserProfileCtrl, getUsersCountCtrl,
} = require('../controllers/usersController');
const { verifyTokenAndAdmin, verifyTokenAndOnlyUser } = require('../middlewares/verifyToken');
const validateObjectId = require('../middlewares/validateObjectId');

router.route('/profile').get(verifyTokenAndAdmin, getAllUsersCtrl);
router.route('/profile/:id')
  .get(validateObjectId, getUserProfileCtrl)
  .put(validateObjectId, verifyTokenAndOnlyUser, updateUserProfileCtrl);

router.route('/count').get(verifyTokenAndAdmin, getUsersCountCtrl);

module.exports = router;
