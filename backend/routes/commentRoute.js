const router = require('express').Router();
const { createCommentCtrl, getAllCommentsCtrl, deleteCommentCtrl } = require('../controllers/commentController');
const { verifyToken, verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const validateObjectId = require('../middlewares/validateObjectId');

router.route('/')
  .post(verifyToken, createCommentCtrl)
  .get(verifyTokenAndAdmin, getAllCommentsCtrl);

router.route('/:id').delete(validateObjectId, verifyToken, deleteCommentCtrl);

module.exports = router;
