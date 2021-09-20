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

import './App.css';

function App() {
  const [checkCartStatus, setCheckCartStatus] = React.useState(0);

  const onUpdateCartCount = (status) => {
    setCheckCartStatus(status);
  }
  return (
    <Router>
    <div>
      <Navbar checkCartStatus={checkCartStatus}/>
      <Container maxWidth={false}>
          <Switch>
            <Route path='/' exact component={Buy} />
            <Route path='/buy' exact component={() => <Buy/>} />
            <Route path='/buyList/:categoryName' exact component={() => <BuyList />} />
            <Route path='/productDetails/:itemId' exact component={() => <ProductDetails updateCartCount={(status)=>onUpdateCartCount(status)}/>} />
            <Route path='/cart' exact component={() => <Cart updateCartCount={(status)=>onUpdateCartCount(status)}/>} />
            <Route path='/sell' exact component={() => <Sell/>} />
          </Switch>
        </Container>
    </div>
    </Router>
  );
}

export default App;
