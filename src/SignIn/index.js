import React from "react";
import { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import { Link } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./style";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../aws-exports";
import { useHistory, useLocation } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { GetCustomerDetails } from '../services/GetCustomerDetails';
import FbLoginInsert from '../services/FbLoginInsert';

import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

Amplify.configure(awsconfig);

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};



const SignIn = (props) => {
  const classes = useStyles();
  const [emailid, setEmailid] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [customerDetails, setCustomerDetails] = useState([]);
  const [fkey, setfkey] = React.useState('444592453854743')
  //const [customerId, setCustomerId] = useState("")

  const login = async (e) => {
    e.preventDefault();
    try {
      const user = await Auth.signIn(emailid, password);
      console.log(user);
      console.log("user signedIn");    
      const getCustByEmailid = (emailid) => {
      sessionStorage.setItem('isSSO', 0);
      GetCustomerDetails(emailid).then(function (response) {
      setCustomerDetails(response);
      console.log('response signin ...', response)
      sessionStorage.setItem("customerDetails", JSON.stringify({ userEmailId : emailid, custId : response.id}));
      console.log('GetCustomerDetails values are - ', response);
      props.onIsLoggedIn(true);
      props.updateCartCount(Math.random());
      })
      .catch(function (error) {
        setCustomerDetails(null);
        console.log('GetCustomerDetails error', error);
      });  
     }
      getCustByEmailid(emailid);
      
     
      history.push("/buy"); 
      
    } catch (error) {
      setErrorMessage(error.message);
      console.log(errorMessage);
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
 
   const responseFacebook = async (response) => {
    if (response != null) {
      props.onIsLoggedIn(true)
      await FbLoginInsert(response.email, response.name).then(function (resp) {
        sessionStorage.setItem("customerDetails", JSON.stringify({ userEmailId: response.email, custId: resp.data[0][0]['id'] }));
        sessionStorage.setItem('isSSO', 1);
        props.updateCartCount(Math.random());
        })
        .catch(function (error) {
          setCustomerDetails(null);
          props.onIsLoggedIn(false)
          console.log('fb login insert error', error);
        }); 
      history.push('/')
      // to-do : set the customer id 
    }
    else {
      props.onIsLoggedIn(false);
      sessionStorage.clear();
    }
  }

  return (
    <Grid container component="main" className={classes.signIn}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Snackbar open={open} autoHideDuration={60000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e, emailid) => setEmailid(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e, password) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              // color='secondary'
              className={classes.submit}
              onClick={login}
            >
              Sign In
            </Button>
            <Grid container spacing={3} >
              <Grid item>
                <FacebookLogin
                  appId={fkey}
                  autoLoad={false}
                  fields='name, email,picture'
                  callback={responseFacebook} />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item>
                <Link href="/signUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            
          </form>
        </div>
      </Grid>

      {/* Federated Login Code*/}

      
    </Grid>
  );
};
export default SignIn;
