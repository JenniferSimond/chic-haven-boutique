import { API_URL } from './apiConfig';

const fetchAllProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    const products = await response.json();

    console.log('Products (API) -->', products);
    return products;
  } catch (error) {
    console.error('Error fetching Products', error);
  }
};

const fetchProduct = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`);
    const product = await response.json();
    console.log('Product (API) -->', product);
    return product;
  } catch (error) {
    console.error('Error fetching product', error);
  }
};

export { fetchAllProducts, fetchProduct };
