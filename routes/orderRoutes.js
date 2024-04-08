const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Route to get all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to create a new order
router.post('/orders', async (req, res) => {
  const { userId, totalAmount, status } = req.body;
  try {
    const order = new Order({ userId, totalAmount, status });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// Route to update an order
router.put('/orders/:id', async (req, res) => {
    const orderId = req.params.id;
    const { userId, totalAmount, status } = req.body;
    try {
      const updatedOrder = await Order.findByIdAndUpdate(orderId, { userId, totalAmount, status }, { new: true });
      if (!updatedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json(updatedOrder);
    } catch (error) {
      res.status(400).json({ error: 'Invalid data or error updating order' });
    }
  });


  // Route to delete an order
  router.delete('/orders/:id', async (req, res) => {
    const orderId = req.params.id;
    try {
      const deletedOrder = await Order.findByIdAndDelete(orderId);
      if (!deletedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json({ message: 'Order deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
module.exports = router;
