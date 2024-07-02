// server.js
// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv').config();
// const path = require('path');
// const { client, createTables } = require('./database/tables.js');
// const { seedDatabase } = require('./database/seedDatabase.js');

// const app = express();
// const port = process.env.PORT || 3000;

// const products = require('./controllers/productsController.js');
// const admins = require('./controllers/adminController.js');
// const user = require('./controllers/userController.js');
// const carts = require('./controllers/cartController.js');
// const orders = require('./controllers/orderController.js');
// const reviews = require('./controllers/reviewsController.js');
// const wishlist = require('./controllers/wishlistController.js');
// const categories = require('./controllers/categoryController.js');
// const stripe = require('./controllers/stripeController.js');

// // PORT 5173: store-front || PORT 5174: admin-portal
// app.use(
//   cors({
//     origin: [
//       'https://chic-haven-storefront.onrender.com',
//       'https://chic-haven-admin-portal.onrender.com',
//     ],
//     credentials: true,
//   })
// );

// app.use(express.json());

// // Serve static files from the 'public/productImages' directory
// app.use(
//   '/product-images',
//   express.static(path.join(__dirname, 'public/productImages'))
// );

// app.use('/api/products', products);
// app.use('/api/admins', admins);
// app.use('/api/users', user);
// app.use('/api', carts);
// app.use('/api', orders);
// app.use('/api', wishlist);
// app.use('/api', reviews);
// app.use('/api', categories);
// app.use('/api/stripe', stripe);

// app.use(express.static(path.join(__dirname, 'clients/store-front/dist')));
// app.use(express.static(path.join(__dirname, 'clients/admin-portal/dist')));

// app.get('/admin/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'clients/admin-portal/dist/index.html'));
// });

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'clients/store-front/dist/index.html'));
// });

// const init = async () => {
//   try {
//     await client.connect();
//     console.log('Connected to database');
//     await createTables();
//     await seedDatabase();
//     app.listen(port, () => {
//       console.log(`Server running on port ${port}`);
//     });
//   } catch (error) {
//     console.error('Error with server', error);
//   }
// };

// init();

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
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
const stripe = require('./controllers/stripeController.js');

// Enable CORS for the frontend applications
app.use(
  cors({
    origin: [
      'https://chic-haven-storefront.onrender.com',
      'https://chic-haven-admin-portal.onrender.com',
    ],
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
app.use('/api/stripe', stripe);

// Serve static files for the store-front
app.use(express.static(path.join(__dirname, 'clients/store-front/dist')));
app.get('/store/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'clients/store-front/dist/index.html'));
});

// Serve static files for the admin-portal
app.use(express.static(path.join(__dirname, 'clients/admin-portal/dist')));
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'clients/admin-portal/dist/index.html'));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'clients/store-front/dist/index.html'));
});

const init = async () => {
  try {
    await client.connect();
    console.log('Connected to database');
    await createTables();
    await seedDatabase();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error with server', error);
  }
};

init();
