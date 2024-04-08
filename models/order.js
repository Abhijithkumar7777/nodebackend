// order.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: String, 
  totalAmount: Number, 
  status: String 
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
