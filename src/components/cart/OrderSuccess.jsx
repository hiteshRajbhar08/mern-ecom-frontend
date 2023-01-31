import { CheckCircle } from '@mui/icons-material';
import './OrderSuccess.css';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircle />
      <Typography>Your order has been placed successfully</Typography>
      <Link to="/order/me">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
