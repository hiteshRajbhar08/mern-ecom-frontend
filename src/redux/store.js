import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/productSlice';
import userReducer from './features/userSlice';
// import orderSlice from './features/orderSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    // ordersInfo: orderSlice,
  },
});

export default store;
