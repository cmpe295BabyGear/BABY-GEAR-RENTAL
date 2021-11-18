import React, {useEffect} from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import GetCartDetails from '../../services/GetCartDetails';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export const Navbar = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isLoggedIn] = React.useState(true);
  const [numberOfCartItems, setNumberOfCartItems] = React.useState(0);
  const [selected, setSelected] = React.useState('buy');

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    const customerId = JSON.parse(sessionStorage.getItem('custId'));    
    GetCartDetails(customerId).then(function (response) {
      setNumberOfCartItems(response.cartList.length);
    })
    .catch(function (error) {
      console.log('GetCartDetails error', error);
    }); 
  }, []);
  useEffect(() => { 
    const customerId = JSON.parse(sessionStorage.getItem('custId'));   
    GetCartDetails(customerId).then(function (response) {
      setNumberOfCartItems(response.cartList.length);
    })
    .catch(function (error) {
      console.log('GetCartDetails error', error);
    }); 
  }, [props.checkCartStatus]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    //props.setAnchorEl(null);
    await Auth.signOut();
    sessionStorage.clear();
    //props.onIsLoggedIn(false);
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to='/myProfile' style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}><MenuItem onClick={handleMenuClose}>Profile</MenuItem></Link>
      <Link to='/userAddress' style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}><MenuItem onClick={handleMenuClose}>Addresses</MenuItem></Link>
      {/* <Link to='/paymentOptions' style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}><MenuItem onClick={handleMenuClose}>Payment Options</MenuItem></Link> */}
      <Link to='/myOrders' style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}><MenuItem onClick={handleMenuClose}>My Orders</MenuItem></Link>
      <Link to='/myListings' style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}><MenuItem onClick={handleMenuClose}>My Listings</MenuItem></Link>
      <MenuItem onClick={handleMenuClose}>Wishlist</MenuItem>
      <Link to="/signIn" style={{ textDecoration: 'none', display: 'block', color: "inherit" }}
        onClick={handleLogout}>
        <MenuItem>Logout</MenuItem>
      </Link>
    </Menu>
  );

   // const loggedInUser = JSON.parse(sessionStorage.getItem('userEmail')) &&  JSON.parse(sessionStorage.getItem('userEmail')).userEmailId ? true : false;
 
  // const renderLogin = (
  //   <Menu>
  //   {loggedInUser ? <Link to="/signIn" style={{ textDecoration: 'none', display: 'block', color: "inherit" }}>
  //       <MenuItem>
  //         <IconButton aria-label="search" color="inherit">
  //           <PersonIcon />
  //         </IconButton>
  //         <p>Sign In</p>
  //       </MenuItem>
  //     </Link> : null
  //     }
  //   </Menu>
  // );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label='show wishlist' color='inherit'>
          <Badge badgeContent={4} color='secondary'>
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <p>My Wishlist</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label='show cart items' color='inherit'>
          <Badge badgeContent={11} color='secondary'>
            <Link to='/cart' style={{ textDecoration: 'none', display: 'block', color:'inherit' }}>
              <ShoppingCartIcon />
            </Link>
          </Badge>
        </IconButton>
        <p>My Cart</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
          >
            <MenuIcon />
          </IconButton>
          <Link to='/' style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}>
            <Typography className={classes.title} variant='h6' noWrap>
              Preloved Baby Gear Center
            </Typography>
          </Link>
          <div className={classes.grow} />
          { !isLoggedIn ? <Button color='inherit'>Login</Button> : null}
          { isLoggedIn ? <div className={classes.sectionDesktop}>
            {/* <ButtonGroup variant='contained' color='secondary' aria-label='contained primary button group'>
              <Button>Buy</Button>
              <Button>Sell</Button>
            </ButtonGroup> */}
            
            <Link to='/buyList/buy' style={{ textDecoration: 'none', display: 'block', color:'inherit', marginTop: '8px' }}>
              <Button
                onClick={() => setSelected('buy')}
                variant={ selected==='buy' ? 'contained' : ''} 
                color={ selected==='buy' ? 'secondary' : 'inherit'} 
              >
                  Buy
              </Button>
            </Link>

            <Link to='/buyList/rent' style={{ textDecoration: 'none', display: 'block', color:'inherit', marginTop: '8px' }}>
              <Button
                onClick={() => setSelected('rent')}
                variant={ selected==='rent' ? 'contained' : ''} 
                color={ selected==='rent' ? 'secondary' : 'inherit'} 
              >
                  Rent
              </Button>
            </Link>

            <Link to="/sell" style={{ textDecoration: 'none', display: 'block', color:"inherit", marginTop: '8px' }}><Button >Sell </Button></Link>
            <Button color='inherit'>About Us</Button>
            <IconButton aria-label='show wishlist' color='inherit'>
              <Badge badgeContent={4} color='secondary'>
                
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label='show cart items' color='inherit'>
              <Badge badgeContent={numberOfCartItems} color='secondary'>
                <Link to='/cart' style={{ textDecoration: 'none', display: 'block', color:'inherit' }}><ShoppingCartIcon /></Link>
              </Badge>
            </IconButton>
            <IconButton
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
          </div> : null}
          { isLoggedIn ? <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div> : null }
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

export default Navbar;