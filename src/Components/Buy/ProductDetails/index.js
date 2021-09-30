import React, { useState, useEffect } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';

import { GetProductDetails } from '../../../services/GetProductDetails';
import AddItemToCart from '../../../services/AddItemToCart';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { DateRangePicker } from "materialui-daterange-picker";

export const ProductDetails = (props) => {

  const [productDetails, setProductDetails] = useState([]);
  const [purchaseType, setPurchaseType] = React.useState('buy');
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

  const handlePurchaseChange = (event, value) => {
    setPurchaseType(value);
    if(value === "rent") {
        console.log('rent');
        setOpen(true);
    } else {
        console.log('buy');
        setOpen(false);
        setDateRange({});
    }
  };

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

  const addToCart = (productDetails, isRent) => {
    const path = window.location.pathname;
    const itemId = path.split('/').pop();
    const itemDetails = {
      "customer_id" :1,
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
          
        </Grid>
        <Grid item xs={12} sm={7}>
          <h2 className="productName">{productDetails.item_name}</h2>

          <ToggleButtonGroup
            color="secondary"
            value={purchaseType}
            exclusive
            onChange={handlePurchaseChange}
          >
            <ToggleButton value="buy">Buy</ToggleButton>
            <ToggleButton value="rent" disabled={!productDetails.rental_price}>Rent</ToggleButton>
          </ToggleButtonGroup>

          { purchaseType === 'buy' ? <div className="productPrice">
            <span>Buy Price </span>
            <span>${productDetails.price}</span>

            <div className="buttonWrap">
              <Button variant="contained" className="addToCart" color="secondary" onClick={() => addToCart(productDetails)}>ADD TO CART</Button>
              <Button>ADD TO WISHLIST</Button>
            </div>
          </div> : null }

          {purchaseType === 'rent' ? <div className="productRentPriceWrap">
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
                <span className="boldText">$ {productDetails.rental_price * rentalDays}</span>
              </div>
            </div>

            <div className="buttonWrap">
              <Button variant="contained" className="addToCart" color="secondary" onClick={() => addToCart(productDetails, 'rent')}>ADD TO CART</Button>
              <Button>ADD TO WISHLIST</Button>
            </div>
          </div> : null }
          
          <div className="bottomBorder"></div>
          <div className="deliveryDetails">
            <span>Pickup at Mountain View Store</span>
            <span>Delivery from store to Sunnyvale, 94086</span>
            <span>Shiiping, arrives by Thu, Sep 30 to Sunnyvale 94086 </span>
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