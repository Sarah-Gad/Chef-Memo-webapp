const router = require('express').Router();
const { getAllUsersCtrl, getUserProfileCtrl, updateUserProfileCtrl } = require('../controllers/usersController');
const { verifyTokenAndAdmin, verifyTokenAndOnlyUser } = require('../middlewares/verifyToken');
const validateObjectId = require('../middlewares/validateObjectId');

router.route('/profile').get(verifyTokenAndAdmin, getAllUsersCtrl);
router.route('/profile/:id')
  .get(validateObjectId, getUserProfileCtrl)
  .put(validateObjectId, verifyTokenAndOnlyUser, updateUserProfileCtrl);

module.exports = router;
