import { SpeedDial, SpeedDialAction } from '@mui/material';
import {
  Dashboard,
  Person,
  ExitToApp,
  ListAlt,
  ShoppingCart,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useAlert } from 'react-alert';
import { logoutUser } from '../../../redux/features/user/userSlice';
import './Header.css';

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { cartItems } = useSelector((state) => state.order);

  const orders = () => {
    navigate('/orders');
  };

  const account = () => {
    navigate('/acount');
  };

  const cart = () => {
    navigate('/cart');
  };

  const dashboard = () => {
    navigate('/admin/dashboard');
  };

  const logout = () => {
    dispatch(logoutUser());

    alert.success('Logged out successfully');
    navigate('/');
  };

  const options = [
    { icon: <ListAlt />, name: 'Orders', func: orders },
    { icon: <Person />, name: 'Profile', func: account },
    {
      icon: (
        <ShoppingCart
          style={{ color: cartItems.length > 0 ? 'tomato' : 'unset' }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToApp />, name: 'Logout', func: logout },
  ];

  if (user.role === 'admin') {
    options.unshift({
      icon: <Dashboard />,
      name: 'Dashboard',
      func: dashboard,
    });
  }

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: '11' }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar ? user.avatar.url : '/Profile.png'}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
