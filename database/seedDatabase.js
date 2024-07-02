// const { createUserCustomer, createAdmin, createProduct } = require('./index');

// const seedDatabase = async () => {
//   const testUsers = [
//     {
//       last_name: 'Peters',
//       first_name: 'Joe',
//       password: 'jp_password',
//       email: 'jpeters@gmail.com',
//       phone_number: '248-990-5559',
//     },
//     {
//       last_name: 'Doe',
//       first_name: 'John',
//       password: 'jd_password',
//       email: 'jdoe@gmail.com',
//       phone_number: '248-803-5555',
//     },
//     {
//       last_name: 'Ramirez',
//       first_name: 'Kimberly',
//       password: 'kr_password',
//       email: 'kramirez@gmail.com',
//       phone_number: '248-833-7775',
//     },
//     {
//       last_name: 'Smith',
//       first_name: 'Jane',
//       password: 'js_password',
//       email: 'jsmith@gmail.com',
//       phone_number: '248-555-1234',
//     },
//     {
//       last_name: 'Brown',
//       first_name: 'Michael',
//       password: 'mb_password',
//       email: 'mbrown@gmail.com',
//       phone_number: '248-555-5678',
//     },
//     {
//       last_name: 'Davis',
//       first_name: 'Jessica',
//       password: 'jd_password',
//       email: 'jdavis@gmail.com',
//       phone_number: '248-555-8765',
//     },
//     {
//       last_name: 'Martinez',
//       first_name: 'Carlos',
//       password: 'cm_password',
//       email: 'cmartinez@gmail.com',
//       phone_number: '248-555-4321',
//     },
//     {
//       last_name: 'Garcia',
//       first_name: 'Maria',
//       password: 'mg_password',
//       email: 'mgarcia@gmail.com',
//       phone_number: '248-555-6789',
//     },
//     {
//       last_name: 'Wilson',
//       first_name: 'David',
//       password: 'dw_password',
//       email: 'dwilson@gmail.com',
//       phone_number: '248-555-9876',
//     },
//     {
//       last_name: 'Anderson',
//       first_name: 'Emily',
//       password: 'ea_password',
//       email: 'eanderson@gmail.com',
//       phone_number: '248-555-6543',
//     },
//     {
//       last_name: 'Thomas',
//       first_name: 'James',
//       password: 'jt_password',
//       email: 'jthomas@gmail.com',
//       phone_number: '248-555-7890',
//     },
//     {
//       last_name: 'Taylor',
//       first_name: 'Linda',
//       password: 'lt_password',
//       email: 'ltaylor@gmail.com',
//       phone_number: '248-555-8901',
//     },
//     {
//       last_name: 'Moore',
//       first_name: 'Robert',
//       password: 'rm_password',
//       email: 'rmoore@gmail.com',
//       phone_number: '248-555-3456',
//     },
//     {
//       last_name: 'Jackson',
//       first_name: 'Sarah',
//       password: 'sj_password',
//       email: 'sjackson@gmail.com',
//       phone_number: '248-555-4567',
//     },
//     {
//       last_name: 'Lee',
//       first_name: 'Christopher',
//       password: 'cl_password',
//       email: 'clee@gmail.com',
//       phone_number: '248-555-5678',
//     },
//     {
//       last_name: 'Perez',
//       first_name: 'Laura',
//       password: 'lp_password',
//       email: 'lperez@gmail.com',
//       phone_number: '248-555-6789',
//     },
//     {
//       last_name: 'White',
//       first_name: 'Daniel',
//       password: 'dw_password',
//       email: 'dwhite@gmail.com',
//       phone_number: '248-555-7890',
//     },
//     {
//       last_name: 'Harris',
//       first_name: 'Elizabeth',
//       password: 'eh_password',
//       email: 'eharris@gmail.com',
//       phone_number: '248-555-8901',
//     },
//     {
//       last_name: 'Young',
//       first_name: 'Matthew',
//       password: 'my_password',
//       email: 'myoung@gmail.com',
//       phone_number: '248-555-9012',
//     },
//     {
//       last_name: 'King',
//       first_name: 'Patricia',
//       password: 'pk_password',
//       email: 'pking@gmail.com',
//       phone_number: '248-555-0123',
//     },
//   ];

