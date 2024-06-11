const { createUserCustomer, createAdmin, createProduct } = require('./index');

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
  ];

  const createdUser = await Promise.all(testUsers.map(createUserCustomer));
  console.log('Test Users ->', createdUser);

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

  const newTestAdmin = await Promise.all(testAdmins.map(createAdmin));
  console.log('Test admins ->', newTestAdmin);

  const adminUserId = newTestAdmin.find(
    (admin) => admin.user_role === 'super_admin'
  ).id;
  console.log('Super admin id ->', adminUserId);

  const testProducts = [
    {
      name: 'Boho-Chic dress',
      description: 'blue and white a-line dress made of breathable cotton.',
      price: 35.95,
      category: 'Dress',
      product_status: 'in-stock',
      user_id: adminUserId,
    },
    {
      name: 'High-Waisted Jeans',
      description: 'High-waisted blue jeans.',
      price: 25.5,
      category: 'Pants',
      product_status: 'in-stock',
      user_id: adminUserId, // <-- gets new id each time it is made
    },
    {
      name: 'Leather Jacket',
      description: 'Calf skin leather jacket.',
      price: 450.25,
      category: 'Jacket',
      product_status: 'in-stock',
      user_id: adminUserId,
    },
  ];

  const newTestProducts = await Promise.all(
    testProducts.map(async (product) => {
      console.log('Creagting product ->', product);
      const createdProduct = await createProduct(product);
      console.log('New Product ->', createdProduct);
    })
  );
};

module.exports = {
  seedDatabase,
};
