import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import GetCustomerAddresses from '../../services/GetCustomerAddresses';
import { Fragment } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 200,
  },
  cardmedia: {
    height: 140,
  },
  marginspacing: {
    '& > *': {
      margin: theme.spacing(5),
    }
  },
}));

const DeliveryAddresses = (props) => {

  const [custAddresses, setCustAddresses] = React.useState([]);
  const [moreAddresses, setMoreAddresses] = React.useState(false)
  const [defaultAddress, setDefaultAddress] = React.useState('');
  const [selectedCustAddress, setSelectedCustAddress] = React.useState();
  const classes = useStyles();


  useEffect(() => {
    const custId = JSON.parse(sessionStorage.getItem('customerDetails')).custId;
    GetCustomerAddresses(custId)
      .then(function (res) {
        setCustAddresses(res)
        const itemList = res.filter(function(item){
          return item.isDefault === 1;
        });
        setDefaultAddress(itemList[0].formatted_address);
      })
      .catch(function (err) {
        console.log("GetCustomerAddresses" + err)
        setCustAddresses([])
      })
  }, [])

  const selectAddress = (id) => {
    setSelectedCustAddress(id);
    // props.onSelectAddress(id);
  }
  return (
    <div className="DeliverAddresses">
      <h4>Shipping to <span>{defaultAddress}</span>
        <span className="link" onClick={() => setMoreAddresses(true)}>CHANGE</span>
      </h4>
      { moreAddresses ? <Container style={{ marginTop: 20 }} className={classes.marginspacing}>
        <Grid container spacing={3} className="deleveryAddressWrap">
          <Fragment>
            {custAddresses.map((custAddress, key) => (
              <Grid key={custAddress.id} item spacing={1} onClick={() => selectAddress(custAddress.id)}>
                <Card className={classes.card}>
                  <CardContent>
                    {/* <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                      {custAddress.isDefault === 1 ? 'Default' : ''}
                    </Typography> */}
                    { selectedCustAddress === custAddress.id ? <CheckCircleOutlineIcon className="CheckCircleOutlineIcon"/> : null}
                    <h6>
                      {custAddress.name}
                    </h6>
                    <Typography variant='body2'>
                      {custAddress.address1}
                    </Typography>
                    <Typography variant='body2'>
                      {custAddress.city}
                      <br />
                      {custAddress.state}
                      <br />
                      {custAddress.country}, {custAddress.zipcode}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Fragment>
        </Grid>
      </Container> : null}
    </div>
  )
}

export default DeliveryAddresses;
