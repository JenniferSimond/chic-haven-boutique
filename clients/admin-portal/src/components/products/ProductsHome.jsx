

import React, { useState, useEffect } from "react";
import { fetchAllProducts } from '../../API/products';
import { Box, Container, Divider, List, TextField } from "@mui/material";
import ProductList from "./ProductList";

const ProductsHome = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const chicProducts = await fetchAllProducts();
                console.log('Products (productPage) -->', chicProducts);
                setProducts(chicProducts);
                setFilteredProducts(chicProducts);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };
        getProducts();
    }, []);

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase(); 
        const filterList = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        setFilteredProducts(filterList);
    };

    return (
        <Container>
            
            <Box sx={{ padding: 1, position: 'sticky', top: 0, zIndex: 10, backgroundColor: '#9A8C98' }}>
                <TextField
                    fullWidth
                    // label="Search Products"
                    variant="outlined"
                    onChange={handleSearch}
                   sx={{
                    color: '#22223B',
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
                                backgroundColor: '#F9F5E3', //setting background color for onFocous
                                color: '#22223B',
                            },
                
                }}
                   
                />
            </Box>
          <Box sx={{pt: 2}} >
            <List sx={{maxHeight: '70vh', overflowY: 'auto'}}>
          
                {filteredProducts.map(product => (
                    <ProductList key={product.id} product={product} />
                ))}

            </List>
            </Box>
        </Container>
    );
};

export default ProductsHome;