//   const createdUser = await Promise.all(testUsers.map(createUserCustomer));
//   console.log('Test Users ->', createdUser);

//   const testAdmins = [
//     {
//       last_name: 'Stark',
//       first_name: 'Tony',
//       password: 'ts_password',
//       email: 'tstart@gmail.com',
//       phone_number: '248-990-5559',
//       user_role: 'site_admin',
//     },
//     {
//       last_name: 'Bucky',
//       first_name: 'Barns',
//       password: 'bb_password',
//       email: 'bbarns@gmail.com',
//       phone_number: '248-990-6609',
//       user_role: 'site_admin',
//     },
//     {
//       last_name: 'Simond',
//       first_name: 'Jennifer',
//       password: 'js_password',
//       email: 'jsimond@gmail.com',
//       phone_number: '248-830-3330',
//       user_role: 'super_admin',
//     },
//   ];

//   const newTestAdmin = await Promise.all(testAdmins.map(createAdmin));
//   console.log('Test admins ->', newTestAdmin);

//   const adminUserId = newTestAdmin.find(
//     (admin) => admin.user_role === 'super_admin'
//   ).id;
//   console.log('Super admin id ->', adminUserId);

//   const testProducts = [
//     {
//       name: 'Tropical Vibes set',
//       description:
//         'Vibrant two-piece set with a floral pattern, featuring a crop top and a ruffled skirt. Perfect for summer outings.',
//       price: 49.99,
//       category: 'Set',
//       product_status: 'in-stock',
//       image_url: '/product-images/two-piece-skirt1.png',
//       user_id: adminUserId,
//     },
//     {
//       name: 'Boho Breeze Set',
//       description:
//         'Off-shoulder crop top with matching high-waisted pants, featuring a delicate leaf pattern. Ideal for a relaxed yet chic look.',
//       price: 54.99,
//       category: 'Set',
//       product_status: 'in-stock',
//       image_url: '/product-images/two-piece-pants.png',
//       user_id: adminUserId,
//     },
//     {
//       name: 'Elegant Dress',
//       description:
//         'Soft cream dress with a fitted bodice and flowy skirt, accentuated with a waist tie. A versatile piece for any occasion.',
//       price: 65.99,
//       category: 'Dress',
//       product_status: 'in-stock',
//       image_url: '/product-images/soft-tan-dress.png',
//       user_id: adminUserId,
//     },
//     {
//       name: 'Island Romper',
//       description:
//         'Floral romper with adjustable straps and a comfortable fit, perfect for a tropical vacation.',
//       price: 39.99,
//       category: 'Romper',
//       product_status: 'in-stock',
//       image_url: '/product-images/island-romper.png',
//       user_id: adminUserId,
//     },
//     {
//       name: 'Halter Dress',
//       description:
//         'Colorful halter dress with a floral print, designed for beach parties and summer gatherings.',
//       price: 58.99,
//       category: 'Dress',
//       product_status: 'in-stock',
//       image_url: '/product-images/island-dress.png',
//       user_id: adminUserId,
//     },
//     {
//       name: 'Boho Princess',
//       description:
//         'Multi-layered boho dress with ruffles and a vibrant floral design, bringing out the inner bohemian spirit.',
//       price: 79.99,
//       category: 'Dress',
//       product_status: 'in-stock',
//       image_url: '/product-images/fancy-boho-dress.png',
//       user_id: adminUserId,
//     },
//     {
//       name: 'Classic Black Suit',
//       description:
//         'Tailored black suit with a modern cut, designed for the professional woman who means business.',
//       price: 129.99,
//       category: 'Suit',
//       product_status: 'in-stock',
//       image_url: '/product-images/black-suite.png',
//       user_id: adminUserId,
//     },
//     {
//       name: 'Boss Bae Suit',
//       description:
//         'Sleek black suit with a fitted blazer and high-waisted pants, perfect for the confident and stylish professional.',
//       price: 139.99,
//       category: 'Suit',
//       product_status: 'in-stock',
//       image_url: '/product-images/boss-bae-suite.png',
//       user_id: adminUserId,
//     },
//     {
//       name: 'Tweed Suit',
//       description:
//         'Chic tweed suit with a tailored fit, combining classic style with a contemporary twist.',
//       price: 149.99,
//       category: 'Suit',
//       product_status: 'in-stock',
//       image_url: '/product-images/tweed-suite.png',
//       user_id: adminUserId,
//     },
//     {
//       name: 'Sandy Beige Suit',
//       description:
//         'Elegant beige suit with a tailored fit, perfect for a professional yet stylish look.',
//       price: 119.99,
//       category: 'Suit',
//       product_status: 'in-stock',
//       image_url: '/product-images/tan-suite.png',
//       user_id: adminUserId,
//     },
//     {
//       name: 'Power Black Suit',
//       description:
//         'Classic black suit with a sharp silhouette, ideal for making a powerful impression in any business setting.',
//       price: 129.99,
//       category: 'Suit',
//       product_status: 'in-stock',
//       image_url: '/product-images/power-suite.png',
//       user_id: adminUserId,
//     },
//     {
//       name: 'Golden Glam Gown',
//       description:
//         'Stunning golden gown with off-shoulder sleeves and a thigh-high slit, perfect for formal occasions.',
//       price: 199.99,
//       category: 'Dress',
//       product_status: 'in-stock',
//       image_url: '/product-images/partyDress2.png',
//       user_id: adminUserId,
//     },
//     {
//       name: 'Goddess Gown',
//       description:
//         'Dazzling two-piece set with a crop top and a high-slit skirt, covered in gold sequins.',
//       price: 179.99,
//       category: 'Set',
//       product_status: 'in-stock',
//       image_url: '/product-images/partydress1.png',
//       user_id: adminUserId,
//     },
//     {
//       name: 'Boss Lady Dress',
//       description:
//         'Elegant black dress with a deep V-neck and long sleeves, ideal for evening events.',
//       price: 89.99,
//       category: 'Dress',
//       product_status: 'in-stock',
//       image_url: '/product-images/sophisticated1.png',
//       user_id: adminUserId,
//     },
//     {
//       name: 'High-Waisted Jeans',
//       description:
//         'Trendy high-waisted blue jeans with a slim fit, perfect for casual outings.',
//       price: 49.99,
//       category: 'Jeans',
//       product_status: 'in-stock',
//       image_url: '/product-images/jeans6.png',
//       user_id: adminUserId,
//     },
//     {
//       name: 'Vintage Jeans',
//       description:
//         'Classic high-waisted jeans with a vintage wash, ideal for everyday wear.',
//       price: 54.99,
//       category: 'Jeans',
//       product_status: 'in-stock',
//       image_url: '/product-images/jeans5.png',
//       user_id: adminUserId,
//     },
//     {
//       name: '90s Mom Jeans',
//       description:
//         'Stylish high-waisted jeans with distressed detailing, adding an edge to any outfit.',
//       price: 59.99,
//       category: 'Jeans',
//       product_status: 'in-stock',
//       image_url: '/product-images/jeans4.png',
//       user_id: adminUserId,
//     },
//     {
//       name: 'Distressed Jeans',
//       description:
//         'Chic olive green crop top paired with high-waisted jeans, ideal for a casual yet stylish look.',
//       price: 34.99,
//       category: 'Set',
//       product_status: 'in-stock',
//       image_url: '/product-images/jeans2.png',
//       user_id: adminUserId,
//     },
//     {
//       name: 'White Crop Top',
//       description:
//         'Trendy white crop top combined with high-waisted jeans, perfect for a fresh and modern outfit.',
//       price: 34.99,
//       category: 'Set',
//       product_status: 'in-stock',
//       image_url: '/product-images/jeans1.png',
//       user_id: adminUserId,
//     },
//     {
//       name: 'Floral Sundress',
//       description:
//         'Beautiful sundress with a vibrant floral print, perfect for a sunny day out.',
//       price: 59.99,
//       category: 'Dress',
//       product_status: 'in-stock',
//       image_url: '/product-images/reg-2.png',
//       user_id: adminUserId,
//     },
//     {
//       name: 'Floral Wrap Dress',
//       description:
//         'Delightful ruffled dress with a floral design, bringing a touch of elegance to casual wear.',
//       price: 64.99,
//       category: 'Dress',
//       product_status: 'in-stock',
//       image_url: '/product-images/register.png',
//       user_id: adminUserId,
//     },
//     {
//       name: 'Comfy Beige Set',
//       description:
//         'Comfortable beige set featuring a loose-fitting top and matching pants, perfect for lounging.',
//       price: 49.99,
//       category: 'Set',
//       product_status: 'in-stock',
//       image_url: '/product-images/leisure-1.png',
//       user_id: adminUserId,
//     },
//     {
//       name: 'Island Bae Set',
//       description:
//         'Casual set featuring a floral off-shoulder top and matching skirt, perfect for a day out in nature.',
//       price: 59.99,
//       category: 'Set',
//       product_status: 'in-stock',
//       image_url: '/product-images/product1.png',
//       user_id: adminUserId,
//     },
//     {
//       name: '90s Chill Dress',
//       description:
//         'Elegant floral dress with a deep V-neck, perfect for a garden party or summer wedding.',
//       price: 69.99,
//       category: 'Dress',
//       product_status: 'in-stock',
//       image_url: '/product-images/product2.png',
//       user_id: adminUserId,
//     },
//     {
//       name: 'Knit Set',
//       description:
//         'Relaxed beige top and pants set, ideal for comfortable and stylish home wear.',
//       price: 44.99,
//       category: 'Set',
//       product_status: 'in-stock',
//       image_url: '/product-images/movement.png',
//       user_id: adminUserId,
//     },
//   ];

