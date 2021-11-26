import React, { useEffect } from 'react';
import CartItem from './CartItem';

const PickUpItems = (props) => {
  const [pickupItems, setPickupItems] = React.useState([]);

  useEffect(() => {
    const itemList = props.cartDetails.filter(function(item){
      return item.deliveryOption === 0;
    });
    setPickupItems(itemList)
  }, [props.cartDetails])

  return (
    <div className="cartItemDetails">
      <h4>Pick Up</h4>
      {pickupItems.map((cartItem, index) => (
        <CartItem 
          cartItem={cartItem}
          removeFromCart = {(cartItem) => props.removeFromCart(cartItem)}
          changeShipping = {(itemId, deliveryOption) => props.changeShipping(itemId, deliveryOption)}
        />
      ))}
    </div>
  )
}

export default PickUpItems;