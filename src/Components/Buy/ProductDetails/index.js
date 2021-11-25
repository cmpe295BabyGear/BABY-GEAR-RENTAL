import React, { useState, useEffect } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import Radio from '@mui/material/Radio';

import { GetProductDetails } from '../../../services/GetProductDetails';
import { GetStoreDetails } from '../../../services/GetStoreDetails';
import AddItemToCart from '../../../services/AddItemToCart';
import { DateRangePicker } from "materialui-daterange-picker";

import GetCartDetails from '../../../services/GetCartDetails';

export const ProductDetails = (props) => {

  const [productDetails, setProductDetails] = useState([]);
  const [storeDetails, setStoreDetails] = useState({});
  const [dateRange, setDateRange] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [rentalDays, setRentalDays] = React.useState(0);
  const [custAddress, setCustAddress] = React.useState([]);
  const [rentalPrice, setRentalPrice] = React.useState(0);
  const [rentStartDate, setRentStartDate] = React.useState(new Date().getTime())
  const [rentEndDate, setRentEndDate] = React.useState(new Date().getTime())
  const [deliveryType, setDeliveryType] = React.useState('pickup');
  const [custId, setCustId] = React.useState(0)

  const onDateRangeChange = (range) => {
    setDateRange(range);
    const startDate = range.startDate.getTime();
    const endDate = range.endDate.getTime();
    const diffTime = Math.abs(endDate - startDate);
    const numberOfDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    setRentStartDate(formatDate(range.startDate));
    setRentEndDate(formatDate(range.endDate));
    setRentalDays(numberOfDays);
    console.log("dateRange", range);
  }

  const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
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

  const addToCart = (productDetails, price, purchaseType, storeDetails) => {
    const path = window.location.pathname;
    const itemId = path.split('/').pop();
    const custDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
    if (custDetails == null) {
      alert("Please login to view cart");
      return;
    }
    const customerId = custDetails.custId;
    GetCartDetails(customerId).then(function (res) {
      const cartList = res.cartList.filter(function(item){
        return item.item_id == itemId;
      });
      if (cartList.length === 0) { // Item not present in cart
        const itemDetails = {
          "customer_id" :customerId,
          "item_id" : itemId,
          "item_name" : productDetails.item_name,
          "categoryName" : productDetails.categoryName,
          "quantity" :1,
          "displayPrice" : price,
          "purchaseType" : productDetails.seller_preference === 'SELL' ? 'Buy' : 'Rent',
          "deliveryOption": deliveryType === 'pickup' ? 0 : 1,
          "rentStartDate": rentStartDate,
          "rentEndDate": rentEndDate,
          "rentalPrice": productDetails.rental_price,
          "storeAddress": storeDetails && storeDetails.address ? storeDetails.address : ''
        }
        AddItemToCart(itemDetails).then(function (response) {
          alert("Item added to cart");
          props.updateCartCount(Math.random());
        })
        .catch(function (error) {
          console.log('addItemToCart error', error);
        });
      } else {
        alert("Item is already present in the cart");
      }
    })
    .catch(function (error) {
      console.log('GetCartDetails error', error);
    });
 
  }

  const getRentalPrice = () => {
    let price = productDetails.rental_price ? productDetails.rental_price * rentalDays : 0;
    if (rentalDays > 10) {
      price = price - price * 0.3;
    }
    // setRentalPrice(price);
    return price;
  }
  
  const buyPrice = productDetails && productDetails.price ? productDetails.price : 0;
  
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
          <h2 className="productName">{productDetails && productDetails.item_name ? productDetails.item_name : ''}</h2>

          {/* <ToggleButtonGroup
            color="secondary"
            value={purchaseType}
            exclusive
            onChange={handlePurchaseChange}
          >
            <ToggleButton value="buy">Buy</ToggleButton>
            <ToggleButton value="rent" disabled={!productDetails.rental_price}>Rent</ToggleButton>
          </ToggleButtonGroup> */}

          { productDetails && productDetails.seller_preference === 'SELL' ? <div className="productPrice">
            <span>Buy Price </span>
            <span>${productDetails.price ? productDetails.price : 0}</span>

            <div className="buttonWrap">
              <Button variant="contained" className="addToCart" color="secondary" onClick={() => addToCart(productDetails, buyPrice, "buy")}>ADD TO CART</Button>
            </div>
          </div> : null }

          {productDetails && productDetails.seller_preference === 'RENT' ? <div className="productRentPriceWrap">
            <span>Select Rent Duration </span>
            {/* Date Range Selector */}
            <DateRangePicker
                open={open}
                // toggle={toggle}
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
                <span className="boldText">$ {getRentalPrice()}</span>
              </div>
            </div>

            <div className="buttonWrap">
              <Button variant="contained" className="addToCart" color="secondary" onClick={() => addToCart(productDetails, getRentalPrice(), "rent", storeDetails)}>ADD TO CART</Button>
              {/* <Button>ADD TO WISHLIST</Button> */}
            </div>
          </div> : null }
          
          <div className="bottomBorder"></div>
          <div className="deliveryDetails">
            <div>
              <Radio
              checked={deliveryType === 'pickup'}
              onChange={() => setDeliveryType('pickup')}
              value="pickup"
              name="radio-buttons"
              inputProps={{ 'aria-label': 'pickup' }}
              />Free Store Pickup at  
              { storeDetails ? 
              <span>{" " + storeDetails.address}</span>
              : null}
            </div>
            
            <div>
              <Radio
                checked={deliveryType === 'delivery'}
                onChange={() => setDeliveryType('delivery')}
                value="delivery"
                name="radio-buttons"
                inputProps={{ 'aria-label': 'delivery' }}
              />Get It Delivered at additional shipping charges
            </div>
            {/* <div>Shipping, arrives by Thu, Sep 30 to Sunnyvale 94086 </div> */}
          </div>

          <div className="bottomBorder"></div>
          <h3>Details</h3>
          <div className="productGrid">
            <span>Brand</span>
            <span>{productDetails && productDetails.brand}</span>
          </div>
          <div className="productGrid">
            <span>Category</span>
            <span>{productDetails && productDetails.categoryName}</span>
          </div>
          { productDetails && productDetails.seller_preference === 'SELL' ? <div className="productGrid">
            <span>Condition</span>
            <span>{productDetails && productDetails.condition}</span>
          </div> : null}
          <div className="productGrid">
            <span>Baby Age</span>
            <span>{productDetails && productDetails.baby_age} Months</span>
          </div>
          <div className="bottomBorder"></div>
          <h3>Description</h3>
          <div>
            <span>{productDetails && productDetails.description}</span>
          </div>

        </Grid> 
          
          
          
          
          
          
        </Grid>
    </Container>
  );
}

export default ProductDetails;