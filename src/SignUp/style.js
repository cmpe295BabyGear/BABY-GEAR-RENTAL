import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  signUp: {
    height: '100vh'
  },
  paper: {
    marginTop: theme.spacing(8, 6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    backgroundImage: 'url(http://d1q6lc2rasmdf5.cloudfront.net/OtherPictures/SignIn.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '80%',
    marginTop: theme.spacing(7),
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
}));