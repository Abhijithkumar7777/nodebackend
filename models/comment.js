// comment.js

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  productId: String, 
  userId: String, 
  rating: Number, 
  text: String,
  image: String
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
