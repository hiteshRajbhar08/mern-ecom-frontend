import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

// get all products
export const getProducts = createAsyncThunk(
  '/product/getProducts',
  async (_, thunkAPI) => {
    try {
      const response = await api.getProducts();
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// get product details
export const getProductDetails = createAsyncThunk(
  '/product/getProductDetails',
  async (id, thunkAPI) => {
    try {
      const response = await api.getProductDetails(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    product: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearErrors: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearErrors } = productSlice.actions;
export default productSlice.reducer;
