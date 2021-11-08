import React, { useState, useEffect } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';

import { GetProductDetails } from '../../../services/GetProductDetails';
import { GetStoreDetails } from '../../../services/GetStoreDetails';
import AddItemToCart from '../../../services/AddItemToCart';
import { DateRangePicker } from "materialui-daterange-picker";
import Tooltip from '@mui/material/Tooltip';

export const ProductDetails = (props) => {

  const [productDetails, setProductDetails] = useState([]);
  const [storeDetails, setStoreDetails] = useState({});
  const [dateRange, setDateRange] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [rentalDays, setRentalDays] = React.useState(0);
    
  const toggle = () => {
    setOpen(!open)
    console.log(dateRange);
  };

  const onDateRangeChange = (range) => {
    setDateRange(range);
    const startDate = range.startDate.getTime();
    const endDate = range.endDate.getTime();
    const diffTime = Math.abs(endDate - startDate);
    const numberOfDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    setRentalDays(numberOfDays);
  }

  useEffect(() => {    
    const path = window.location.pathname;
    const itemId = path.split('/').pop();
    GetProductDetails(itemId).then(function (response) {
      setProductDetails(response);
      console.log('GetProductDetails', response);
      if(response.seller_preference === 'RENT') {
        setOpen(true);
      }
      GetStoreDetails(response.store_zipcode).then(function (store_response) {
        setStoreDetails(store_response);
        console.log('GetStoreDetails', store_response);
      })
      .catch(function (error) {
        setStoreDetails(null);
          console.log('GetStoreDetails error', error);
      }); 
    })
    .catch(function (error) {
      setProductDetails(null);
        console.log('GetProductDetails error', error);
    }); 
  }, []);

  const addToCart = (productDetails, price, purchaseType) => {
    const path = window.location.pathname;
    const itemId = path.split('/').pop();
    const itemDetails = {
      "customer_id" :1,
      "item_id" : itemId,
      "item_name" : productDetails.item_name,
      "categoryName" : productDetails.categoryName,
      "quantity" :1,
      "price" : price,
      "purchaseType" : productDetails.seller_preference === 'SELL' ? 'Buy' : 'Rent'
    }
    AddItemToCart(itemDetails).then(function (response) {
      alert("Item added to cart");
      props.updateCartCount(Math.random());
    })
    .catch(function (error) {
      console.log('addItemToCart error', error);
    }); 
  }

  const rentalPrice = productDetails.rental_price ? productDetails.rental_price * rentalDays : 0;
  const buyPrice = productDetails.price ? productDetails.price : 0;
  
  return (
    <Container maxWidth="md" className="productDetails">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5} className="textAlignCenter">
          <img
            src={productDetails ? productDetails.image : ''}
            alt="Product Details"
            height="300"
            width="300"
            className="productImage"
          />
          
        </Grid>
        <Grid item xs={12} sm={7}>
          <h2 className="productName">{productDetails.item_name}</h2>

          {/* <ToggleButtonGroup
            color="secondary"
            value={purchaseType}
            exclusive
            onChange={handlePurchaseChange}
          >
            <ToggleButton value="buy">Buy</ToggleButton>
            <ToggleButton value="rent" disabled={!productDetails.rental_price}>Rent</ToggleButton>
          </ToggleButtonGroup> */}

          { productDetails.seller_preference === 'SELL' ? <div className="productPrice">
            <span>Buy Price </span>
            <span>${productDetails.price}</span>

            <div className="buttonWrap">
              <Button variant="contained" className="addToCart" color="secondary" onClick={() => addToCart(productDetails, buyPrice, "buy")}>ADD TO CART</Button>
              <Button>ADD TO WISHLIST</Button>
            </div>
          </div> : null }

          {productDetails.seller_preference === 'RENT' ? <div className="productRentPriceWrap">
            <span>Select Rent Duration </span>
            {/* Date Range Selector */}
            <DateRangePicker
                open={open}
                toggle={toggle}
                onChange={(range) => onDateRangeChange(range)}
                // closeOnClickOutside={false}
            
            />
            <div className="rentDetails">
              <div>
                <span>Price per day</span>
                <span>$ {productDetails.rental_price}</span>
              </div>
              <div>
                <span>Number of Days</span>
                <span>{rentalDays}</span>
              </div>
              <div>
                <span>Total Rental Fee</span>
                <span className="boldText">$ {rentalPrice}</span>
              </div>
            </div>

            <div className="buttonWrap">
              <Button variant="contained" className="addToCart" color="secondary" onClick={() => addToCart(productDetails, rentalPrice, "rent")}>ADD TO CART</Button>
              <Button>ADD TO WISHLIST</Button>
            </div>
          </div> : null }
          
          <div className="bottomBorder"></div>
          <div className="deliveryDetails">
            <div>Free Store Pickup at 
              { storeDetails ? 
              <Tooltip title={storeDetails.address}><span>{storeDetails.name}</span></Tooltip>
              : null}
            </div>
            {/* <div>Pickup at nearest <span>UPS store</span> with shipping charges applied</div> */}
            <div>Delivery from store to <span>Sunnyvale, 94086</span></div>
            {/* <div>Shipping, arrives by Thu, Sep 30 to Sunnyvale 94086 </div> */}
          </div>

          <div className="bottomBorder"></div>
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