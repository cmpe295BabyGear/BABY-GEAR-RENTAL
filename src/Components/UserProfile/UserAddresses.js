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
import RemoveAddress from '../../services/RemoveAddress';
import { Fragment } from 'react';

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
  // const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const history = useHistory();


  useEffect(() => {
    // get customer address
    // To-do : set customer id
    GetCustomerAddresses(customerId)
      .then(function (res) {
        console.log('get response ----')
        console.log(res)
        console.log('-----')
        setCustAddresses(res)
      })
      .catch(function (err) {
        console.log(err)
        setCustAddresses([])
      })
  }, [])



  const handleAdd = () => {
    const path = '/addAddress/:' + customerId
    history.push({
      pathname: path,
      state: {
        custId: customerId,
        updAddress: false
      }
    })
  }

  const handleDelete = (address_id) => {
    RemoveAddress(address_id)
      .then(function (res) {
        GetCustomerAddresses(customerId)
          .then(function (res) {
            setCustAddresses(res)
          })
          .catch(function (err) {
            console.log(err)
          })
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  const handleEdit = (addressObj) => {
    console.log(addressObj)
    const path = '/addAddress/:' + customerId
    history.push({
      pathname: path,
      state: {
        custId: customerId,
        updAddress: true,
        address: addressObj
      }
    })
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
          <Fragment>
            {custAddresses.map((custAddress, key) => (
              <Grid key={custAddress.id} item spacing={3}>
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
                    <Button size='small' onClick={() => handleEdit(custAddress)}>Edit</Button>
                    <Button onClick={() => handleDelete(custAddress.id)}>Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Fragment>
        </Grid>
      </Container>
    </div>
  )
}

export default UserAddresses
