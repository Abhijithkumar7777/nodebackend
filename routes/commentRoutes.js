const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// Route to get all comments
router.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to create a new comment
router.post('/comments', async (req, res) => {
  const { productId, userId, rating, text, image } = req.body;
  try {
    const comment = new Comment({ productId, userId, rating, text, image });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// Route to update a comment
router.put('/comments/:id', async (req, res) => {
    const commentId = req.params.id;
    const { productId, userId, rating, text, image } = req.body;
    try {
      const updatedComment = await Comment.findByIdAndUpdate(commentId, { productId, userId, rating, text, image }, { new: true });
      if (!updatedComment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      res.json(updatedComment);
    } catch (error) {
      res.status(400).json({ error: 'Invalid data or error updating comment' });
    }
  });
  
  // Route to delete a comment
  router.delete('/comments/:id', async (req, res) => {
    const commentId = req.params.id;
    try {
      const deletedComment = await Comment.findByIdAndDelete(commentId);
      if (!deletedComment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
module.exports = router;
