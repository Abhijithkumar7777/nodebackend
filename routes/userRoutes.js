const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Route to get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to create a new user
router.post('/users', async (req, res) => {
  const { email, password, username, purchaseHistory, shippingAddress } = req.body;
  try {
    const user = new User({ email, password, username, purchaseHistory, shippingAddress });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

  
// Route to update a user
router.put('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const { email, password, username, purchaseHistory, shippingAddress } = req.body;
  if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
  }

  try {
      const existingUser = await User.findById(userId);
      if (!existingUser) {
          return res.status(404).json({ error: 'User not found' });
      }
      existingUser.email = email;
      existingUser.password = password;
      existingUser.username = username;
      existingUser.purchaseHistory = purchaseHistory;
      existingUser.shippingAddress = shippingAddress;

      const updatedUser = await existingUser.save();
      res.json(updatedUser);
  } catch (error) {
      if (error.name === 'ValidationError') {
          const errors = Object.values(error.errors).map(err => err.message);
          return res.status(400).json({ error: errors });
      }
      res.status(500).json({ error: 'Internal server error' });
  }
});


  // Route to delete a user
  router.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
module.exports = router;
