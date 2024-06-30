

// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getAdminToken } from "../../shared/adminAuth";
// import { BASE_URL } from "../../API/apiConfig";
// import { fetchProduct, updateProduct, deleteProduct } from "../../API/products";
// import { Box, Button, Container, TextField, Typography } from "@mui/material";

// const ManageProduct = () => {
//   const navigate = useNavigate();
//   const { productId } = useParams();
//   const token = getAdminToken();

//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [productFormData, setProductFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     category: '',
//     product_status: ''
//   });

//   useEffect(() => {
//     const getProductById = async () => {
//       try {
//         const fetchedProduct = await fetchProduct(productId);
//         console.log('Fetched Product (product) -->', fetchedProduct);
//         setSelectedProduct(fetchedProduct);
//         setProductFormData({
//           name: fetchedProduct.name,
//           description: fetchedProduct.description,
//           price: fetchedProduct.price,
//           category: fetchedProduct.category,
//           product_status: fetchedProduct.product_status
//         });
//       } catch (error) {
//         setSelectedProduct(null); // Reset selected product if error
//         console.error('Failed to fetch product', error);
//       }
//     };

//     if (productId) {
//       getProductById();
//     }
//   }, [productId]); // Re-run the effect if productId changes

//   // Handle text input change
//   const handleTextInputChange = (event) => {
//     const { name, value } = event.target;
//     setProductFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   // Handle update button click
//   const handleUpdate = async (event) => {
//     event.preventDefault();
//     try {
//       await updateProduct(productId, productFormData, token);
//       navigate('/products');
//     } catch (error) {
//       console.error('Error updating product:', error);
//     }
//   };

//   // Handle delete button click
//   const handleDelete = async () => {
//     try {
//       await deleteProduct(productId, token);
//       navigate('/products');
//     } catch (error) {
//       console.error('Product Deletion Failed:', error);
//     }
//   };

//   if (!selectedProduct) {
//     return (
//       <Container>
//         <Box>
//           <Typography>Product Not Found!</Typography>
//         </Box>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <Box>
//         <Box sx={{ textAlign: 'center', mt: 0 }}>
//           <Typography variant='h3'>{selectedProduct.name}</Typography>
//           <Box component="img" src={`${BASE_URL}${selectedProduct.image_url}`} alt={selectedProduct.name} sx={{ maxWidth: 250, maxHeight: 250, mt: 2, borderRadius: '4px' }} />
//           <form onSubmit={handleUpdate}>
//             <TextField
//               label="Name"
//               name="name"
//               value={productFormData.name}
//               onChange={handleTextInputChange}
//               margin="normal"
//               size="small"
//               fullWidth
//             />
//             <TextField
//               label="Description"
//               name="description"
//               value={productFormData.description}
//               onChange={handleTextInputChange}
//               margin="normal"
//               size="small"
//               fullWidth
//             />
//             <TextField
//               label="Price"
//               name="price"
//               value={productFormData.price}
//               onChange={handleTextInputChange}
//               margin="normal"
//               size="small"
//               fullWidth
//             />
//             <TextField
//               label="Category"
//               name="category"
//               value={productFormData.category}
//               onChange={handleTextInputChange}
//               margin="normal"
//               size="small"
//               fullWidth
//             />
//             <TextField
//               label="Status"
//               name="product_status"
//               value={productFormData.product_status}
//               onChange={handleTextInputChange}
//               margin="normal"
//               size="small"
//               fullWidth
//             />
//             <Box sx={{ mt: 2 }}>
//               <Button variant="contained" color="primary" type="submit" sx={{ mr: 2 }}>
//                 Update Product
//               </Button>
//               <Button variant="contained" color="secondary" onClick={handleDelete}>
//                 Delete Product
//               </Button>
//             </Box>
//           </form>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default ManageProduct;


import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAdminToken } from "../../shared/adminAuth";
import { BASE_URL } from "../../API/apiConfig";
import { fetchProduct, updateProduct, updateProductImage, deleteProduct } from "../../API/products";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

const ManageProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const token = getAdminToken();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [productFormData, setProductFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    product_status: ''
  });

  useEffect(() => {
    const getProductById = async () => {
      try {
        const fetchedProduct = await fetchProduct(productId);
        console.log('Fetched Product (product) -->', fetchedProduct);
        setSelectedProduct(fetchedProduct);
      } catch (error) {
        setSelectedProduct(null); // Reset selected product if error
        console.error('Failed to fetch product', error);
      }
    };

    if (productId) {
      getProductById();
    }
  }, [productId]); // Re-run the effect if productId changes

  // Handle text input change
  const handleTextInputChange = (event) => {
    const { name, value } = event.target;
    setProductFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle image file change
  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  // Handle update button click
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const updatedProductData = {
        name: productFormData.name || selectedProduct.name,
        description: productFormData.description || selectedProduct.description,
        price: parseFloat(productFormData.price) || parseFloat(selectedProduct.price),
        category: productFormData.category || selectedProduct.category,
        product_status: productFormData.product_status || selectedProduct.product_status,
      };
  
      await updateProduct(productId, updatedProductData, token);
  
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        await updateProductImage(productId, formData, token);
      }
  
      navigate('/products');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  

  // Handle delete button click
  const handleDelete = async () => {
    try {
      await deleteProduct(productId, token);
      navigate('/products');
    } catch (error) {
      console.error('Product Deletion Failed:', error);
    }
  };

  if (!selectedProduct) {
    return (
      <Container>
        <Box>
          <Typography>Loading...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box>
        <Box sx={{ textAlign: 'center', mt: 0 }}>
          <Typography variant='h3'>{selectedProduct.name}</Typography>
          <Box component="img" src={`${BASE_URL}${selectedProduct.image_url}`} alt={selectedProduct.name} sx={{ maxWidth: 250, maxHeight: 250, mt: 2, borderRadius: '4px' }} />
          <form onSubmit={handleUpdate}>
            <TextField
              label="Name"
              placeholder="Enter new name"
              name="name"
              value={productFormData.name}
              onChange={handleTextInputChange}
              margin="normal"
              size="small"
              fullWidth
            />
            <TextField
              label="Description"
              placeholder="Enter new description"
              name="description"
              value={productFormData.description}
              onChange={handleTextInputChange}
              margin="normal"
              size="small"
              fullWidth
            />
            <TextField
              label="Price"
              placeholder="Enter new price"
              name="price"
              value={productFormData.price}
              onChange={handleTextInputChange}
              margin="normal"
              size="small"
              fullWidth
            />
            <TextField
              label="Category"
              placeholder="Enter new category"
              name="category"
              value={productFormData.category}
              onChange={handleTextInputChange}
              margin="normal"
              size="small"
              fullWidth
            />
            <TextField
              label="Status"
              name="product_status"
              placeholder="Enter new status"
              value={productFormData.product_status}
              onChange={handleTextInputChange}
              margin="normal"
              size="small"
              fullWidth
            />
            <Button variant="contained" component="label">
              Upload Image
              <input type="file" hidden onChange={handleImageChange} />
            </Button>
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" color="primary" type="submit" sx={{ mr: 2 }}>
                Update Product
              </Button>
              <Button variant="contained" color="secondary" onClick={handleDelete}>
                Delete Product
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default ManageProduct;