//   const testProductCount = testProducts.length;

//   const newTestProducts = await Promise.all(
//     testProducts.map(async (product) => {
//       console.log('Creagting product ->', product);
//       const createdProduct = await createProduct(product);
//       console.log('New Product ->', createdProduct);
//     })
//   );

//   console.log('Test Product Count ->', testProductCount);
// };

// module.exports = {
//   seedDatabase,
// };

const {
  createUserCustomer,
  createAdmin,
  createProduct,
  createProductReview,
  createCustomerOrder,
  addOrderedItems,
} = require('./index');

const seedDatabase = async () => {
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
      phone_number: '248-803-5555',
    },
    {
      last_name: 'Ramirez',
      first_name: 'Kimberly',
      password: 'kr_password',
      email: 'kramirez@gmail.com',
      phone_number: '248-833-7775',
    },
    {
      last_name: 'Smith',
      first_name: 'Jane',
      password: 'js_password',
      email: 'jsmith@gmail.com',
      phone_number: '248-555-1234',
    },
    {
      last_name: 'Brown',
      first_name: 'Michael',
      password: 'mb_password',
      email: 'mbrown@gmail.com',
      phone_number: '248-555-5678',
    },
    {
      last_name: 'Davis',
      first_name: 'Jessica',
      password: 'jd_password',
      email: 'jdavis@gmail.com',
      phone_number: '248-555-8765',
    },
    {
      last_name: 'Martinez',
      first_name: 'Carlos',
      password: 'cm_password',
      email: 'cmartinez@gmail.com',
      phone_number: '248-555-4321',
    },
    {
      last_name: 'Garcia',
      first_name: 'Maria',
      password: 'mg_password',
      email: 'mgarcia@gmail.com',
      phone_number: '248-555-6789',
    },
    {
      last_name: 'Wilson',
      first_name: 'David',
      password: 'dw_password',
      email: 'dwilson@gmail.com',
      phone_number: '248-555-9876',
    },
    {
      last_name: 'Anderson',
      first_name: 'Emily',
      password: 'ea_password',
      email: 'eanderson@gmail.com',
      phone_number: '248-555-6543',
    },
    {
      last_name: 'Thomas',
      first_name: 'James',
      password: 'jt_password',
      email: 'jthomas@gmail.com',
      phone_number: '248-555-7890',
    },
    {
      last_name: 'Taylor',
      first_name: 'Linda',
      password: 'lt_password',
      email: 'ltaylor@gmail.com',
      phone_number: '248-555-8901',
    },
    {
      last_name: 'Moore',
      first_name: 'Robert',
      password: 'rm_password',
      email: 'rmoore@gmail.com',
      phone_number: '248-555-3456',
    },
    {
      last_name: 'Jackson',
      first_name: 'Sarah',
      password: 'sj_password',
      email: 'sjackson@gmail.com',
      phone_number: '248-555-4567',
    },
    {
      last_name: 'Lee',
      first_name: 'Christopher',
      password: 'cl_password',
      email: 'clee@gmail.com',
      phone_number: '248-555-5678',
    },
    {
      last_name: 'Perez',
      first_name: 'Laura',
      password: 'lp_password',
      email: 'lperez@gmail.com',
      phone_number: '248-555-6789',
    },
    {
      last_name: 'White',
      first_name: 'Daniel',
      password: 'dw_password',
      email: 'dwhite@gmail.com',
      phone_number: '248-555-7890',
    },
    {
      last_name: 'Harris',
      first_name: 'Elizabeth',
      password: 'eh_password',
      email: 'eharris@gmail.com',
      phone_number: '248-555-8901',
    },
    {
      last_name: 'Young',
      first_name: 'Matthew',
      password: 'my_password',
      email: 'myoung@gmail.com',
      phone_number: '248-555-9012',
    },
    {
      last_name: 'King',
      first_name: 'Patricia',
      password: 'pk_password',
      email: 'pking@gmail.com',
      phone_number: '248-555-0123',
    },
  ];

  const createdUsers = await Promise.all(testUsers.map(createUserCustomer));
  console.log('Test Users ->', createdUsers);

  const testAdmins = [
    {
      last_name: 'Stark',
      first_name: 'Tony',
      password: 'ts_password',
      email: 'tstart@gmail.com',
      phone_number: '248-990-5559',
      user_role: 'site_admin',
    },
    {
      last_name: 'Bucky',
      first_name: 'Barns',
      password: 'bb_password',
      email: 'bbarns@gmail.com',
      phone_number: '248-990-6609',
      user_role: 'site_admin',
    },
    {
      last_name: 'Simond',
      first_name: 'Jennifer',
      password: 'js_password',
      email: 'jsimond@gmail.com',
      phone_number: '248-830-3330',
      user_role: 'super_admin',
    },
  ];

  const newTestAdmins = await Promise.all(testAdmins.map(createAdmin));
  console.log('Test admins ->', newTestAdmins);

  const adminUserId = newTestAdmins.find(
    (admin) => admin.user_role === 'super_admin'
  ).id;
  console.log('Super admin id ->', adminUserId);

  const testProducts = [
    {
      name: 'Tropical Vibes set',
      description:
        'Vibrant two-piece set with a floral pattern, featuring a crop top and a ruffled skirt. Perfect for summer outings.',
      price: 49.99,
      category: 'Set',
      product_status: 'in-stock',
      image_url: '/product-images/two-piece-skirt1.png',
      user_id: adminUserId,
    },
    {
      name: 'Boho Breeze Set',
      description:
        'Off-shoulder crop top with matching high-waisted pants, featuring a delicate leaf pattern. Ideal for a relaxed yet chic look.',
      price: 54.99,
      category: 'Set',
      product_status: 'in-stock',
      image_url: '/product-images/two-piece-pants.png',
      user_id: adminUserId,
    },
    {
      name: 'Elegant Dress',
      description:
        'Soft cream dress with a fitted bodice and flowy skirt, accentuated with a waist tie. A versatile piece for any occasion.',
      price: 65.99,
      category: 'Dress',
      product_status: 'in-stock',
      image_url: '/product-images/soft-tan-dress.png',
      user_id: adminUserId,
    },
    {
      name: 'Island Romper',
      description:
        'Floral romper with adjustable straps and a comfortable fit, perfect for a tropical vacation.',
      price: 39.99,
      category: 'Romper',
      product_status: 'in-stock',
      image_url: '/product-images/island-romper.png',
      user_id: adminUserId,
    },
    {
      name: 'Halter Dress',
      description:
        'Colorful halter dress with a floral print, designed for beach parties and summer gatherings.',
      price: 58.99,
      category: 'Dress',
      product_status: 'in-stock',
      image_url: '/product-images/island-dress.png',
      user_id: adminUserId,
    },
    {
      name: 'Boho Princess',
      description:
        'Multi-layered boho dress with ruffles and a vibrant floral design, bringing out the inner bohemian spirit.',
      price: 79.99,
      category: 'Dress',
      product_status: 'in-stock',
      image_url: '/product-images/fancy-boho-dress.png',
      user_id: adminUserId,
    },
    {
      name: 'Classic Black Suit',
      description:
        'Tailored black suit with a modern cut, designed for the professional woman who means business.',
      price: 129.99,
      category: 'Suit',
      product_status: 'in-stock',
      image_url: '/product-images/black-suite.png',
      user_id: adminUserId,
    },
    {
      name: 'Boss Bae Suit',
      description:
        'Sleek black suit with a fitted blazer and high-waisted pants, perfect for the confident and stylish professional.',
      price: 139.99,
      category: 'Suit',
      product_status: 'in-stock',
      image_url: '/product-images/boss-bae-suite.png',
      user_id: adminUserId,
    },
    {
      name: 'Tweed Suit',
      description:
        'Chic tweed suit with a tailored fit, combining classic style with a contemporary twist.',
      price: 149.99,
      category: 'Suit',
      product_status: 'in-stock',
      image_url: '/product-images/tweed-suite.png',
      user_id: adminUserId,
    },
    {
      name: 'Sandy Beige Suit',
      description:
        'Elegant beige suit with a tailored fit, perfect for a professional yet stylish look.',
      price: 119.99,
      category: 'Suit',
      product_status: 'in-stock',
      image_url: '/product-images/tan-suite.png',
      user_id: adminUserId,
    },
    {
      name: 'Power Black Suit',
      description:
        'Classic black suit with a sharp silhouette, ideal for making a powerful impression in any business setting.',
      price: 129.99,
      category: 'Suit',
      product_status: 'in-stock',
      image_url: '/product-images/power-suite.png',
      user_id: adminUserId,
    },
    {
      name: 'Golden Glam Gown',
      description:
        'Stunning golden gown with off-shoulder sleeves and a thigh-high slit, perfect for formal occasions.',
      price: 199.99,
      category: 'Dress',
      product_status: 'in-stock',
      image_url: '/product-images/partyDress2.png',
      user_id: adminUserId,
    },
    {
      name: 'Goddess Gown',
      description:
        'Dazzling two-piece set with a crop top and a high-slit skirt, covered in gold sequins.',
      price: 179.99,
      category: 'Set',
      product_status: 'in-stock',
      image_url: '/product-images/partydress1.png',
      user_id: adminUserId,
    },
    {
      name: 'Boss Lady Dress',
      description:
        'Elegant black dress with a deep V-neck and long sleeves, ideal for evening events.',
      price: 89.99,
      category: 'Dress',
      product_status: 'in-stock',
      image_url: '/product-images/sophisticated1.png',
      user_id: adminUserId,
    },
    {
      name: 'High-Waisted Jeans',
      description:
        'Trendy high-waisted blue jeans with a slim fit, perfect for casual outings.',
      price: 49.99,
      category: 'Jeans',
      product_status: 'in-stock',
      image_url: '/product-images/jeans6.png',
      user_id: adminUserId,
    },
    {
      name: 'Vintage Jeans',
      description:
        'Classic high-waisted jeans with a vintage wash, ideal for everyday wear.',
      price: 54.99,
      category: 'Jeans',
      product_status: 'in-stock',
      image_url: '/product-images/jeans5.png',
      user_id: adminUserId,
    },
    {
      name: '90s Mom Jeans',
      description:
        'Stylish high-waisted jeans with distressed detailing, adding an edge to any outfit.',
      price: 59.99,
      category: 'Jeans',
      product_status: 'in-stock',
      image_url: '/product-images/jeans4.png',
      user_id: adminUserId,
    },
    {
      name: 'Distressed Jeans',
      description:
        'Chic olive green crop top paired with high-waisted jeans, ideal for a casual yet stylish look.',
      price: 34.99,
      category: 'Set',
      product_status: 'in-stock',
      image_url: '/product-images/jeans2.png',
      user_id: adminUserId,
    },
    {
      name: 'White Crop Top',
      description:
        'Trendy white crop top combined with high-waisted jeans, perfect for a fresh and modern outfit.',
      price: 34.99,
      category: 'Set',
      product_status: 'in-stock',
      image_url: '/product-images/jeans1.png',
      user_id: adminUserId,
    },
    {
      name: 'Floral Sundress',
      description:
        'Beautiful sundress with a vibrant floral print, perfect for a sunny day out.',
      price: 59.99,
      category: 'Dress',
      product_status: 'in-stock',
      image_url: '/product-images/reg-2.png',
      user_id: adminUserId,
    },
    {
      name: 'Floral Wrap Dress',
      description:
        'Delightful ruffled dress with a floral design, bringing a touch of elegance to casual wear.',
      price: 64.99,
      category: 'Dress',
      product_status: 'in-stock',
      image_url: '/product-images/register.png',
      user_id: adminUserId,
    },
    {
      name: 'Comfy Beige Set',
      description:
        'Comfortable beige set featuring a loose-fitting top and matching pants, perfect for lounging.',
      price: 49.99,
      category: 'Set',
      product_status: 'in-stock',
      image_url: '/product-images/leisure-1.png',
      user_id: adminUserId,
    },
    {
      name: 'Island Bae Set',
      description:
        'Casual set featuring a floral off-shoulder top and matching skirt, perfect for a day out in nature.',
      price: 59.99,
      category: 'Set',
      product_status: 'in-stock',
      image_url: '/product-images/product1.png',
      user_id: adminUserId,
    },
    {
      name: '90s Chill Dress',
      description:
        'Elegant floral dress with a deep V-neck, perfect for a garden party or summer wedding.',
      price: 69.99,
      category: 'Dress',
      product_status: 'in-stock',
      image_url: '/product-images/product2.png',
      user_id: adminUserId,
    },
    {
      name: 'Knit Set',
      description:
        'Relaxed beige top and pants set, ideal for comfortable and stylish home wear.',
      price: 44.99,
      category: 'Set',
      product_status: 'in-stock',
      image_url: '/product-images/movement.png',
      user_id: adminUserId,
    },
  ];

  const createdProducts = await Promise.all(
    testProducts.map(async (product) => {
      console.log('Creating product ->', product);
      const createdProduct = await createProduct(product);
      console.log('New Product ->', createdProduct);
      return createdProduct;
    })
  );

  console.log('Test Product Count ->', createdProducts.length);

  // Seed Reviews
  const reviewComments = ['Great product!', 'Very satisfied', 'Will buy again'];
  for (const product of createdProducts) {
    for (let i = 0; i < 3; i++) {
      const randomUser =
        createdUsers[Math.floor(Math.random() * createdUsers.length)];
      const reviewData = {
        product_id: product.id,
        user_id: randomUser.id,
        rating: Math.floor(Math.random() * 5) + 1,
        comment: reviewComments[i],
        modified_by: randomUser.id,
      };
      console.log('Creating review ->', reviewData);
      await createProductReview(
        reviewData.user_id,
        reviewData.product_id,
        reviewData.rating,
        reviewData.comment,
        reviewData.modified_by
      );
      console.log('Review created ->', reviewData);
    }
  }

  // Seed Orders
  for (const user of createdUsers) {
    for (let i = 0; i < 2; i++) {
      console.log('Creating order for user ->', user.id);
      const newOrder = await createCustomerOrder({
        userId: user.id,
        modifiedBy: adminUserId,
      });
      console.log('Order created ->', newOrder);

      const randomProduct =
        createdProducts[Math.floor(Math.random() * createdProducts.length)];
      const orderedItems = [
        {
          product_id: randomProduct.id,
          quantity: Math.floor(Math.random() * 5) + 1,
          product_price: randomProduct.price,
          total_price:
            randomProduct.price * (Math.floor(Math.random() * 5) + 1),
        },
      ];
      console.log('Adding ordered items ->', orderedItems);
      await addOrderedItems({
        orderId: newOrder.id,
        cartItems: orderedItems,
        modifiedBy: adminUserId,
      });
      console.log('Ordered items added ->', orderedItems);
    }
  }

  console.log('Database seeded successfully');
};

module.exports = {
  seedDatabase,
};
