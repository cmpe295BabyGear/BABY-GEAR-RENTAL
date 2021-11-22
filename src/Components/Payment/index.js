import React, { useRef, useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Button from '@mui/material/IconButton'
import './style.css'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import CommitOrderDetails from '../../services/CommitOrderDetails';
import DeleteCartItems from '../../services/DeleteCartItems';
import CheckoutCart from '../../services/CheckoutCart';
import UpdateItemStatusOnOrder from '../../services/UpdateItemStatusOnOrder';
import { useHistory } from 'react-router-dom';

const Payment = (props) => {
  const history = useHistory();
  const [totalPrice, setTotalPrice] = React.useState(props.totalPrice)
  // const classes = useStyles()

  useEffect (() => {
    console.log('payment props .....', props)
    
  }, [])

  return (
    <div>
      {/* <PayPalScriptProvider options={{'client-id' : 'ATlJZgQoBmctMvDCbTN_hiQuh2kvR7dAoZhaIK8P6oDpZSubd1or7M32xwr-i-2y0XNpUqWUmMZPa-NP'}}> */}
      <PayPalButtons style={{ layout: "horizontal" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: props.totalPrice
                }
              }
            ]
          })
      }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(details => {
            // commit cart items for order 
            // CommitOrderDetails(props.customerId).then(function (response) {
            //   // delete cart items of the customer 
            //   console.log('order details committed successfully')
            //   DeleteCartItems(props.customerId).then(function (delResponse) {
            //     console.log('cart cleared successfully')
            //     UpdateItemStatusOnOrder(props.itemList).then(function (updResp) {
            //       console.log('item status updated successfully')
            //       history.push('/myOrders');
            //     }).catch(function (delErr) {
            //       console.log('Unable to update item status', delErr)
            //     })
            //   }).catch(function (delErr) {
            //     console.log('Unable to clear cart', delErr)
            //   })
            // }).catch(function (err) {
            //   console.log('Unable to commit order details', err)
            // })

            // alert('Payment successful.')
            CheckoutCart(props.customerId, props.itemList).then(function (response) {
              console.log('cart checkout complete ')
              history.push('/myOrders');
            }).catch(function (err){
              console.log(err)
            })
          })
        }}
        onCancel={() => {
          console.log('You cancelled the payment')
          alert('You cancelled the Payment !')
        }}
        onError={() => {
          console.log('Payment Error')
        }
      }
      />
        {/* </PayPalScriptProvider> */}
   </div>
  )
}

export default Payment;