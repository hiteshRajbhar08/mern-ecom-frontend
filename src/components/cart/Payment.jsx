import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import MetaData from '../layout/MetaData';
import CheckOutSteps from './CheckOutSteps';
import { useAlert } from 'react-alert';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { CreditCard, Event, VpnKey } from '@mui/icons-material';
import axios from 'axios';
import './Payment.css';
import { useEffect, useRef } from 'react';
import {
  clearCart,
  clearErrors,
  createOrder,
} from '../../redux/features/order/orderSlice';

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems, error } = useSelector(
    (state) => state.order
  );
  const { user } = useSelector((state) => state.user);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice) * 100,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    const order = {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice: orderInfo.subTotal,
      taxPrice: orderInfo.tax,
      shippingPrice: orderInfo.shippingCharges,
      totalPrice: orderInfo.totalPrice,
    };

    try {
      const { data } = await axios.post('/api/v1/payment/process', paymentData);

      const client_secret = data.client_secret;
      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          navigate('/success');
          localStorage.removeItem('cartItems');
          dispatch(clearCart());
        } else {
          alert.error("There's some issue while processing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert]);

  return (
    <>
      <MetaData title="Payment" />
      <CheckOutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCard />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <Event />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKey />
            <CardCvcElement className="paymentInput" />
          </div>
          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </>
  );
};

export default Payment;
