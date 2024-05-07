// routes/comments.js
const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');

router.post('/', CommentController.createComment);
router.get('/', CommentController.getAllComments);
router.get('/:id', CommentController.getCommentById);
router.put('/:id', CommentController.updateCommentById);
router.delete('/:id', CommentController.deleteCommentById);

module.exports = router;
