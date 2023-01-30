import './Cart.css';
import CartItemCard from './CartItemCard';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Link } from 'react-router-dom';
import {
  addToCart,
  removeFromCart,
} from '../../redux/features/order/orderSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.order);

  const increaseQuantity = (item) => {
    const newQty = item.quantity + 1;

    if (item.stock <= item.quantity) return;

    dispatch(addToCart({ ...item, quantity: newQty }));
  };

  const decreaseQuantity = (item) => {
    const newQty = item.quantity - 1;
    if (item.quantity <= 1) return;
    dispatch(addToCart({ ...item, quantity: newQty }));
  };

  const deleteCartItems = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button onClick={() => decreaseQuantity(item)}>-</button>
                    <input type="number" value={item.quantity} readOnly />
                    <button onClick={() => increaseQuantity(item)}>+</button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
