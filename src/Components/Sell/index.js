import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import {TextField} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import Dropzone from 'react-dropzone-uploader';
import axios from 'axios';
import getPriceEstimate from '../../services/getPriceEstimate';
import postCustomerListItem from '../../services/postCustomerListItem';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function SellList(){

const [itemName, setItemName]=React.useState('');
const [brand,setBrand]=React.useState('');
const[customerId,setCustomerId]=React.useState('');
// const[custEmail,setCustEmail]=React.useState('');
const [category, setCategory] = React.useState('');
const [condition, setCondition] = React.useState('');
const [babyAge, setBabyAge] = React.useState('');
const[description,setDescription] = React.useState('');
const[s3label,setS3Label] = React.useState('');
const[sellerPreferrence,setSellerPreferrence] = React.useState('');
const[priceEstimate,setPriceEstimate] = React.useState('');
const history = useHistory();
const [open, setOpen] = React.useState(false);
const[message,setMessage] = React.useState('');
const[severity,setSeverity] = React.useState('success');
const [redirect,setRedirect] = React.useState(false);
const [uploadStatus,setUploadStatus] = React.useState(false);


useEffect(() => {
  if (priceEstimate && priceEstimate!=='' && priceEstimate!=='-1') {
    console.log('GetPriceEstimate', priceEstimate);  
    setSeverity('info');
    setMessage("Price Estimate is "+ priceEstimate);
    setOpen(true);
  } else if(priceEstimate && priceEstimate === ''){
    setSeverity('error');
    setMessage("Failed in processing price estimation");
    setOpen(true);
  }
}, [priceEstimate]);


useEffect(() => {
  if (open) {
    if(redirect) {
      setTimeout(() => {
        history.push('/');
      }, 7000);
    }
  }
}, [open]);

//Image Upload 
const axios= require('axios').default;
const API_ENDPOINT ="https://jjhxmh9kf5.execute-api.us-east-2.amazonaws.com/dev/getpresignedurl"

const handleUpload = ({ meta, remove }, status) => {
  console.log(status, meta);
}

const handleImageSubmit= async (files) => {
  const f = files[0];
  console.log(f["file"]);
  if ( category === '') 
    {
    setSeverity('warning');
    setMessage("Please enter *Category* in the below form, before pressing *SUBMIT* for Image Upload");
    setOpen(true);
    }
  else {
  //useEffect(() => {
    // var sessionDetails = JSON.parse(sessionStorage.getItem('custDetails'));
    // services.GetCustomerDetailsByEmail(sessionDetails.uname).then(function (response) {});  
    
  // * GET request: presigned URL
  let custEmail = "test@gmail.com"  // **TO DO ** - Have to get the email id from Session
  const urlWithParams = API_ENDPOINT +"?category_id=" + category + "&cust_email=" + custEmail;
  const response = await axios({
    method: "GET",
    url: urlWithParams,
  });
  let data = JSON.parse(response.data)
  console.log("Data: ", data);
  setS3Label(data.s3label);
  console.log("Label: ", s3label);
 
  // * PUT request: upload file to S3
  const result = await fetch(data.uploadURL, {
    method: "PUT",
    headers:{
      "Content-Type": "image/jpeg"
    },
    body: f["file"],
  });
  console.log("Result: ", result);
  setUploadStatus(true);
  setSeverity('success');
    setMessage('Successfully Uploaded Image');
    setOpen(true);
}
}
 

const handleConditionChange = (event) => {
  setCondition(event.target.value); 
}

const handleCategoryChange = (event) => {
  setCategory(event.target.value);
}

const handleSellPreferrenceChange = (event) => {
  setSellerPreferrence(event.target.value);  
}

const handleBabyAgeChange = (event) => {
  setBabyAge(event.target.value);  
}

const handleEstimate = (event) => {
  console.log("Console Get Estimate")
  if ( category === '' || condition === '' || sellerPreferrence !== 1) 
  {
    setSeverity('warning');
    setMessage("Please enter Category, Condition, Seller Preferrence as SELL");
    setOpen(true);
  }

  else
  {
    const getPriceEstimateParams = "?category_id=" + category + "&condition=" + condition;
    setPriceEstimate('-1');
    getPriceEstimate(getPriceEstimateParams)
      .then(function (response) {
        setPriceEstimate(response.priceEstimate[0].price_estimate);
      })
      .catch(function (error) {
          setPriceEstimate('');
          console.log('GetPriceEstimate error', error);
          
      }); 
  }
}


const handleSubmit = () => 
{
  console.log("test submit")
  if (itemName === ''  || brand === '' || category === '' || condition ==='' ||sellerPreferrence ==='' ) 
  {
    setSeverity('warning');
    setMessage("Please enter ALL Missing Values in the form");
    setOpen(true);
  }
  else
  {
    const listItems ={} 
    listItems.item_name = itemName;
    listItems.description= description;
    listItems.item_category= category;
    listItems.condition=condition;
    listItems.brand=brand;
    listItems.seller_preferrence =sellerPreferrence;
    listItems.baby_age =babyAge;
    listItems.s3_label = s3label; 
    listItems.customer_id= 2;  // ** To DO** Get the Customer ID from Customer Email ID URL

    if(uploadStatus) 
    {
      postCustomerListItem(listItems).then(function ()
      {
        console.log("sent list Items");
        setSeverity('success');
        setRedirect(true);
        setMessage("You have Listed Items Successfully");
        setOpen(true);
      }).catch(function (error) {
          setSeverity('error');
          setMessage('Failed to post item');
          setOpen(true);
          console.log(error)
      })
    }
    else 
    {
      setSeverity('warning');
      setMessage('Item Picture is not uploaded');
      setOpen(true);
    }
  }
}


const handleCancel = () => {
  history.push('/')
}

const handleSnackBarClose = (event, reason) => {
  if (reason === 'clickaway') 
  {
    return;
  }
  setOpen(false);
};


return(

<Container maxWidth="md" className="SellList">

  <Grid item xs={12} align='left' >
    <Typography mt={10} variant="h4" component="h2" allignment="center" className="SellList">
      List Your Baby Gear
    </Typography>
  </Grid>


  <Dropzone
    onChangeStatus={handleUpload}
    onSubmit={handleImageSubmit}
    hjello
    maxFiles={1}
    multiple={false}
    canCancel={false}
    inputContent=" Please Upload JPEG Image"
    styles={{
      dropzone: { width: 400, height: 200 },
      dropzoneActive: { borderColor: "green" },
    }}
  />


  <Grid container spacing={3} direction="column" >
    
    <Grid item xs={12} sm={5}>
      <TextField
        required
        id="outlined-required"
        label="Enter Item Name"
        varaint ="filled"
        onChange={(event) => setItemName(event.target.value)}
      />
    </Grid>

    <Grid item xs={12} sm={5}>
      <TextField
        required
        id="outlined-required"
        label="Enter Item Brand"
        onChange={(event) => setBrand(event.target.value)}
      />
    </Grid>
          

    <Grid item xs={12} sm={5}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handleCategoryChange}
        >
          <MenuItem value={1}>Stroller</MenuItem>
          <MenuItem value={2}>Crib</MenuItem>
          <MenuItem value={3}>Safety</MenuItem>
          <MenuItem value={4}>Car Seat</MenuItem>
          <MenuItem value={5}>High Chair</MenuItem>
          <MenuItem value={6}>Bath</MenuItem>  
        </Select>
      </FormControl>
    </Grid>


    <Grid item xs={12} sm={5}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Condition</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={condition}
          label="Condition"
          onChange={handleConditionChange}
        >
          <MenuItem value={"new"}>New</MenuItem>
          <MenuItem value={"like new"}>Like New </MenuItem>
          <MenuItem value={"fair"}>Fair</MenuItem>
          <MenuItem value={"good"}>Good</MenuItem>
        </Select>
      </FormControl>
    </Grid>

    <Grid item xs={12} sm={5}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Preferred Baby Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={babyAge}
          label="babyAge"
          onChange={handleBabyAgeChange}
        >
          <MenuItem value={1}>NewBorn</MenuItem>
          <MenuItem value={12}>6-12 Months </MenuItem>
          <MenuItem value={24}>12-24 Month</MenuItem>
          <MenuItem value={36}>2-3 Years</MenuItem>
          <MenuItem value={48}>3-4 Years</MenuItem>
        </Select>
      </FormControl>
    </Grid>


    <Grid item xs={12} sm={5}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Seller Preferrence</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sellerPreferrence}
            label="Category"
            onChange={handleSellPreferrenceChange}
          >
            <MenuItem value={1}>Sell</MenuItem>
            <MenuItem value={2}>Rent</MenuItem>
          </Select>
      </FormControl>
    </Grid>

    <Grid item xs={12} sm={5}>
      <TextField
        required
        id="outlined-required"
        label="Description"
        onChange={(event) => setDescription(event.target.value)}
      />
    </Grid>
        
    <Grid container spacing={1} direction="column" item xs={12} sm={5} >
      <div className="buttonWrap">
        <Stack direction="row" spacing={2}>
            <Button variant="contained" color="secondary" onClick={handleEstimate}  > GET ESTIMATE </Button>
            <Button variant="contained" color="secondary" onClick={handleSubmit}  > SUBMIT </Button>
            <Button variant="contained" color="secondary" onClick={handleCancel}  > CANCEL </Button> 
        </Stack>
        
        <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackBarClose} 
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackBarClose} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>  
      </div>
    </Grid>

  </Grid>       
</Container>
);
}


export default SellList;