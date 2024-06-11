const express = require('express');
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

app.use(express.json());
const path = require('path');

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'))
);
app.use(
  '/assets',
  express.static(path.join(__dirname, '../../client/dist/assets'))
);

app.use('/api/products', products);
app.use('/api/admins', admins);
app.use('/api/users', user);
app.use('/api', carts);
app.use('/api', orders);
app.use('/api', wishlist);
app.use('/api', reviews);

const init = async () => {
  try {
    await client.connect();
    console.log('Connected to database');
    // await createTables();
    // console.log('Database setup completed');
    // await seedDatabase();
    // console.log('Database seeded');

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('error with server', error);
  }
};

init();
