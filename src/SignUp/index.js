import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../aws-exports";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import { useStyles } from "./style";
import { useHistory } from "react-router-dom";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";

Amplify.configure(awsconfig);

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const SignUp = () => {
  const classes = useStyles();
  const [firstname, setFirstName] = React.useState("");
  const [lastname, setLastName] = React.useState("");
  const [username, setUserName] = React.useState('');
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState('');
  
  const [phonenumber, setPhonenumber] = React.useState(''); 
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  // const [pathQuery, setPathQuery] = React.useState('');

  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (firstname === "" || password === "" || username ===""|| phonenumber ===""|| email==="") {
      setErrorMessage("Please fill in all the details"); 
      setOpen(true);
    } else {
      try {
        const dataEmail = {
          Name: "email",
          Value: email,
        };
        const dataName = {
          Name: "preferred_username",
          Value: username,
        };
        // const dataPhone = {
        //   Name: "phoneNumber",
        //   Value: phonenumber,
        // };

        // const attributeList = [
        //   new CognitoUserAttribute(dataEmail),
        //   new CognitoUserAttribute(dataName)
        // //  new CognitoUserAttribute(dataPhone)
        // ];

        const { user } = await Auth.signUp({
          username,
          password,
          attributes: {
              email
          },
      });
      const details = {};
      details.username = username;
      const path = '/confirmSignUp/:' + details;
        console.log(user);
        // pathQuery = ;
       // const path = "/confirmSignUp/:" + username;

        // history.push(path);
        history.push({
          pathname: path,
          state: { uname: username , fname: firstname, lname: lastname, phone: phonenumber,email:email},
        });
      } catch (error) {
        setErrorMessage(error.message);
        console.log(errorMessage);
        
        setOpen(true);
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Grid container component="main" className={classes.signUp}>
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
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={(e, firstname) => setFirstName(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={(e, lastname) => setLastName(e.target.value)}
                  />
                  </Grid> 
              <Grid item xs={12}>
                                <TextField
                                    variant='outlined'
                                    required
                                    fullWidth
                                    id='username'
                                    label='Username'
                                    name='username'
                                    onChange={(e, username) => setUserName(e.target.value)}
                                    />
                                    </Grid> 
               <Grid item xs={12}>
               <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  onChange={(e, email) => setEmail(e.target.value)}
                />
              </Grid> 
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='phonenumber'
                  label='Phone Number'
                  name='phonenumber'                 
                  onChange={(e, phonenumber) => setPhonenumber(e.target.value)}
                />
              </Grid> 
              
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e, password) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleClick}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signIn" variant="body2">
                  Already have an account? Sign in !
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
export default SignUp;
