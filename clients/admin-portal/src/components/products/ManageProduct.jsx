import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "@mui/material";
import { getAdminToken } from "../../shared/adminAuth";
import { fetchProduct } from "../../API/products";

const ManageProduct = () => {

    const token = getAdminToken()
    const [selectedProduct, setSelectedProduct] = useState('');
    const { productId } = useParams();
    const navigate = useNavigate();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const fetchedProduct = await fetchProduct(productId);
        console.log('Fetched Product (product) -->', fetchedProduct);
        setSelectedProduct(fetchedProduct);
      } catch (error) {
        // reset selected product if error
        setSelectedProduct('');
        console.error('Failed to fetch product', error);
      }
    };

    if (productId) {
      getProductById();
    }
  }, [productId]);



    return(
       <Container>
       
       </Container>
    )
};

export default ManageProduct