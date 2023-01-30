import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

// login user
export const loginUser = createAsyncThunk(
  'user/login',
  async (formValue, thunkAPI) => {
    try {
      return await userService.loginUser(formValue);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// register user
export const registerUser = createAsyncThunk(
  'user/register',
  async (formValue, thunkAPI) => {
    try {
      return await userService.registerUser(formValue);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// logout user
export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, thunkAPI) => {
    try {
      return await userService.logoutUser();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// update user profile
export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (formValue, thunkAPI) => {
    try {
      return await userService.updateUserProfile(formValue);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// load user
export const loadUser = createAsyncThunk(
  'user/loadUser',
  async (_, thunkAPI) => {
    try {
      return await userService.loadUser();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// update user password
export const updateUserPassword = createAsyncThunk(
  'user/updateUserPassword',
  async (formValue, thunkAPI) => {
    try {
      return await userService.updateUserPassword(formValue);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// forgot password
export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (email, thunkAPI) => {
    try {
      return await userService.forgotPassword(email);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// reset password
export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data, thunkAPI) => {
    try {
      return await userService.resetPassword(data);
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
    isUserUpdated: false,
    success: false,
  },
  reducers: {
    clearErrors: (state, action) => {
      state.error = null;
    },
    resetSuccess: (state, action) => {
      state.success = false;
    },
    resetProfileStatus: (state, action) => {
      state.isUserUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.success = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.success = false;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.isUserUpdated = action.payload.success;
        state.user = action.payload.user;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserPassword.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearErrors, resetProfileStatus, resetSuccess } =
  userSlice.actions;
export default userSlice.reducer;
