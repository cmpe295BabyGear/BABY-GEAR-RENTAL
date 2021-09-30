import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Auth } from 'aws-amplify';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';



const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}


const Usertext = () => {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      <Link color='inherit'>
        Please enter the confirmation code sent to your email to complete
        account sign up!
      </Link>
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  confirmSignUp: {
    height: '100vh'
  },
  image: {
    backgroundImage:
      'url(/SignIn.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  confirm: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const ConfirmSignUp = (props) => {
  const classes = useStyles();
  const [code, setCode] = React.useState();
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const history = useHistory();
  const location = useLocation();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const username = location.state.uname;
      await Auth.confirmSignUp(username, code);
      console.log('User confirmed !')
      history.push('/signIn');
    } catch (error) {
      setErrorMessage(error.message);
      console.log(errorMessage);
      setErrorOpen(true);
    }
  }

  const handleErrorClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorOpen(false);
  };


  return (
    <Grid container component='main' className={classes.confirmSignUp}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Snackbar open={errorOpen} autoHideDuration={60000} onClose={handleErrorClose}>
          <Alert onClose={handleErrorClose} severity='error'>
            {errorMessage}
          </Alert>
        </Snackbar>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Complete sign up
          </Typography>
          <form className={classes.form} noValidate open='false'>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='code'
              label='code'
              type='password'
              id='code'
              onChange={(e, code) => setCode(e.target.value)}
            />
            <Box mt={5}>
              <Usertext />
            </Box>
            <Button
              type='confirm'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={handleClick}
            >
              Confirm
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
export default ConfirmSignUp;
