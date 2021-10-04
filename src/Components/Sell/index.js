import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import {TextField} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import { useHistory } from 'react-router-dom';
import postCustomerListItem from './postCustomerListItem';
import getPriceEstimate from './getPriceEstimate';
import Dropzone from 'react-dropzone-uploader';
import axios from 'axios';
import { ButtonGroup } from './buttonGroup';




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
const[errorMessage,setErrorMessage] = React.useState('');
const history = useHistory();

// const[rentalPrice,setRentalPrice] = React.useState('');
// const[adminStatus,setAdminStatus] = React.useState('');
// const API_ENDPOINT="https://6wf12ee2le.execute-api.us-east-2.amazonaws.com/default/getPresignedImageURL"


const axios= require('axios').default;

const API_ENDPOINT ="https://jjhxmh9kf5.execute-api.us-east-2.amazonaws.com/dev/getpresignedurl"

const handleUpload = ({ meta, remove }, status) => {
  console.log(status, meta);
}

const handleImageSubmit= async (files) => {
  const f = files[0];
  console.log(f["file"]);
  
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

  alert('Successfully Uploaded Image');
  
}
 


  const handleConditionChange = (event) => {
    setCondition(event.target.value); 
  };

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
      alert('Please enter Category, Condition, Seller Preferrence as SELL');
    }

    else{
    const getPriceEstimateParams = "?category_id=" + category + "&condition=" + condition;

      getPriceEstimate(getPriceEstimateParams)
        .then(function (response) {
          setPriceEstimate(response.priceEstimate[0].price_estimate);
          
          console.log('GetPriceEstimate', priceEstimate);  
          alert(priceEstimate);
        })
        .catch(function (error) {
            setPriceEstimate(null);
            console.log('GetPriceEstimate error', error);
        }); 
      }
  }


  const handleSubmit = () => 
  {
    console.log("test submit")
    if (itemName === ''  || brand === '' ) 
    {
      alert('Please enter ALL Missing Values');
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

      postCustomerListItem(listItems).then(function ()
      {
         console.log("sent list Items");
         alert( " You have Listed Items Successfully")
      }).catch(function (error) {
              setErrorMessage('Unable to submit leave application');
              console.log(error)
            })
    }
  }

  


  const handleCancel = () => {
    history.push('/')
  }




    return(

<Container maxWidth="md" className="SellList">

<Typography variant="h4" component="h2" allignment="center" className="SellList">
  List Your Baby Gear
</Typography>

<Dropzone
      onChangeStatus={handleUpload}
      onSubmit={handleImageSubmit}
      hjello
      maxFiles={1}
      multiple={false}
      canCancel={false}
      inputContent="Upload JPEG Image"
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
          // onChange={(e, itemName) => setItemName()}
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
        <ButtonGroup>
            <Button variant="contained" color="secondary" onClick={handleEstimate}  > GetEstimate </Button>
            <Button variant="contained" color="secondary"onClick={handleSubmit} > SUBMIT </Button>
            <Button variant="contained" color="secondary" onClick={handleCancel}  > CANCEL </Button> 
        </ButtonGroup>  
          </div>
        
        </Grid>
    
        </Grid>       
</Container>
  );
}


export default SellList;