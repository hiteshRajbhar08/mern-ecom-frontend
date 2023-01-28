import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/productSlice';
// import authSlice from './features/authSlice';
// import orderSlice from './features/orderSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    // auth: authSlice,
    // ordersInfo: orderSlice,
  },
});

export default store;
