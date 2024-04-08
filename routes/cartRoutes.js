const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

// Route to get all carts
router.get('/carts', async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to create a new cart
router.post('/carts', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const cart = new Cart({ userId, productId, quantity });
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// Route to update a cart
router.put('/carts/:id', async (req, res) => {
    const cartId = req.params.id;
    const { userId, productId, quantity } = req.body;
    try {
      const updatedCart = await Cart.findByIdAndUpdate(cartId, { userId, productId, quantity }, { new: true });
      if (!updatedCart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
      res.json(updatedCart);
    } catch (error) {
      res.status(400).json({ error: 'Invalid data or error updating cart' });
    }
  });
  
  // Route to delete a cart
  router.delete('/carts/:id', async (req, res) => {
    const cartId = req.params.id;
    try {
      const deletedCart = await Cart.findByIdAndDelete(cartId);
      if (!deletedCart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
      res.json({ message: 'Cart deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
module.exports = router;
