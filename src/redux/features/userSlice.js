import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

// login user
export const loginUser = createAsyncThunk(
  'auth/login',
  async (formValue, thunkAPI) => {
    try {
      const response = await api.signIn(formValue);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    error: '',
    loading: false,
    isAuthenticated: false,
  },
  reducers: {
    clearErrors: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;
