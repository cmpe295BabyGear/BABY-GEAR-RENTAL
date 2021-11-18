import React, {useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography'
import Fab from '@mui/material/Fab';
import GetCustomerOrders from '../../services/GetCustomerOrders'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  width: 500,
  lineHeight: '60px',
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });

const MyOrders = () => {
  
  const [custOrders, setCustOrders] = React.useState([]);
  const [custId, setCustId] = React.useState(1);
  const [filteredData, setFilterData] = React.useState([]);
  const [selected, setSelected] = React.useState('all');
  useEffect(() => {

    // const customerId = JSON.parse(sessionStorage.getItem('custId'));
    const customerId = 1
    setCustId(customerId);
    GetCustomerOrders(customerId).then(function (response) {
      setCustOrders(response.orderList);
      setFilterData(response.orderList)
      console.log('GetOrders', response);
    })
      .catch(function (error) {
        setCustOrders(null);
        setFilterData(custOrders)
        console.log('Get Order Details', error);
      });
  }, []);

  const handleFabClick = (type) => {
    if (type === 'all') {
      setSelected(type)
      setFilterData(custOrders)
    } else {
      setFilterData(custOrders.filter(custOrder => custOrder.orderType === type));
      setSelected(type);
    }
   
  }
  return (
    <Grid container spacing={2} marginTop={10} display='flex'>
      <Grid item xs={4} sm={3}>
      <Typography
        component='h4'
        variant='h4'
        align='center'>
        Your Orders
      </Typography>
      </Grid>
      <Grid item xs={4} sm={3}>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <Fab color={selected ==='all' ? 'secondary' :  'inherit'} variant='extended' onClick={() => {handleFabClick('all')}}>
          All
        </Fab>
          <Fab color={selected === 'buy' ? 'secondary' : 'inherit'} variant='extended' onClick={() => {handleFabClick('buy')}}>
            BOUGHT
          </Fab>
          <Fab color={selected === 'rent' ? 'secondary' : 'inherit'} variant='extended' onClick={() => {handleFabClick('rent')}}>
            RENTED
          </Fab>
          
        </Box>
      </Grid>
     
      {filteredData.map((custOrder, index) => (
        <Grid container className='cartItem' >
          <Grid item xs={4} sm={3}>
            <img
              src = {custOrder.image}
              alt = 'Order Details'
              height = '120'
              width = '120'
              className = 'productImage'
            />
          </Grid>
          <Grid item xs={6} sm={6} className='cartItemDetails'>
            <h3>{custOrder.item_name}</h3>
            <span>OrderId: {custOrder.orderID}</span>
            <span>OrderDate: {custOrder.orderDate}</span>
            <span>Order Type: {custOrder.orderType}</span>
          
            {custOrder.orderType === 'rent'
              ?
              <>
                <span>Lease Start Date : {custOrder.rentStartDate}</span>
                <span>Lease End Date :{ custOrder.rentEndDate}</span>
              </>
              :
              null
            }
          </Grid>
          <Grid item xs={2} sm={3} className='cartItemPrice'>
            <span>Price: {custOrder.price}</span>
            {/* <span className="link" onClick={() => removeFromCart(cartItem)}>Remove</span> */}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
export default MyOrders

