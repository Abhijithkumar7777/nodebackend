const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Route to get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to create a new product
router.post('/products', async (req, res) => {
  const { description, image, pricing, shippingCost } = req.body;
  try {
    const product = new Product({ description, image, pricing, shippingCost });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// Route to update a product
router.put('/products/:id', async (req, res) => {
    const productId = req.params.id;
    const { description, image, pricing, shippingCost } = req.body;
    try {
      const updatedProduct = await Product.findByIdAndUpdate(productId, { description, image, pricing, shippingCost }, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(updatedProduct);
    } catch (error) {
      res.status(400).json({ error: 'Invalid data or error updating product' });
    }
  });
  
  // Route to delete a product
  router.delete('/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
 
  module.exports = router;
  

module.exports = router;
