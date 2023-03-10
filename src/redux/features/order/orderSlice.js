import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from './orderService';

// create order
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (order, thunkAPI) => {
    try {
      return await orderService.createOrder(order);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// get my orders
export const getMyOrders = createAsyncThunk(
  'order/getMyOrders',
  async (_, thunkAPI) => {
    try {
      return await orderService.getMyOrders();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// get  order details
export const getOrderDetails = createAsyncThunk(
  'order/getOrderDetails',
  async (id, thunkAPI) => {
    try {
      return await orderService.getOrderDetails(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'ordersInfo',
  initialState: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {},
    orders: [],
    order: {},
    orderDetails: {},
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

    saveShippingInfo: (state, { payload }) => {
      state.shippingInfo = payload;

      localStorage.setItem('shippingInfo', JSON.stringify(payload));
    },

    clearErrors: (state, action) => {
      state.error = null;
    },

    successReset: (state, action) => {
      state.success = false;
    },

    clearCart: (state, action) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingInfo,
  clearErrors,
  successReset,
  clearCart,
} = orderSlice.actions;
export default orderSlice.reducer;
