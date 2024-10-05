const router = require('express').Router();
const { getAllUsersCtrl, getUserProfileCtrl } = require('../controllers/usersController');
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const validateObjectId = require('../middlewares/validateObjectId');

router.route('/profile').get(verifyTokenAndAdmin, getAllUsersCtrl);
router.route('/profile/:id').get(validateObjectId, getUserProfileCtrl);

module.exports = router;
