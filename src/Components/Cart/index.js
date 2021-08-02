import React, {useEffect, useState} from 'react';

import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import GetCartDetails from '../../services/GetCartDetails';
import RemoveItemFromCart from '../../services/RemoveItemFromCart';

export const Cart = (props) => {
  
  const [cartDetails, setCartDetails] = useState([]);
  const [itemTotalPrice, setItemTotalPrice] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {    
    GetCartDetails(1).then(function (response) {
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
      "customer_id"  :1,
      "item_id" : cartItem.item_id
    }
    RemoveItemFromCart(itemDetails).then(function (response) {
      // const currentCart = cartDetails;
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
    setItemTotalPrice(itemPrice);
    const deliveryCharge = 20;
    setTotal(itemPrice + deliveryCharge);
  } 

  return (
    <Container className="myCart">
      <Grid container spacing={2}>
          <Grid container xs={12} sm={8} className="myCartLeftGrid">
            <h2>Cart Details</h2>
            {cartDetails.map((cartItem, index) => (
              <Grid container className="cartItem">
                <Grid item xs={12} sm={3}>
                  <img
                    src={cartItem.image}
                    alt="Product Details"
                    height="120"
                    width="120"
                    className="productImage"
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <h3>{cartItem.item_name}</h3>
                  <span className="link" onClick={() => removeFromCart(cartItem)}>Remove</span>
                </Grid>
                <Grid item xs={3} sm={3} className="cartItemPrice">
                  <span>${cartItem.price}</span>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12} sm={4} className="myCartRightGrid">
              <h2>Order Summary</h2>
              <div>
                <span>Subtotal {} Items</span>
                <span>${itemTotalPrice}</span>
              </div>
              <div>
                <span>Estimated Delivery</span>
                <span>${20.00}</span>
              </div>
              <div>
                <span>Estimated Total</span>
                <span>${total}</span>
              </div>
              <div className="buttonWrap">
                <Button variant='contained' color='secondary'>
                  CHECKOUT
                </Button>
              </div>
              
          </Grid>
      </Grid>
    </Container>
  );
}

export default Cart;