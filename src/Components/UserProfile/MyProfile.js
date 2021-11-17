import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import { CardActionArea } from '@mui/material';
import {Link as RouterLink} from 'react-router-dom'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PaymentIcon from '@mui/icons-material/Payment';
import HomeIcon from '@mui/icons-material/Home';
import PasswordIcon from '@mui/icons-material/Password';
import HistoryIcon from '@mui/icons-material/History';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

const theme = createTheme();
const useStyles = makeStyles({
  card: {
    maxWidth: 300,
  },
  cardmedia: {
    height: 140,
  },
})
// To-do: CHANGE THE ICON PICTURES 
export default function MyProfile () {
  const [userName, setUserName] = React.useState('test user')
  const classes = useStyles()
  useEffect(() => {
    // To- do : get and set username
    var sessionDetails = JSON.parse(sessionStorage.getItem('custId'));
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box sx={{ flexGrow: 1 }}>
          <Container maxWidth='sm'>
            <Typography
              component='h1'
              variant='h2'
              align='center'
              color='text.primary'
              gutterBottom
            >
              Hi {userName}
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth='md'>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardActionArea underline='none' component={RouterLink} to='/userAddress'>
                  {/* <CardMedia
                    // component='img'
                    component='div'
                    className={classes.cardmedia}
                    // image='https://prelovedbabyitems.s3.us-east-2.amazonaws.com/OtherPictures/listings.png'
                    src={<FormatListBulletedIcon />}
                    alt='My listings'
                  >
                    {/* <FormatListBulletedIcon color='secondary' fontsize='large' align='center' height='140'/> */}
                  {/* </CardMedia> */}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant='h6' component='h2'>
                      <FormatListBulletedIcon color='secondary' fontSize='large' gutterBottom /> My Listings
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            {/* <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardActionArea underline='none' component={RouterLink} to='/paymentOptions'>
                  {/* <CardMedia
                    component='img'
                    className={classes.cardmedia}
                    image='https://prelovedbabyitems.s3.us-east-2.amazonaws.com/OtherPictures/PaymentOptions.png'
                    alt='payment options'
                  /> */}
                  {/* <CardContent >
                    <Typography gutterBottom variant='h6' component='h2'>
                      <PaymentIcon color='secondary' fontSize='large' gutterBottom /> Payment Options
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>  */}
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardActionArea underline='none' component={RouterLink} to='/userAddress'>
                  {/* <CardMedia
                    component='img'
                    className={classes.cardmedia}
                    image='https://prelovedbabyitems.s3.us-east-2.amazonaws.com/OtherPictures/Address.png'
                    alt='addresses'
                  /> */}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant='h6' component='h2'>
                      <HomeIcon color='secondary' fontSize='large' /> My Addresses
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardActionArea underline='none' component={RouterLink} to='/userAddress'>
                  {/* <CardMedia
                    component='img'
                    className={classes.cardmedia}
                    image='https://prelovedbabyitems.s3.us-east-2.amazonaws.com/OtherPictures/myorders.png'
                    alt='my orders'
                  /> */}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant='h6' component='h2'>
                      <HistoryIcon fontSize='large' color='secondary' /> My Orders
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardActionArea underline='none' component={RouterLink} to='/userAddress'>
                  {/* <CardMedia
                    component='img'
                    className={classes.cardmedia}
                    image='https://prelovedbabyitems.s3.us-east-2.amazonaws.com/OtherPictures/wishlist.png'
                    alt='wishlist'
                  /> */}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant='h6' component='h2'>
                      <BookmarksIcon fontSize='large' color='secondary'/> My WishList
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardActionArea underline='none' component={RouterLink} to='/changePwd'>
                  {/* <CardMedia
                    component='img'
                    className={classes.cardmedia}
                    image='https://prelovedbabyitems.s3.us-east-2.amazonaws.com/OtherPictures/password.png'
                    alt='security'
                  /> */}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant='h6' component='h2'>
                      <PasswordIcon fontSize='large' color='secondary' /> Change Password
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  )
}
