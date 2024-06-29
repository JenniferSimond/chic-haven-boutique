


import React from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../API/apiConfig";
import { styled, useTheme } from '@mui/material/styles';
import { Button, Box } from "@mui/material";

const ProductList = ({ product }) => {
    const $imageUrl = `${BASE_URL}${product.image_url}`;
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/products/${product.id}/edit`); // Adjust the route as necessary
    };

    return (
        <Box sx={{ marginBottom: 2 }}>
            <img src={$imageUrl} alt={product.name} style={{ width: '100px', height: '100px' }} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <Button variant="contained" onClick={handleEdit}>
                Edit
            </Button>
        </Box>
    );
};

export default ProductList;
