import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'ordersInfo',
  initialState: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    addToCart: (state, { payload }) => {
      const data = payload;

      const isItemExist = state.cartItems.find(
        (item) => item.product === data.product
      );

      if (isItemExist) {
        state.cartItems = state.cartItems.map((item) =>
          item.product === isItemExist.product ? data : item
        );
      } else {
        state.cartItems = [...state.cartItems, data];
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, { payload }) => {
      const product = payload;

      state.cartItems = state.cartItems.filter(
        (item) => item.product !== product
      );
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
  },
  extraReducers: {},
});

export const { addToCart, removeFromCart } = orderSlice.actions;
export default orderSlice.reducer;
