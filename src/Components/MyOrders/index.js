import React, {useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography'
import Fab from '@mui/material/Fab';
import GetCustomerOrders from '../../services/GetCustomerOrders'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link as RouterLink } from 'react-router-dom'
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import CancelItemOrder from '../../services/CancelItemOrder'

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%'
});

const MyOrders = () => {
  
  const [custOrders, setCustOrders] = React.useState([]);
  const [custId, setCustId] = React.useState(0);
  const [filteredData, setFilterData] = React.useState([]);
  const [selected, setSelected] = React.useState('all');

  const breadcrumbs = [
    <RouterLink to='/' underline='hover' key='1' color='inherit' >
      Home
    </RouterLink>,
    <RouterLink to='/myProfile' underline='hover' key='2' color='inherit'>
      My Profile
    </RouterLink>,
    <RouterLink to='/myOrders' underline='hover' key='2' color='inherit'>
      My Orders
    </RouterLink>
  ];

  useEffect(() => {

    const custDetails = JSON.parse(sessionStorage.getItem('customerDetails'))
    if (custDetails != null) {
      setCustId(custDetails.custId)
    }
    GetCustomerOrders(custDetails.custId).then(function (response) {
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

  const handleCancelOrder = (oId, iId) => {
    CancelItemOrder(oId, iId).then(function (response) {
      console.log('Item cancelled successfully')
      GetCustomerOrders(custId).then(function (response) {
        setCustOrders(response.orderList);
        setFilterData(response.orderList)
        console.log('GetOrders', response);
      })
        .catch(function (error) {
          setCustOrders(null);
          setFilterData(custOrders)
          console.log('Get Order Details', error);
        });
    }).catch(function (err){
      console.log('unable to cancel order')
    })
  }
  return (
    <div>
      <Stack spacing={2} marginTop={10}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
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
                    <Typography variant='body2' color='text.secondary'>
                      Order Status   :{custOrder.OrderStatus}
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
                    Price: $ {custOrder.price}
                  </Typography>
                  {custOrder.OrderStatus == 'Cancelled' || custOrder.totalDays > 2
                    ? null
                    : <span><Button onClick={() => handleCancelOrder(custOrder.orderID, custOrder.itemID)} color='primary' variant='contained'>Cancel</Button></span>}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Box>
    </div>
  );
}
export default MyOrders

