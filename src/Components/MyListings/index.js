import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography'
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import GetCustomerListings from '../../services/GetCustomerListings'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  width: 500,
  lineHeight: '60px',
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });

const MyListings = () => {

  const [custListings, setCustListings] = React.useState([]);
  const [custId, setCustId] = React.useState(1);
  const [filteredData, setFilterData] = React.useState([]);
  const [selected, setSelected] = React.useState('ALL');
  useEffect(() => {

    // const customerId = JSON.parse(sessionStorage.getItem('custId'));
    const customerId = 1;
    setCustId(customerId);
    GetCustomerListings(customerId).then(function (response) {
      setCustListings(response.customerItemListings);
      setFilterData(response.customerItemListings)
      console.log('GetCustomer Listings', response);
    })
      .catch(function (error) {
        setCustListings(null);
        setFilterData(null)
        console.log('GetCustomer Listings', error);
      });
  }, []);

  const handleFabClick = (type) => {
    if (type === 'ALL') {
      setSelected(type)
      setFilterData(custListings)
    } else {
      setFilterData(custListings.filter(custListing => custListing.sellerPreference === type));
      setSelected(type);
    }
  }

  const handleCancel = () => {
    //set availability status as 0
    console.log('cancel')
  }
  return (
    <Grid container spacing={2} marginTop={10} display='flex'>
      <Grid item xs={4} sm={3}>
        <Typography
          component='h4'
          variant='h4'
          align='center'>
          Your Listings
        </Typography>
      </Grid>
      <Grid item xs={4} sm={3}>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <Fab color={selected === 'ALL' ? 'secondary' : 'inherit'} variant='extended' onClick={() => { handleFabClick('ALL') }}>
            All
          </Fab>
          <Fab color={selected === 'SELL' ? 'secondary' : 'inherit'} variant='extended' onClick={() => { handleFabClick('SELL') }}>
            SELL
          </Fab>
          <Fab color={selected === 'RENT' ? 'secondary' : 'inherit'} variant='extended' onClick={() => { handleFabClick('RENT') }}>
            RENT
          </Fab>

        </Box>
      </Grid>

      {filteredData.map((curr, index) => (
        <Grid container className='cartItem' >
          <Grid item xs={4} sm={3}>
            <img
              src={curr.image}
              alt='Customer Listing'
              height='120'
              width='120'
              className='productImage'
            />
          </Grid>
          <Grid item xs={6} sm={6} className='cartItemDetails'>
            <h3>{curr.itemName}</h3>
            {/* <span>Listed On : {custOrder.ListedDate}</span> */}
            <span>Preference : {curr.sellerPreference}</span>
            <span>Listing Status : {curr.adminStatus}</span>
            <span>Item Status : {curr.availabilityStatus}</span>

            {curr.availabilityStatus === 'AVAILABLE'
              ?
              <>
                <span><Button onClick={handleCancel} color='primary' variant='contained'>Cancel</Button></span>
              </>
              :
              null
            }
           
          </Grid>
          <Grid item xs={2} sm={3} className='cartItemPrice'>
            <span>Price: {curr.sellerPreference === 'RENT' ? curr.rentalPrice : curr.price}</span>
            {/* <span className="link" onClick={() => removeFromCart(cartItem)}>Remove</span> */}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
export default MyListings;

