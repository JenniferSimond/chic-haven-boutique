# Chic Haven Boutique

Chic Haven Boutique is a full-stack e-commerce web application built with the PERN stack (PostgreSQL, Express, React, Node.js). The application consists of a storefront for customers and an admin portal for managing products, users, and orders. The storefront integrates Stripe for payment processing, and the layout is designed with Styled Components. The admin portal is built using Material UI for an enhanced user experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Database Structure](#database-structure)
- [Design Process](#design)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Live Demo](##demo)
- [Contact](#contact)

## Features

### Customer Features

- Browse products
- Register and log in
- Read and leave reviews
- Add items to cart and update cart
- Checkout using Stripe

### Admin Features

- View, update, upload pictures for, and delete products
- View and update customer details
- Ban users from posting reviews and delete users
- View all orders and reviews

## Technologies Used

- **Frontend**: React, JSX, Styled Components (storefront), Material UI (admin portal)
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)
- **Payment Processing**: Stripe
- **Design Tools**: Figma, Canva, Adobe Illustrator
- **Project Management**: Trello
- **Database Planning**: dbdiagram.io

## Database Structure

Chic Haven Boutique's database consists of 15 tables, with the "users" and "products" tables serving as the central entities. These two tables form the foundation of most relationships, allowing the system to track interactions and attributes associated with the remaining 13 tables. The "ordered_items," "cart_items," and "wishlist_items" tables act as junctions, facilitating many-to-many relationships between the central entities (users and products) and other related tables (customer_orders, customer_carts, and customer_wishlists). This design provides a comprehensive way to manage and query the boutique's data, ensuring information is accessible to both site administrators and customers.

![photo](./images/database_schema.png)

![photo](./images/schema-logic.png)

## Installation

To run Chic Haven Boutique locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone git@github.com:JenniferSimond/chic-haven-boutique.git
   cd chic-haven-boutique

   ```

2. Install Dependencies:

## Local Setup & Enviornment Variables

-- Create PostgreSQL database : chic_haven

-- Install dependencies: pg, express, nodemon, bcrypt, uuid, jsonwebtoken, dotenv, stripe

-- Start Server: from root folder

```
npm run start:dev
```

2. Install dependencies:

Navigate to the root directory and install backend dependencies:

```
npm install
```

Navigate to clients/admin-portal and install frontend dependencies:

```
cd clients/admin-portal
npm install
```

Navigate to clients/store-front and install frontend dependencies:

```
cd clients/store-front
npm install
```

3. Environment Variables:
   Create a .env file in the root directory and add the following environment variables:

plaintext
Copy code
DATABASE_URL=<your-database-url>
JWT_SECRET=<your-jwt-secret>
STRIPE_PRIVATE_KEY=<your-stripe-private-key>
NODE_ENV=development

4. Run the application:

Start the backend server:

```
npm run start:dev
```

Start the admin portal and storefront:

```
cd clients/admin-portal
npm run dev
```

```
cd clients/store-front
npm run dev
```

## Usage

Customers can browse products, register/log in, read and leave reviews, add items to their cart, update the cart, and checkout using Stripe. Admins have access to view and manage products, customers, orders, and reviews.

## API Endpoints

The RESTful API provides the following main endpoints:

Users: /api/users
Admins: /api/admins
Products: /api/products
Reviews: /api/reviews
Carts: /api/carts
Orders: /api/orders
Stripe: /api/stripe

## Deployment

The application is deployed using Render. The backend is deployed as a web service, and the admin portal and storefront are deployed as static sites. Below is the render.yaml configuration for deployment:

## yaml

services:

- type: web
  name: chic-haven-boutique-backend
  env: node
  buildCommand: npm install
  startCommand: node server.js
  envVars:

  - key: DATABASE_URL
    fromDatabase:
    name: chic_haven
    property: connectionString
  - key: JWT_SECRET
    value: <Your Secret Here>
  - key: STRIPE_PRIVATE_KEY
    value:<Your key here>
  - key: NODE_ENV
    value: production

- type: web
  name: chic-haven-storefront
  env: static
  staticPublishPath: dist
  buildCommand: cd clients/store-front && npm install && npm run build

- type: web
  name: chic-haven-admin-portal
  env: static
  staticPublishPath: dist
  buildCommand: cd clients/admin-portal && npm install && npm run build

## Demo

# Admin Portal

Link: [here](https://chic-haven-admin-portal.onrender.com)

Demo Account:
Username: jsimond@gmail.com
password: js_password

# Storefront

Link: [here](https://chic-haven-storefront.onrender.com)

Demo Account:
Username: kramirez@gmail.com
password: kr_password

Test Card for checkout:
Card: 4242 4242 4242 4242
Expiration: Any future date
CVC: Any 3 digit number
