const express = require('express');
const dotenv = require('dotenv').config();
const { client, createTables } = require('../../database/database.js');
const customerApi = require('../customer-api');
const employeeApi = require('../employee-api');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

//for deployment only
const path = require('path');
// API Routes
app.use('/api/customer', customerApi);
app.use('/api/employee', employeeApi);
app.use('/api/shared', (req, res) => {
  res.send('Shared API');
});

// Serve static files for deployment
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'))
);
app.use(
  '/assets',
  express.static(path.join(__dirname, '../../client/dist/assets'))
);

const init = async () => {
  try {
    await client.connect();
    console.log('Connected to database');
    await createTables();
    console.log('Database setup completed');

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Initialization error:', error);
  }
};

init();
