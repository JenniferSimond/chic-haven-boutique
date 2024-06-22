import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchAllProducts } from "../../API/product";
import { ProductCard } from "./ProductCard";
import Sidebar from "../shared/SideBar";
import styled from "styled-components";

const ProductSection = styled.div`
// margin-top: 2%;
overflow-y: hidden;
width: 100%;
// margin-bottom: 5%;
// background-color: red;
`
const ProductWrapper = styled.div`
    // background-color: blue;
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   row-gap: 40px;
   column-gap: 40px;
   justify-content: flex-start;  // Aligns items to the left
   align-content: flex-start;
   width: 90%;  
   max-height: 99.2%;
//    overflow-y: auto;
  margin-bottom: 2%;
    margin-top: 2%;
    

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