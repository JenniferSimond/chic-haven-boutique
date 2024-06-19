// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const { client, createTables } = require('./database/tables.js');
const { seedDatabase } = require('./database/seedDatabase.js');

const app = express();
const port = process.env.PORT || 3000;

const products = require('./controllers/productsController.js');
const admins = require('./controllers/adminController.js');
const user = require('./controllers/userController.js');
const carts = require('./controllers/cartController.js');
const orders = require('./controllers/orderController.js');
const reviews = require('./controllers/reviewsController.js');
const wishlist = require('./controllers/wishlistController.js');
const categories = require('./controllers/categoryController.js');

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());

// Serve static files from the 'public/productImages' directory
app.use(
  '/product-images',
  express.static(path.join(__dirname, 'public/productImages'))
);

app.use('/api/products', products);
app.use('/api/admins', admins);
app.use('/api/users', user);
app.use('/api', carts);
app.use('/api', orders);
app.use('/api', wishlist);
app.use('/api', reviews);
app.use('/api', categories);

const init = async () => {
  try {
    await client.connect();
    console.log('Connected to database');
    // await createTables();
    // await seedDatabase();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error with server', error);
  }
};

init();
