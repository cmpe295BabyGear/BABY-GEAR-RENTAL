import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import {Link as RouterLink, useHistory} from 'react-router-dom'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const bull = (
  <Box
    component='span'
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

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

const UserAddresses = () => {
  const [customerId, setCustomerId] = React.useState(1) // TO-DO: set the customer id from the session storage 
  const [custAddresses, setCustAddresses] = React.useState([])
  // const[open, setOpen] = React.useState(false);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
   // get customer address
    const c_id = 1;
    axios.get('https://t3sggo877i.execute-api.us-east-2.amazonaws.com/dev/getcustomeraddresses?customer_id=' + c_id)
      .then(function (response) {
        const custAddr = [];
        if (response.data.length > 0) {
          response.data.forEach(function (element) {
            custAddr.push({
              id: element.id,
              customer_id: element.customer_id,
              name: element.name,
              address1: element.address1,
              address2: element.address2,
              city: element.city,
              state: element.state,
              country: element.country,
              zipcode: element.zipcode,
              isDefault: element.isDefault
            });
          })
          setCustAddresses(custAddr)
        }
        console.log(custAddresses)
      }).catch(function (err) {
        console.log(err)
        setCustAddresses([])
    })
  }, [])
  
  const handleDelete = (custID, addressID) => {
    axios.delete('https://u1nc11pop8.execute-api.us-east-2.amazonaws.com/dev/deleteaddress?address_id=' + addressID)
      .then(function (res) {
        axios.get('https://t3sggo877i.execute-api.us-east-2.amazonaws.com/dev/getcustomeraddresses?customer_id=' + custID)
          .then(function (response) {
            const custAddr = [];
            if (response.data.length > 0) {
              response.data.forEach(function (element) {
                custAddr.push({
                  id: element.id,
                  customer_id: element.customer_id,
                  name: element.name,
                  address1: element.address1,
                  address2: element.address2,
                  city: element.city,
                  state: element.state,
                  country: element.country,
                  zipcode: element.zipcode,
                  isDefault: element.isDefault
                });
              })
              setCustAddresses(custAddr)
            }
          }).catch(function (error) {
            console.log(error)
          })
      })
      .catch(function (err) {
        console.log(err)
        setCustAddresses([])
      })
  }

  const handleAdd = () => {
    history.push('/addAddress')
  }
  return (
    <div>
      <Container style={{ marginTop: 100 }} className={classes.marginspacing}>
        <Grid container spacing={3}>
          <Grid item spacing={3}>
            <Button type='submit' onClick={handleAdd} variant='contained' color='primary'> Add Address</Button>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <>
            {custAddresses.map((custAddress, index) => (
              <Grid item spacing={3}>
                <Card sx={{ minWidth: 275 }} className={classes.card}>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                      {custAddress.isDefault === 1 ? 'Default' : ''}
                    </Typography>
                    <Typography variant='h5' component='div'>
                      {custAddress.name}
                    </Typography>
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
                  <CardActions>
                    <Button size='small'>Edit</Button>
                    <Button size='small' onClick={handleDelete(custAddress.customer_id, custAddress.id)}>Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </>
        </Grid>
      </Container>
    </div>
  )
}

export default UserAddresses
