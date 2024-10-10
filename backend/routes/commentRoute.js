const router = require('express').Router();
const { createCommentCtrl } = require('../controllers/commentController');
const { verifyToken } = require('../middlewares/verifyToken');

router.route('/').post(verifyToken, createCommentCtrl);

module.exports = router;
