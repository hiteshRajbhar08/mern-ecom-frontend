import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import Home from './components/home/Home';
import Footer from './components/layout/footer/Footer';
import Header from './components/layout/header/Header';
import ProductDetails from './components/product/ProductDetails';
import Products from './components/product/Products';
import Search from './components/product/Search';
import axios from 'axios';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { loadUser } from './redux/features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import UserOptions from './components/layout/header/UserOptions';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/routes/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './components/cart/OrderSuccess';

axios.defaults.withCredentials = true;

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [stripePromise] = useState(() =>
    loadStripe(process.env.REACT_APP_STRIPE_API_KEY)
  );

  // const [stripeApiKey, setStripeApiKey] = useState('');

  // async function getStripeApiKey() {
  //   const { data } = await axios.get('/api/v1/stripeapikey');

  //   setStripeApiKey(data.stripeApiKey);
  // }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });

    dispatch(loadUser());
    // getStripeApiKey();
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route
            path="/acount"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updateProfile"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-password"
            element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shipping"
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/confirm"
            element={
              <ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />
          {
            <Route
              path="/process/payment"
              element={
                <ProtectedRoute>
                  <Elements stripe={stripePromise}>
                    <Payment />
                  </Elements>
                </ProtectedRoute>
              }
            />
          }

          {/* <Route
            path="/process/payment"
            element={
              stripeApiKey && (
                <ProtectedRoute>
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                </ProtectedRoute>
              )
            }
          /> */}
          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
