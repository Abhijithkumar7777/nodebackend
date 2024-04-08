const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes'); 
const userRoutes = require('./routes/userRoutes'); 
const commentRoutes = require('./routes/commentRoutes');
const cartRoutes = require('./routes/cartRoutes'); 
const orderRoutes = require('./routes/orderRoutes'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(productRoutes);
app.use(userRoutes);
app.use(commentRoutes);
app.use(cartRoutes);
app.use(orderRoutes);

// MongoDB connection
const dbURI = 'mongodb+srv://Abhi:123@clusterabhi.m6joiq6.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAbhi';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Defining routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Starting server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
