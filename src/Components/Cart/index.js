import React, {useEffect, useState} from 'react';

import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import GetCartDetails from '../../services/GetCartDetails';
import RemoveItemFromCart from '../../services/RemoveItemFromCart';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import GetCustomerAddresses from '../../services/GetCustomerAddresses';
import UpdateCartShipping from '../../services/UpdateCartShipping';

import PickUpItems from './PickUpItems';
import DeliverItems from './DeliverItems';

export const Cart = (props) => {
  
  const [cartDetails, setCartDetails] = useState([]);
  const [itemTotalPrice, setItemTotalPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [itemTaxes, setItemTaxes] = useState(0);
  const [deliveryType, setDeliveryType] = useState("pickup");
  const [custId, setCustId] = useState(0)

  useEffect(() => {    
    
    const customerId = JSON.parse(sessionStorage.getItem('customerDetails')).custId;
    setCustId(customerId);
    GetCartDetails(customerId).then(function (response) {
      setCartDetails(response.cartList);
      console.log('GetCartDetails', response);

      getTotalPrice(response.cartList);
    })
    .catch(function (error) {
      setCartDetails(null);
        console.log('GetCartDetails error', error);
    }); 
  }, []);

  const removeFromCart = (cartItem) => {
    const itemDetails = {
      "customer_id"  :custId,
      "item_id" : cartItem.item_id
    }
    RemoveItemFromCart(itemDetails).then(function (response) {
      const filteredArray = cartDetails.filter((item) => {return item.item_id !== cartItem.item_id});
      setCartDetails(filteredArray);
      props.updateCartCount(Math.random());
      alert("Item removed from cart");

    })
    .catch(function (error) {
      console.log('RemoveItemFromCart error', error);
    }); 
  }

  const getTotalPrice = (cartDetails) => {
    const itemPrice = cartDetails.map(cartItem => {
      return cartItem.price;
    }).reduce(function(a, b){
      return a + b;
    }, 0);

    const itemTaxes = cartDetails.map(cartItem => {
      const price = (7.25 / 100) * cartItem.price;
      return price;
    }).reduce(function(a, b){
      return a + b;
    }, 0);

    const deliveredItemList = cartDetails.filter(function(item){
      return item.deliveryOption === 1;
    });
    const delivery = deliveredItemList.length * 5;

    setItemTotalPrice(itemPrice);
    setItemTaxes(itemTaxes);
    setDeliveryCharges(delivery);
    setTotal(itemPrice + delivery + itemTaxes);
  } 

  const getDeliveryAddress = (id) => {
    GetCustomerAddresses(custId)
    .then(function (res) {
      const selectedAddress =  res.filter(function(itm){
        return itm.id === id;
      });
      return selectedAddress[0].formatted_address;
    })
    .catch(function (err) {
      return ""
    })
  }

  const changeShipping = (itemId, changeShipping) => {
    const itemDetails = {
      "customer_id"  :custId,
      "item_id" : itemId,
      "deliveryOption": changeShipping
    }
    UpdateCartShipping(itemDetails).then(function (response) {
      alert("Delivery option updated successfully");
      GetCartDetails(custId).then(function (response) {
        setCartDetails(response.cartList);
        console.log('GetCartDetails', response);
  
        getTotalPrice(response.cartList);
      })
      .catch(function (error) {
        setCartDetails(null);
          console.log('GetCartDetails error', error);
      });
    })
    .catch(function (error) {
      console.log('UpdateCartShipping error', error);
    }); 
  }
  return (
    <Container className="myCart">
      <Grid container spacing={2}>
          <Grid container xs={12} sm={8} className="myCartLeftGrid">
            <h2>Cart Details</h2>
            {/* <div className="cartDeliveryWrap">
              <h3>Select Delivery Option</h3>
              <ToggleButtonGroup
                color="secondary"
                value={deliveryType}
                exclusive
                onChange={(event) => setDeliveryType(event.target.value)}
              >
                <ToggleButton value="pickup">Pickup</ToggleButton>
                <ToggleButton value="deliver">Get it delivered</ToggleButton>
              </ToggleButtonGroup>
            </div> */}
            <PickUpItems 
              removeFromCart = {(cartItem) => removeFromCart(cartItem)}
              changeShipping = {(itemId, deliveryOption) => changeShipping(itemId, deliveryOption)}
              cartDetails={cartDetails}
            />
            <DeliverItems
              removeFromCart = {(cartItem) => removeFromCart(cartItem)}
              changeShipping = {(itemId, deliveryOption) => changeShipping(itemId, deliveryOption)}
              cartDetails={cartDetails}
            />
            
          </Grid>
          <Grid item xs={12} sm={4} className="myCartRightGrid">
              <h2>Order Details</h2>
              <div>
                <span>Subtotal {} Items</span>
                <span>${itemTotalPrice}</span>
              </div>
              <div>
                <span>Estimated Delivery</span>
                <span>${deliveryCharges}</span>
              </div>
              <div>
                <span>Taxes</span>
                <span>${itemTaxes}</span>
              </div>
              <div>
                <span>Estimated Total</span>
                <span>${total}</span>
              </div>
              <div className="buttonWrap">
                <Button variant='contained' color='secondary'>
                  Pay Now
                </Button>
              </div>
              
          </Grid>
      </Grid>
    </Container>
  );
}

export default Cart;