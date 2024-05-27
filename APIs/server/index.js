const express = require('express');
const dotenv = require('dotenv').config();
const {
  client,
  createTables,
  createCustomer,
  createEmployee,
} = require('../../database/database.js');
const customerApi = require('../customer-api/index.js');
const employeeApi = require('../employee-api/index.js');
const sharedApi = require('../shared/index.js');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// For deployment only
const path = require('path');

// API Routes
app.use('/api/customer', customerApi);
app.use('/api/employee', employeeApi);
app.use('/api/boutique', sharedApi);

// Serve static files for deployment
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'))
);
app.use(
  '/assets',
  express.static(path.join(__dirname, '../../client/dist/assets'))
);

// Initialization function
const init = async () => {
  try {
    await client.connect();
    console.log('Connected to database');
    await createTables();
    console.log('Database setup completed');

    // Create test users after setting up the database
    const testUsers = [
      {
        last_name: 'Peters',
        first_name: 'Joe',
        password: 'jp_password',
        email: 'jpeters@gmail.com',
        phone_number: '248-990-5559',
      },
      {
        last_name: 'Doe',
        first_name: 'John',
        password: 'jd_password',
        email: 'jdoe@gmail.com',
        phone_number: '248-833-7775',
      },
    ];

    const createdUsers = await Promise.all(testUsers.map(createCustomer));
    console.log('Test users created:', createdUsers);

    const testEmployees = [
      {
        last_name: 'Stark',
        first_name: 'Tony',
        password: 'ts_password',
        email: 'tstart@gmail.com',
        phone_number: '248-990-5559',
        role: 'site_admin',
      },
      {
        last_name: 'Simond',
        first_name: 'Jennifer',
        password: 'js_password',
        email: 'jsimond@gmail.com',
        phone_number: '248-830-3330',
        role: 'super_admin',
      },
    ];

    const createdEmployees = await Promise.all(
      testEmployees.map(createEmployee)
    );
    console.log('Test employees created:', createdEmployees);

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Initialization error:', error);
  }
};

init();
