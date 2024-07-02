import { API_URL } from './adminApiConfig';

//create products

const createProduct = async (productData, token) => {
  try {
    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key]);
    }

    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const newProduct = await response.json();
    console.log('New Product (API) -->', newProduct);
    return newProduct;
  } catch (error) {
    console.error('Error creating new product', error);
  }
};

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

// FormData() --> creates key value pairs for form items that are needed for image uploads
// FormData also manually collects form data and constructs an object, so don't need to use form in component --> cool!

const updateProduct = async (productId, productData, token) => {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });

    const updatedProduct = await response.json();
    console.log('Updated Product (API) -->', updatedProduct);
    return updatedProduct;
  } catch (error) {
    console.error('Error updating product:', error);
  }
};

const updateProductImage = async (productId, imageData, token) => {
  try {
    const response = await fetch(`${API_URL}/products/${productId}/image`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: imageData,
    });

    const updatedProduct = await response.json();
    console.log('Updated Product Image (API) -->', updatedProduct);
    return updatedProduct;
  } catch (error) {
    console.error('Error updating product image:', error);
  }
};

//delete product

const deleteProduct = async (productId, token) => {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 204) {
      console.log('Product deleted successfully');
    }
  } catch (error) {
    console.error('Error deleting product', error);
  }
};

export {
  createProduct,
  fetchAllProducts,
  fetchProduct,
  updateProduct,
  updateProductImage,
  deleteProduct,
};
