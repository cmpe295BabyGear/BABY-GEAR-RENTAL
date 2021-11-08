import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Container from '@material-ui/core/Container';

import Navbar from './Components/Navbar';
import Buy from './Components/Buy';
import BuyList from './Components/Buy/BuyList';
import ProductDetails from './Components/Buy/ProductDetails';
import Cart from './Components/Cart';
import Sell from './Components/Sell';
import Uploader from "./Components/Uploader";

import './App.css';
import MyProfile from './Components/UserProfile/MyProfile';
import UserAddresses from './Components/UserProfile/UserAddresses';
import UserPaymentOptions from './Components/UserProfile/UserPaymentOptions';
import ChangePassword from './Components/UserProfile/ChangePassword';
import AddAddress from './Components/UserProfile/AddAddress';

function App() {
  const [checkCartStatus, setCheckCartStatus] = React.useState(0);

  const onUpdateCartCount = (status) => {
    setCheckCartStatus(status);
  }
  return (
    <Router>
      <div>
        <Navbar checkCartStatus={checkCartStatus} />
        <Container maxWidth={false}>
          <Switch>
            <Route path='/' exact component={Buy} />
            <Route path='/buy' exact component={() => <Buy purchaseType='buy'/>} />
            <Route path='/rent' exact component={() => <Buy purchaseType='rent'/>} />
            <Route path='/buyList/:categoryName' exact component={() => <BuyList />} />
            <Route path='/productDetails/:itemId' exact component={() => <ProductDetails updateCartCount={(status)=> onUpdateCartCount(status)}/>} />
            <Route path='/cart' exact component={() => <Cart updateCartCount={(status) => onUpdateCartCount(status)} />} />
            <Route path='/myProfile' exact component={() => <MyProfile />} />
            <Route path='/userAddress' exact component={() => <UserAddresses />} />
            <Route path='/paymentOptions' exact component={() => <UserPaymentOptions />} />
            <Route path='/changePwd' exact component={() => <ChangePassword />} />
            <Route path='/addAddress/:custId' exact component={() => <AddAddress />} />
            <Route path='/sell' exact component={() => <Sell/>} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
