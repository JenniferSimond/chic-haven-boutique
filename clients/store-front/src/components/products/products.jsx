import React, { useState, useEffect } from "react";
import { fetchAllProducts } from "../../API/product-cart";
import styled from "styled-components";

const ProductWrapper = styled.div`

`

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    //()=> {} --> callback function is the body of useEffect 
    useEffect(() => {
        const getProducts = async () => {

            try {
                const chicProducts = await fetchAllProducts()
                console.log('Products (productPage) -->',chicProducts); 
                setProducts(chicProducts) 
                console.log('Products (state) ->',products)
            } catch (error) {
              console.error(error)
            }
            
        }
        getProducts()
    
    },
[]) // dependency array --> controls when useEffect is called --> empty array means -> the side-effect runs once after the initial rendering.
    
    return(
        <>
        <ProductWrapper>


        </ProductWrapper>
        </>
    );
}

export default Products