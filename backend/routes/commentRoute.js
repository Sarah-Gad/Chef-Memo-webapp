const router = require('express').Router();
const { createCommentCtrl, getAllCommentsCtrl } = require('../controllers/commentController');
const { verifyToken, verifyTokenAndAdmin } = require('../middlewares/verifyToken');

router.route('/')
  .post(verifyToken, createCommentCtrl)
  .get(verifyTokenAndAdmin, getAllCommentsCtrl);

module.exports = router;
