import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography'
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import GetCustomerListings from '../../services/GetCustomerListings'
import ButtonBase from '@mui/material/ButtonBase';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%'
});

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
    // set availability status as 0 when customer cancels the listing
    console.log('cancel')
  }
  return (
    <div>
      <Box sx={{ flexGrow: 1, overflow: 'hidden', marginTop: 10}}>
        <Grid item>
          <Typography
            component='h4'
            variant='h4'>
            Your Listings
          </Typography>
        </Grid>
        <Grid item>
          <Box sx={{ '& > :not(style)': { m: 1 }, alignSelf: 'flex-end'}}>
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
          <Paper key = {curr.id} sx={{ maxWidth: 800, my: 1, p: 2 }} elevation={24}>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase sx={{ width: 128, height: 128 }}>
                  <Img alt='Customer Listing' src={curr.image}/>
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction='column' spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant='h6' component='div'>
                      {curr.itemName}
                    </Typography>
                    <Typography variant='body2' gutterBottom>
                      Preference : {curr.sellerPreference}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Listing Status : {curr.adminStatus}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Item Status : {curr.availabilityStatus}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant='h6' component='div'>
                    Price: {curr.sellerPreference === 'RENT' ? curr.rentalPrice : curr.price}
                  </Typography>
                  {curr.availabilityStatus === 'AVAILABLE'
                    ? <span><Button onClick={handleCancel} color='primary' variant='contained'>Cancel</Button></span>
                    : null}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Box>
    </div>
  );
}
export default MyListings;

