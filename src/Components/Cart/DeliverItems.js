import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import DeliveryAddresses from './DeliveryAddresses';

const DeliverItems = (props) => {
  const [deliverItems, setDeliverItems] = React.useState([]);

  useEffect(() => {
    const itemList = props.cartDetails.filter(function(item){
      return item.deliveryOption === 1;
    });
    setDeliverItems(itemList)
  }, [props.cartDetails])

  const formatDate = (val) => {
    const receivedDate = Number(val);
    var date = new Date(receivedDate);

    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;
    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;
    sec = (sec < 10 ? "0" : "") + sec;

    var str = date.getFullYear() + "-" + month + "-" + day;
    return str;

  }

  return (
    <div className="cartItemDetails">
      <DeliveryAddresses />
      {deliverItems.map((cartItem, index) => (
        <Grid container className="cartItem">
          <Grid item xs={4} sm={3}>
            <img
              src={cartItem.image}
              alt="Product Details"
              height="120"
              width="120"
              className="productImage"
            />
          </Grid>
          <Grid item xs={6} sm={6} className="cartItemDetails">
            <h3>{cartItem.item_name}</h3>
            <span>Purchase Type: {cartItem.purchaseType}</span>
            <div className="cartShipment">
              <span>Shipment:
                {cartItem.deliveryOption === 0 ? ' Self Pickup' : ' Get it delivered'}
              </span>
              <span className="changeShipping" onClick={() => props.changeShipping(cartItem.item_id, 0)}>Change to Self Pickup</span>
            </div>

            <span>Shipping charges: $5</span>

            {cartItem.purchaseType === 'Rent' ?
              <span>Selected Dates: {formatDate(cartItem.rentStartDate)} to {formatDate(cartItem.rentEndDate)}</span>
            : null}
          </Grid>
          <Grid item xs={2} sm={3} className="cartItemPrice">
            <span>${cartItem.displayPrice}</span>
            <span className="link" onClick={() => props.removeFromCart(cartItem)}>Remove</span>
          </Grid>
        </Grid>
      ))}
    </div>
  )
}

export default DeliverItems;