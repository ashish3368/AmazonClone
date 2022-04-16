import React, {useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {auth} from './utilities/firebase/firebase';
import { useStateValue } from './StateProvider/StateProvider';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import LogIn from './components/LogIn/LogIn';
import Checkout from './components/Pages/Checkout/Checkout';
import Payment from './components/Pages/Checkout/Payment';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51KFCNNSHgQ85MCTZxYhpmqSS7WlRhB5s9IahoVFfbXT0VToelK7Qpt7eD3bZpnsvYtfSj1a0Fw5llPU6Yt7tE73500kXYYo1Sv');


function App() {
  const [{}, dispatch] = useStateValue();
  
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log("the user is ", authUser);
      if(authUser){
        // the user just logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })

      } else {
        // the user is logged out.
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, []);
  return (

    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/login" element={[<LogIn />]} />
          <Route path="/checkout" element={[<Header />, <Checkout />]} />
          <Route path="/payment" element={[<Header />,<Elements stripe={stripePromise}> <Payment /> </Elements>]} />
          <Route path="/" element={[<Header/>, <Home />]} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
