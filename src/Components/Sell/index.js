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


function SellList(){

const getData = (e) =>{
        console.warn(e.target.value);
    }

const [category, setCategory] = React.useState('');
const [condition, setCondition] = React.useState('');
const [sell, setSell] = React.useState('');


  const handleConditionChange = (event) => {
    
    setCondition(event.target.value);
    
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  }

  const handleSellChange = (event) => {
    setSell(event.target.value);  
  }


    return(

<Container maxWidth="md" className="SellList">

<Typography variant="h4" component="h2" allignment="center" className="SellList">
  List Your Baby Gear
</Typography>

<Card sx={{ maxWidth: 345 }} container spacing={3}>
      <CardMedia
        component="img"
        alt="Baby Gear"
        height="100"
        width="100"
        // image="./logo.svg"
      />

<CardActions>
        <Button size="small" color="secondary" variant='outlined'>Upload</Button>
      </CardActions>
    </Card>

    <Grid container spacing={3} direction="column"  justify="center">
        
        <Grid item xs={12} sm={5}>
        <TextField
          required
          id="outlined-required"
          label="Enter Item Name"
          varaint ="filled"
        />
        </Grid>

        <Grid item xs={12} sm={5}>
        <TextField
          required
          id="outlined-required"
          label="Enter Item Brand"
        />
        </Grid>
          
    
        {/* <Grid item xs={12} sm={5}>
            <TextField 
            id="outlined-basic"
            margin='normal' 
            lable ="Enter Item Name"
            color ="secondary"
            varaint ="outlined"
            onChange ={getData}
            />
        </Grid> */}

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
    <MenuItem value={2}>Safety</MenuItem>
    <MenuItem value={3}>Highchair</MenuItem>
    <MenuItem value={4}>Crib</MenuItem>
    <MenuItem value={5}>Carseat</MenuItem>
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
    <MenuItem value={1}>New</MenuItem>
    <MenuItem value={2}>Used Like New </MenuItem>
    <MenuItem value={3}>Used Good</MenuItem>
    <MenuItem value={4}>Used Fair</MenuItem>
  </Select>
</FormControl>
</Grid>




<Grid item xs={12} sm={5}>
<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Sell/Rent</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={sell}
    label="Category"
    onChange={handleSellChange}
  >
    <MenuItem value={10}>Sell</MenuItem>
    <MenuItem value={20}>Rent</MenuItem>
    
  </Select>
</FormControl>
</Grid>

<Grid item xs={12} sm={5}>
        <TextField
          required
          id="outlined-required"
          label="Description"
        />
        </Grid>
        
        <Grid container spacing={-10} direction="column" item xs={12} sm={5} >
        <div className="buttonWrap">
            <Button variant="contained" color="secondary" >SUBMIT</Button>
            {/* <Button variant="contained" color="secondary" > GET ESTIMATE </Button> */}
            <Button variant="contained" color="secondary" > CANCEL </Button> 
          </div>
        </Grid>
    
        </Grid>       
</Container>
  );
}

    
export default SellList;