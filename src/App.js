import './App.css';
import { useEffect } from 'react';
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
import store from './redux/store';
import { loadUser } from './redux/features/user/userSlice';
import { useSelector } from 'react-redux';
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

axios.defaults.withCredentials = true;

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });

    store.dispatch(loadUser());
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
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
