import React, {useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography'
import Fab from '@mui/material/Fab';
import GetCustomerOrders from '../../services/GetCustomerOrders'

import ButtonBase from '@mui/material/ButtonBase';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%'
});

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
    <Box sx={{ flexGrow: 1, overflow: 'hidden', marginTop: 10 }}>
      <Grid item>
        <Typography
          component='h4'
          variant='h4'>
          Your Orders
        </Typography>
      </Grid>
      <Grid item>
        <Box sx={{ '& > :not(style)': { m: 1 }, alignSelf: 'flex-end' }}>
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
        <Paper key={custOrder.id} sx={{ maxWidth: 800, my: 1, p: 2 }} elevation={24}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase sx={{ width: 128, height: 128 }}>
                <Img alt='Customer Order' src={custOrder.image} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction='column' spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant='h6' component='div'>
                    {custOrder.item_name}
                  </Typography>
                  <Typography variant='body2' gutterBottom>
                    OrderId: {custOrder.orderID}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    OrderDate: {custOrder.orderDate}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Order Type: {custOrder.orderType}
                  </Typography>
                 
                </Grid>
                <Grid item xs>
                  {custOrder.orderType === 'rent'
                    ? <div>
                        <Typography variant='body2' color='text.secondary'>
                          Lease Start Date : {custOrder.rentStartDate}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                          Lease End Date   :{ custOrder.rentEndDate}
                      </Typography>
                    </div>
                    : null}
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant='h6' component='div'>
                  Price: {custOrder.price}
                </Typography>
                {/*  To-do : include cancel button */}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
}
export default MyOrders

