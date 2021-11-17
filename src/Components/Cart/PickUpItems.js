import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";

const PickUpItems = (props) => {
  const [pickupItems, setPickupItems] = React.useState([]);

  useEffect(() => {
    const itemList = props.cartDetails.filter(function(item){
      return item.deliveryOption === 0;
    });
    setPickupItems(itemList)
  }, [props.cartDetails])

  const getpathQuery = (itemId) => {
    const pathQuery = "/productDetails/" + itemId;
    return {
        pathname: pathQuery
    };
  };

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
      <h4>Pick Up</h4>
      {pickupItems.map((cartItem, index) => (
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
            <Link to={getpathQuery(cartItem.item_id)} style={{ textDecoration: 'none', display: 'block', color:"inherit" }}>
              <h3>{cartItem.item_name}</h3>
            </Link>
            <span>Purchase Type: {cartItem.purchaseType}</span>
            <span>Shipment:
              {cartItem.deliveryOption === 0 ? ' Self Pickup' : ' Get it delivered'}
            </span>
            {cartItem.purchaseType === 'Rent' ?
              <span>Selected Dates: {formatDate(cartItem.rentStartDate)} to {formatDate(cartItem.rentEndDate)}</span>
            : null}
          </Grid>
          <Grid item xs={2} sm={3} className="cartItemPrice">
            <span>${cartItem.price}</span>
            <span className="link" onClick={() => props.removeFromCart(cartItem)}>Remove</span>
          </Grid>
        </Grid>
      ))}
    </div>
  )
}

export default PickUpItems;