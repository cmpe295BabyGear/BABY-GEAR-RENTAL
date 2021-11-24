import React, { useEffect } from 'react';
import DeliveryAddresses from './DeliveryAddresses';
import CartItem from './CartItem';

const DeliverItems = (props) => {
  const [deliverItems, setDeliverItems] = React.useState([]);

  useEffect(() => {
    const itemList = props.cartDetails.filter(function(item){
      return item.deliveryOption === 1;
    });
    setDeliverItems(itemList)
  }, [props.cartDetails])

  
  return (
    <div className="cartItemDetails">
      <DeliveryAddresses />
      {deliverItems.map((cartItem, index) => (
        <CartItem 
          cartItem={cartItem}
          removeFromCart = {(cartItem) => props.removeFromCart(cartItem)}
          changeShipping = {(itemId, deliveryOption) => props.changeShipping(itemId, deliveryOption)}
        />
      ))}
    </div>
  )
}

export default DeliverItems;