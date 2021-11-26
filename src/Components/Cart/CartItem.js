import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import { DateRangePicker } from "materialui-daterange-picker";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';

import UpdateCartRental from '../../services/UpdateCartRental';

const CartItem = (props) => {
  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState({startDate: props.cartItem.rentStartDate, endDate: props.cartItem.rentEndDate});
  const [oneditDates, setOneditDates] = React.useState(false);
  const [displayPrice, setDisplayPrice] = React.useState(props.cartItem.displayPrice);
 
  const toggle = () => setOpen(!open);


  const getpathQuery = (itemId) => {
    const pathQuery = "/productDetails/" + itemId;
    return {
        pathname: pathQuery
    };
  };

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
  
  const editDates = () => {
    setOpen(!open);
    setOneditDates(true);
  };
  const cancelChanges = () => {
    setOneditDates(false);
    setDateRange({startDate: props.cartItem.rentStartDate, endDate: props.cartItem.rentEndDate});
    setDisplayPrice(props.cartItem.displayPrice);
  };

  const onDateRangeChange = (range) => {
    setDateRange(range);
    const startDate = range.startDate.getTime();
    const endDate = range.endDate.getTime();
    const diffTime = Math.abs(endDate - startDate);
    const numberOfDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    let price = props.cartItem.rentalPrice ? props.cartItem.rentalPrice * numberOfDays : 0;
    if (props.cartItem.rental_price > 10) {
      price = price - price * 0.3;
    }
    setDisplayPrice(price);
  }

  const applyRentalChanges = (itemId, dateRange, displayPrice) => {
    const custDetails = JSON.parse(sessionStorage.getItem('customerDetails'))
    const itemDetails = {
      "customer_id"  :custDetails.custId,
      "item_id" : itemId,
      "rentStartDate": formatDate(dateRange.startDate),
      "rentEndDate": formatDate(dateRange.endDate),
      "displayPrice": displayPrice
    }
    UpdateCartRental(itemDetails).then(function (response) {
      alert("Rental dates updated successfully");
      setOneditDates(false);
    })
    .catch(function (error) {
      console.log('UpdateCartRental error', error);
    }); 
  }


  const cartItem = props.cartItem;
  return (
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
        <div className="cartShipment">
          <span>Shipment:
            {cartItem.deliveryOption === 0 ? ' Self Pickup' : ' Get it delivered'}
          </span>
          {cartItem.deliveryOption === 0 ?
            <span className="changeShipping" onClick={() => props.changeShipping(cartItem.item_id, 1)}>Get it delivered</span>
            : <span className="changeShipping" onClick={() => props.changeShipping(cartItem.item_id, 0)}>Change to Self Pickup</span>
          }
        </div>
        {cartItem.deliveryOption === 0 ? <span>Pickup Address: {cartItem.storeAddress}</span> : null }
        {cartItem.deliveryOption === 1 ? <span>Shipping charges: $5</span> : null }
        {cartItem.purchaseType === 'Rent' ?
          <div className="cartRentalDetails">
            <span>Rental Dates: {formatDate(dateRange.startDate)} to {formatDate(dateRange.endDate)}</span>
            <EditIcon className="editRentalChanges" onClick={() => editDates()} title="Edit Dates"/>
            {oneditDates ? 
              <div className="rentalDateIconWrap">
                <div title="Apply Changes" onClick={() => applyRentalChanges(cartItem.item_id, dateRange, displayPrice)}><CheckCircleIcon className="applyRentalChange"/></div>
                <div title="Cancel Changes" onClick={() => cancelChanges()}><CancelIcon className="cancelRentalChange"/></div>
              </div>
            : null}
          </div>
        : null}
        <DateRangePicker
          open={open}
          toggle={toggle}
          onChange={(range) => onDateRangeChange(range)}
          initialDateRange={dateRange}
        />
      </Grid>
      <Grid item xs={2} sm={3} className="cartItemPrice">
        <span>${displayPrice}</span>
        <span className="link" onClick={() => props.removeFromCart(cartItem)}>Remove</span>
      </Grid>
    </Grid>
  )
}

export default CartItem;