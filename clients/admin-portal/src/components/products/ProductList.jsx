


import React from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../API/adminApiConfig";
import { styled, useTheme } from '@mui/material/styles';
import { Button, Box, ListItem, Divider, Container, Typography } from "@mui/material";

const ProductList = ({ product }) => {
    const $imageUrl = `${BASE_URL}${product.image_url}`;
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/products/${product.id}/edit`); // Adjust the route as necessary
    };

    return (
     
        <Container >

        <Divider />
        <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <img src={$imageUrl} alt={product.name} style={{ width: 80, height: 80, marginRight: 10 }} />
            <Box sx={{flex: 1}}>
                <Typography variant='h6' noWrap>{product.name}</Typography>
                <Typography variant="body2">{product.description}</Typography>
            </Box>
         
            <Button variant="contained"  onClick={handleEdit} sx={{color: '#22223B', borderRadius: '2px'}}>
                Edit
            </Button>
        </ListItem>
        {/* <Divider /> */}
        </Container>
    
    );
};

export default ProductList;
