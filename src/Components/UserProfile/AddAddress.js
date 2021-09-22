import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import { useHistory, useLocation } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@material-ui/core/Typography';
import MuiAlert from '@material-ui/lab/Alert';
import googleAPIKey from '../../Api-key/google-api-key'
import PutAddress from '../../services/PutAddress';
import axios from 'axios'
import updateAddress from '../../services/updateAddress';

function Alert (props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  marginspacing: {
    '& > *': {
      margin: theme.spacing(1),
    }
  },
  textField: {
    width: '300px'
  }
}));


const AddAddress = (props) => {
  const classes = useStyles();
  const location = useLocation()
  const [customerId, setCustomerId] = React.useState(location.state.custId)
  const [address1, setAddress1] = React.useState('')
  const [address2, setAddress2] = React.useState('')
  const [zipCode, setZipCode] = React.useState('')
  const [fullName, setFullName] = React.useState('')
  const [city, setCity] = React.useState('')
  const [state, setState] = React.useState('')
  const [country, setCountry] = React.useState('')
  const [zipcodeErr, setZipcodeErr] = React.useState('')
  const [currAddr, setCurrAddr] = React.useState('')
  const [suggestedAddr, setSuggestedAddr] = React.useState('')
  const [open, setOpen] = React.useState(false);
  const [addressComp, setAddrComp] = React.useState([])
  const [updAddress, setUpdAddress] = React.useState(location.state.updAddress)
  const [addressID, setAddressID] = React.useState(0)

  const history = useHistory();

  useEffect(() => {
    if (updAddress === true) {
      const addObj = location.state.address
      setFullName(addObj.name)
      setAddress1(addObj.address1)
      setAddress2(addObj.address2)
      setCity(addObj.city)
      setState(addObj.state)
      setCountry(addObj.country)
      setZipCode(addObj.zipcode)
      setAddressID(addObj.id)
      const currAddr =  address1 + ' ' + address2 + ' ' + city + ' ' + state + ' ' + country + ' ' + zipCode;
      setCurrAddr(currAddr)
    }
  }, []);

  // const handlecloseSnack = () => {
  //   setHasError(false);
  // }
  
  

  
  const handleSubmit = () => {
    const addresVal = address1 + ' ' + address2 + ' ' + city + ' ' + state + ' ' + country + ' ' + zipCode;
    setCurrAddr(addresVal)
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: addresVal,
        key: googleAPIKey.key
      }
    }).then(function (resp) {
      setZipcodeErr('')
      const addressComponents = resp.data.results[0].address_components;
      setSuggestedAddr(resp.data.results[0].formatted_address)
      setAddrComp(resp.data.results[0])
      setOpen(true)
    }).catch(function (err) {
      console.log(err)
      setZipcodeErr('Invalid address, Please check again')
    })
  }

  const handleOk = () => {
    setOpen(false)
    var temp_city = ''
    var temp_country = ''
    var temp_state = ''
    const addressComponents = addressComp.address_components

    for (var i = 0; i < addressComponents.length; i++) {
      if (addressComponents[i].types[0] === 'locality') {
        setCity(addressComponents[i].long_name)
        temp_city = addressComponents[i].long_name
      } else if (addressComponents[i].types[0] === 'administrative_area_level_1') {
        temp_state = addressComponents[i].long_name
        setState(addressComponents[i].long_name)
      } else if (addressComponents[i].types[0] === 'country') {
        temp_country = addressComponents[i].long_name
        setCountry(addressComponents[i].long_name)
      }
    }
    const addr = {
      "customer_id": customerId,
      "name": fullName,
      "address1": address1,
      "address2": address2,
      "city": city,
      "state": state,
      "country": country,
      "zipcode": zipCode,
      "formattedAddr": suggestedAddr
    }
    submitAddress(addr)
  }
  const handleCancelSuggAddr = () => {
    setOpen(false)
    const addr = {
      "customer_id": customerId,
      "name": fullName,
      "address1": address1,
      "address2": address2,
      "city": city,
      "state": state,
      "country": country,
      "zipcode": zipCode,
      "formattedAddr": currAddr
    }
    submitAddress(addr)
  }

  const submitAddress = (addr) => {
    if (updAddress === true) {
      addr.id = addressID
      //console.log('update address')
      updateAddress(addr)
        .then(function (res) {
          history.push('/userAddress')
        }).catch(function (err) {
          console.log(err)
        })
    } else {
      PutAddress(addr)
        .then(function (res) {
          history.push('/userAddress')
        }).catch(function (err) {
          console.log(err)
        })
    }

  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };

  const handleCancel = () => {
    history.push('/userAddress')
  }
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <Typography variant='h5' align='left' color='primary'>
            Add Address
          </Typography>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogTitle style={{ cursor: 'move' }} id="dialog-title">
            Suggested Address
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {suggestedAddr}
            </DialogContentText>
            <DialogContentText>
              Do you want to proceed with Suggested Address?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCancelSuggAddr}>
              Cancel
            </Button>
            <Button onClick={handleOk}>Ok</Button>
          </DialogActions>
        </Dialog>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField
            variant='standard'
            autoFocus
            margin='dense'
            fullWidth
            id='fname'
            label='Full Name'
            value={fullName === '' ? '' : fullName}
            onChange={(event) => setFullName(event.target.value)}
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField
            variant='standard'
            autoFocus
            fullWidth
            margin='dense'
            id='address1'
            required
            label='Address 1'
            value={address1}
            onChange={(event) => setAddress1(event.target.value)}
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField
            variant='standard'
            autoFocus
            fullWidth
            margin='dense'
            id='address2'
            required
            label='Address 2 (Apt / Unit / Suite) '
            value={address2}
            onChange={(event) => setAddress2(event.target.value)}
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField
            variant='standard'
            fullWidth
            autoFocus
            margin='dense'
            id='city'
            label='City '
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField
            variant='standard'
            fullWidth
            autoFocus
            margin='dense'
            id='state'
            label='State '
            onChange={(event) => setState(event.target.value)}
            value={state}
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField
            fullWidth
            variant='standard'
            autoFocus
            margin='dense'
            id='country'
            label='Country '
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <TextField
            variant='standard'
            autoFocus
            margin='dense'
            id='zCode'
            required
            label='ZipCode'
            value={zipCode}
            onChange={(event) => setZipCode(event.target.value)}
            error={zipcodeErr !== ''}
            helperText={zipcodeErr === '' ? '' : zipcodeErr}
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={12} align='left' className={classes.marginspacing}>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AddAddress
