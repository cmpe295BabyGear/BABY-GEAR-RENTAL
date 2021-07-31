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

import './App.css';

function App() {
  return (
    <Router>
    <div>
      <Navbar />
      <Container maxWidth={false}>
          <Switch>
            <Route path='/' exact component={Buy} />
            <Route path='/buy' exact component={() => <Buy />} />
            <Route path='/buyList/:categoryName' exact component={() => <BuyList />} />
            <Route path='/productDetails/:itemId' exact component={() => <ProductDetails />} />
            <Route path='/cart' exact component={() => <Cart />} />
          </Switch>
        </Container>
    </div>
    </Router>
  );
}

export default App;
