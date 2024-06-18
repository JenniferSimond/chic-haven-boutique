import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchAllProducts } from "../../API/product";
import { ProductCard } from "./ProductCard";
import styled from "styled-components";

const ProductSection = styled.div`
margin-top: 0px;

width: 100vw;
`
const ProductWrapper = styled.div`
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   row-gap: 45px;
   column-gap: 40px;
   justify-content: flex-start;  // Aligns items to the left
   align-content: flex-start;
   width: 90%;  // Adjustable as per design needs
   max-height: 700px;
   overflow-y: auto;
   margin-left: 90px;
    margin-top: 25px;

`


const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const location = useLocation();

    //()=> {} --> callback function is the body of useEffect 
    useEffect(() => {
        const getProducts = async () => {

            try {
                const chicProducts = await fetchAllProducts()
                console.log('Products (productPage) -->',chicProducts); 
                setProducts(chicProducts) 
                setFilteredProducts(chicProducts)
               
            } catch (error) {
              console.error(error)
            }
        }
        getProducts()
        console.log('Products (state) ->',products)
    },[]); // dependency array --> controls when useEffect is called --> empty array means -> the side-effect runs once after the initial rendering.
    
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchTermQuery = params.get('search') || '';
        const filter = products.filter(product =>
            product.name.toLowerCase().includes(searchTermQuery.toLocaleLowerCase())
        );
        setFilteredProducts(filter)
    }, [products, location.search]);

return(
    <ProductSection>

    <ProductWrapper>
        {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product}/>
        ))}
    </ProductWrapper>
    </ProductSection>
    
)
}



export default Products