
// import React, {useState, useEffect} from "react";
// import {fetchAllProducts} from '../../API/products'
// import { Box, Container } from "@mui/material";


// const ProductsHome = () => {
//     const [products, setProducts] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);


//     useEffect(() => {
//         const getProducts = async () => {

//             try {
//                 const chicProducts = await fetchAllProducts()
//                 console.log('Products (productPage) -->',chicProducts); 
//                 setProducts(chicProducts) 
//                 setFilteredProducts(chicProducts)
               
//             } catch (error) {
//               console.error(error)
//             }
//         }
//         getProducts()
        
//     },[]); // dependency array --> controls when useEffect is called --> empty array means -> the side-effect runs once after the initial rendering.
   
//    const handleSearch = (event) => {
//     const searchTerm = event.target.value.toLoserCase()
//     const filterList = products.filter(product => product.name.toLoserCase().includes(searchTerm).toLoserCase())

//     setFilteredProducts(filterList)
//    }

//     //map over product and sent to productList component

//     return(
//         <Container>
//             {/* search */}
//             <Box>
//                 {/* list */}
//             </Box>
//         </Container>
//     );
// }

// export default ProductsHome


import React, { useState, useEffect } from "react";
import { fetchAllProducts } from '../../API/products';
import { Box, Container, TextField } from "@mui/material";
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
            <Box sx={{ padding: 2 }}>
                <TextField
                    fullWidth
                    label="Search Products"
                    variant="outlined"
                    onChange={handleSearch}
                />
            </Box>
            <Box>
                {filteredProducts.map(product => (
                    <ProductList key={product.id} product={product} />
                ))}
            </Box>
        </Container>
    );
};

export default ProductsHome;
