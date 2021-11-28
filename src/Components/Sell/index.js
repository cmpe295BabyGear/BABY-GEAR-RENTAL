import React, { useEffect,useState } from "react";
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
import "react-dropzone-uploader/dist/styles.css";
import axios from 'axios';
import getPriceEstimate from '../../services/getPriceEstimate';
import postCustomerListItem from '../../services/postCustomerListItem';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        ><CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const useStyles = makeStyles((theme) => ({

  // marginspacing: {
  //   '& > *': {
  //     margin: theme.spacing(1),
  //   },
  // },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  paddingSpacing: {
    paddingLeft: "24px !important",
    paddingRight: "24px !important",
    paddingTop: "24px"
  }
}));

function SellList(){
const classes = useStyles();
const [itemName, setItemName]=React.useState('');
const [brand,setBrand]=React.useState('');
const[customerId,setCustomerId]=React.useState('');
const[custEmail,setCustEmail]=React.useState('');
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
const [checked, setChecked] = React.useState(false);
const [fileNames, setFileNames] = useState([]);
const [openTC, setOpenTC] = React.useState(false);

const handleClickOpen = () => {
  setOpenTC(true);
};
const handleClose = () => {
  setOpenTC(false);
};

// const handleDrop = acceptedFiles =>
//     setFileNames(acceptedFiles.map(file => file.name));

let isSubmit = false;

useEffect(() => {
  const custDetails = JSON.parse(sessionStorage.getItem('customerDetails'))
  console.log('custDetails...', custDetails)
  if (custDetails != null) {
    setCustomerId(custDetails.custId);
    setCustEmail(custDetails.userEmailId);
  }
  

  if (priceEstimate && priceEstimate!=='' && priceEstimate!=='-1' && !isSubmit) {
    console.log('GetPriceEstimate', priceEstimate);  
    setSeverity('info');
    setMessage("Price Estimate is $"+ priceEstimate);
    setOpen(true);
  } else if(priceEstimate && priceEstimate === ''){
    setSeverity('error');
    setMessage("Failed in processing price estimation");
    setOpen(true);
  }
}, [priceEstimate]);

useEffect(() => {

  if(checked) {
    async function callEstimate() {
      if((priceEstimate === -1 || priceEstimate=== '') && sellerPreferrence === 'SELL') {
        isSubmit = true;
        await handleEstimate(null);
        isSubmit = false;
      }
    }
    callEstimate();
  }
  
}, [checked]);

useEffect(() => {
  if (open) {
    if(redirect) {
      setTimeout(() => {
        history.push('/myListings');
      }, 7000);
    }
  }
}, [open, redirect]);
useEffect(() => {

  if(uploadStatus) {
    async function callSubmit() {
      await listItemOnline();
      setUploadStatus(false);
    }
    callSubmit();
  }
  
}, [uploadStatus]);

//Image Upload 
const axios= require('axios').default;
const API_ENDPOINT ="https://jjhxmh9kf5.execute-api.us-east-2.amazonaws.com/dev/getpresignedurl"

const toast = (innerHTML) => {
  const el = document.getElementById('toast')
  el.innerHTML = innerHTML
  el.className = 'show'
  setTimeout(() => { el.className = el.className.replace('show', '') }, 3000)
}


const handleUpload = ({ meta, remove }, status, files) => {
  console.log(status, meta);
  if (status === 'headers_received') {
    toast(`${meta.name} uploaded!`)
    remove()
  } else if (status === 'aborted') {
    toast(`${meta.name}, upload failed...`)
  } else if (status === 'done') {
    setFileNames(files);
  }
}

const handleImageSubmit= async (files) => {
  const f = files[0];
  if(f) {
    console.log(f["file"]);
    if ( category === '') 
      {
      setSeverity('warning');
      setMessage("Please enter *Category* in the below form, before pressing *SUBMIT* for Image Upload");
      setOpen(true);
      }
    else {

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
      headers: {
        "Content-Type": "image/jpeg"
      },
      body: f["file"],
    });
    console.log("Result: ", result);
    await setUploadStatus(true);
    setSeverity('success');
      setMessage('Successfully Uploaded Image');
      setOpen(true);
    }
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

const handleEstimate = async (event) => {
  console.log("Console Get Estimate")
  if ( category === '' || condition === '' || sellerPreferrence !== "SELL" ) 
  {
    setSeverity('warning');
    setMessage("Please enter Category, Condition, Seller Preferrence as SELL");
    setOpen(true);
  }

  else
  {
    const getPriceEstimateParams = "?category_id=" + category + "&condition=" + condition;
    setPriceEstimate('-1');
    await getPriceEstimate(getPriceEstimateParams)
      .then(function (response) {
        setPriceEstimate(response.priceEstimate[0].price_estimate);
        console.log(response.priceEstimate[0].price_estimate);
      })
      .catch(function (error) {
          setPriceEstimate('');
          console.log('GetPriceEstimate error', error);
          
      }); 
  }
}


const handleSubmit = async () => 
{
  console.log("test submit");
  if (fileNames && fileNames.length>0) {
    await handleImageSubmit(fileNames);
  }
  if (itemName === ''  || brand === '' || category === '' || condition ==='' || sellerPreferrence ==='' ) 
  {
    setSeverity('warning');
    setMessage("Please enter ALL Missing Values in the form");
    setOpen(true);
  }
  
}

const listItemOnline = async () => {
  console.log("listItemOnline")
  isSubmit = true;
  if (itemName === ''  || brand === '' || category === '' || condition ==='' || sellerPreferrence ==='' ) 
  {
    setSeverity('warning');
    setMessage("Please enter ALL Missing Values in the form");
    setOpen(true);
  }else {
    
    const listItems ={} 
    listItems.item_name = itemName;
    listItems.description= description;
    listItems.item_category= category;
    listItems.condition=condition;
    listItems.brand=brand;
    listItems.seller_preference = sellerPreferrence;
    listItems.baby_age =babyAge;
    listItems.s3_label = s3label; 
    listItems.customer_id= customerId;
    listItems.admin_status='PENDING'
  
    if(sellerPreferrence === "RENT" && (condition === "new" || condition === "like new")) {
      if(category === 1) {
        listItems.rental_price = 10;
      } else if(category === 2) {
        listItems.rental_price = 15;
      } else if(category === 3) {
        listItems.rental_price = 5;
      } else if(category === 4) {
        listItems.rental_price = 10;
      } else if(category === 5) {
        listItems.rental_price = 6;
      } else if(category === 6) {
        listItems.rental_price = 3;
      } else {
        listItems.rental_price = -1;
      } 
    }
    
    if(uploadStatus) {
      console.log('before post');
      if(priceEstimate !== -1 || priceEstimate !== '') {
        listItems.price = await (priceEstimate + (priceEstimate*0.1)) ;
      }
      postCustomerListItem(listItems)
      .then(function () {
        console.log("sent list Items");
        setSeverity('success');
        setRedirect(true);
        setMessage("You have Listed Items Successfully");
        setOpen(true);
      }).catch(function (error) {
          setSeverity('error');
          setMessage('Failed to List item, Please do in sometime');
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
    //onSubmit={handleImageSubmit}
    maxFiles={1}
    multiple={false}
    canCancel={true}
    inputContent=" Please Upload Item Image"
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
        <InputLabel id="demo-simple-select-label">Seller Preferrence</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sellerPreferrence}
            label="Category"
            onChange={handleSellPreferrenceChange}
          >
            <MenuItem value={"SELL"}>Sell</MenuItem>
            <MenuItem value={"RENT"}>Rent</MenuItem>
          </Select>
      </FormControl>
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

    {sellerPreferrence === "RENT" ? (
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
        </Select>
      </FormControl>
    ) : (
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
    ) 
    }
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
      <TextField
        required
        id="outlined-required"
        label="Description"
        onChange={(event) => setDescription(event.target.value)}
      />
    </Grid>

    <Grid item xs={12} align='left'>
      <div>
        {/* <Typography align='left' variant='h6' color='error' gutterBottom>
          Terms & Conditions
        </Typography>
        <Typography align='left' variant='subtitle1'  gutterBottom>
          Please read carefully below Terms & Conditions and Check the box before submitting
        </Typography> */}
        <Grid item xs={12} align='left' >

      <div>
        <Button variant='outlined' color='secondary' onClick={handleClickOpen}>
          Terms & Conditions
        </Button>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={openTC}
        >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            Terms & Conditions
        </BootstrapDialogTitle>
        <DialogContent dividers>
            <Typography gutterBottom>
              1. Price estimate shown is only an estimated value, 
                 the actual price is estimated only after an item is received and in the same condition as specified in the form.
            </Typography>
            <Typography gutterBottom>
              2. You can only cancel your listings with in 2 days of your listing date.
            </Typography>
            <Typography gutterBottom>
              3. We do not accept damaged or nonfunctional items. 
            </Typography>
            <Typography gutterBottom>
              4. Listed Items can only be cancelled within 24 hours of listing. Once Approved by Admin, no cancellation is possible. 
            </Typography>
            <Typography gutterBottom>
              5. We reserve the right to accept or reject the item.
            </Typography>
          </DialogContent>
          <DialogActions>
              <Button autoFocus onClick={handleClose}>
              Close
              </Button> 
          </DialogActions>
        </BootstrapDialog>
    </div>

          <FormControlLabel
            control={<Checkbox color='primary' checked={checked} onChange={(event) => setChecked(event.target.checked)} name='checked' />}
            label="I accept all the Terms and Conditions"
          />
        </Grid>
       
    
  </div>
  </Grid>
        
        
    <Grid container spacing={1} direction="column" item xs={12} sm={5} >
      <div className="buttonWrap">
        <Stack direction="row" spacing={2}>
            <Button variant="contained" disabled={!checked} color="secondary" onClick={handleEstimate}  > GET ESTIMATE </Button>
            <Button type='submit' disabled={!checked} variant="contained" color="secondary" 
                onClick={handleSubmit} > SUBMIT </Button>
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