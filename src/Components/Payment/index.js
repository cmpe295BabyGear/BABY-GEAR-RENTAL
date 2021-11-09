import React, { useRef, useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import { makeStyles } from '@material-ui/core/styles';
import './style.css'

const Payment = (props) => {

  // const [cardName, setCardName] = React.useState(props.paymentInfo.cardName);
  // const [cardNumber, setCardNumber] = React.useState(props.paymentInfo.cardNumber);
  // const [expDate, setExpDate] = React.useState(props.paymentInfo.expDate);
  // const [totalPrice, setTotalPrice] = React.useState(props.paymentInfo.totalPrice);
  const [cardName, setCardName] = React.useState('test x');
  const [cardNumber, setCardNumber] = React.useState('7998089808909');
  const [expDate, setExpDate] = React.useState('07/22');
  const [totalPrice, setTotalPrice] = React.useState(100);

  const [paid, setPaid] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();
  // const classes = useStyles()

  const handleSave = () => {
    props.onPaymentFormUpdate({ cardName, cardNumber, expDate });
  }


  useEffect (() => {
    console.log(props)
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                description: 'Your description',
                amount: {
                  currency_code: 'USD',
                  value: totalPrice,
                }
              }
            ]
          })
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          // set paid true 
          actions.disable(true)
          setPaid(true);
          alert ('Payment successful')
          console.log(order);
        },
        onError: (err) => {
          //   setError(err),
          console.error(err);
        },
      })
      .render(paypalRef.current);
  }, [])
  return (
    <Container maxwidth={"sm"} className='payment-div'>
      <div ref={paypalRef} />
    </Container>
    
  )
}

export default Payment