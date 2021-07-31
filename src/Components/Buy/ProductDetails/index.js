import React, { useState, useEffect } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';

import { GetProductDetails } from '../../../services/GetProductDetails';
import AddItemToCart from '../../../services/AddItemToCart';

export const ProductDetails = (props) => {

  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {    
    const path = window.location.pathname;
    const itemId = path.split('/').pop();
    GetProductDetails(itemId).then(function (response) {
      setProductDetails(response);
      console.log('GetProductDetails', response);
    })
    .catch(function (error) {
      setProductDetails(null);
        console.log('GetProductDetails error', error);
    }); 
  }, []);

  const addToCart = (productDetails) => {
    const path = window.location.pathname;
    const itemId = path.split('/').pop();
    const itemDetails = {
      "customer_id"  :1,
      "item_id" : itemId,
      "item_name" : productDetails.item_name,
      "categoryName" : productDetails.categoryName,
      "quantity" :1
    }
    AddItemToCart(itemDetails).then(function (response) {
      alert("Item added to cart");
      props.updateCartCount(Math.random());
    })
    .catch(function (error) {
      console.log('addItemToCart error', error);
    }); 
  }

  return (
    <Container maxWidth="md" className="productDetails">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <img
            src={productDetails ? productDetails.image : ''}
            alt="Product Details"
            height="300"
            width="300"
            className="productImage"
          />
          <div className="buttonWrap">
            <Button variant="contained" color="secondary" onClick={() => addToCart(productDetails)}>ADD TO CART</Button>
            <Button>ADD TO WISHLIST</Button>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <h2 className="productName">{productDetails.item_name}</h2>
          <div className="productPrice">
            <span>Buy Price </span>
            <span>${productDetails.price}</span>
          </div>
          <h3>Details</h3>
          <div className="productGrid">
            <span>Brand</span>
            <span>{productDetails.brand}</span>
          </div>
          <div className="productGrid">
            <span>Category</span>
            <span>{productDetails.categoryName}</span>
          </div>
          <div className="productGrid">
            <span>Condition</span>
            <span>{productDetails.condition}</span>
          </div>
          <div className="productGrid">
            <span>Baby Age</span>
            <span>{productDetails.baby_age} Months</span>
          </div>
          <div className="bottomBorder"></div>
          <h3>Description</h3>
          <div>
            <span>{productDetails.description}</span>
          </div>

        </Grid> 
          
          
          
          
          
          
        </Grid>
    </Container>
  );
}

export default ProductDetails;