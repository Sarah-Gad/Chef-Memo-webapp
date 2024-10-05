const router = require('express').Router();
const { getAllUsersCtrl } = require('../controllers/usersController');
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');

router.route('/profile').get(verifyTokenAndAdmin, getAllUsersCtrl);
module.exports = router;
