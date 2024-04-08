const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
  purchaseHistory: String, 
  shippingAddress: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
