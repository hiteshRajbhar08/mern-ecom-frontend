import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './features/order/orderSlice';
import productReducer from './features/product/productSlice';
import userReducer from './features/user/userSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    order: orderReducer,
  },
});

export default store;
