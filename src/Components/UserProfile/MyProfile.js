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
import FavoriteIcon from '@mui/icons-material/Favorite';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

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
  const classes = useStyles();

  const breadcrumbs = [
                      <RouterLink to='/' underline='hover' key='1' color='inherit' >
                        Home
                      </RouterLink>,
                      <RouterLink to='/myProfile' underline='hover' key='2' color='inherit'>
                        My Profile
                      </RouterLink>
                    ];

  useEffect(() => {
    // To- do : get and set username
    var sessionDetails = JSON.parse(sessionStorage.getItem('custId'));
  }, [])
  return (
    <div>
      <Stack spacing={2} marginTop={10}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
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
                My Profile
              </Typography>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth='md'>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardActionArea underline='none' component={RouterLink} to='/myListings'>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant='h6' component='h2'>
                        <FormatListBulletedIcon color='secondary' fontSize='large' gutterBottom /> My Listings
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardActionArea underline='none' component={RouterLink} to='/userAddress'>
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
                  <CardActionArea underline='none' component={RouterLink} to='/myOrders'>
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
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant='h6' component='h2'>
                        <FavoriteIcon fontSize='large' color='secondary'/> My WishList
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardActionArea underline='none' component={RouterLink} to='/changePwd'>
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
    </div>
  )
}
