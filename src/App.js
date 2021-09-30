import React from 'react';
import {BrowserRouter as Router,  Switch,  Route} from "react-router-dom";
import Container from '@material-ui/core/Container';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Navbar from './Components/Navbar';
import Buy from './Components/Buy';
import BuyList from './Components/Buy/BuyList';
import ProductDetails from './Components/Buy/ProductDetails';
import Cart from './Components/Cart';
import ConfirmSignUp from './SignUp/ConfirmSignUp';
import './App.css';
Amplify.configure(awsconfig);

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [checkCartStatus, setCheckCartStatus] = React.useState(0);
  const onIsLoggedIn = (isLoggedIn) => {
    setIsLoggedIn(isLoggedIn);
  }

  const onUpdateCartCount = (status) => {
    setCheckCartStatus(status);
  }
  return (
    <Router>
    <div>
      <Navbar checkCartStatus={checkCartStatus}/>
      {/* <Header isLoggedIn={isLoggedIn} onIsLoggedIn={onIsLoggedIn} /> */}
      <Container maxWidth={false}>
          <Switch>
            <Route path='/' exact component={Buy} />  
            <Route path='/signIn' exact component={() => <SignIn onIsLoggedIn={onIsLoggedIn} />} />
            <Route path='/signUp' exact component={() => <SignUp />} /> 
            {/* <Route path='/signUp' exact component={SignUp } /> */}
            <Route path='/confirmSignUp/:email' exact component={ConfirmSignUp} />
            <Route path='/buy' exact component={() => <Buy/>} />
            <Route path='/buyList/:categoryName' exact component={() => <BuyList />} />
            <Route path='/productDetails/:itemId' exact component={() => <ProductDetails updateCartCount={(status)=>onUpdateCartCount(status)}/>} />
            <Route path='/cart' exact component={() => <Cart updateCartCount={(status)=>onUpdateCartCount(status)}/>} />
          </Switch>
        </Container>
    </div>
    </Router>
  );
}

export default App;
