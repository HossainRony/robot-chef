import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register, login, setup2FA, verify2FASetup, logout } from '../services/api';

const initialState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
  qrCode: '',
  otpSetupStatus: 'idle',
};

// User registration
export const registerUser = createAsyncThunk('user/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await register(userData);
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// User login
export const loginUser = createAsyncThunk('user/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await login(userData);
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Setup 2FA
export const setup2FAThunk = createAsyncThunk('user/setup2FA', async (email, { rejectWithValue }) => {
  try {
    const response = await setup2FA(email);
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Verify 2FA setup
export const verify2FASetupThunk = createAsyncThunk('user/verify2FASetup', async ({ email, token }, { rejectWithValue }) => {
  try {
    const response = await verify2FASetup(email, token);
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// User logout
export const logoutUser = createAsyncThunk('user/logout', async (_, { getState, rejectWithValue }) => {
  const token = getState().user.token;
  try {
    await logout(token);
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('username');
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // User registration
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.qrCode = '';
        state.otpSetupStatus = 'idle';
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload.message || 'Registration failed';
      })
      // User login
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload.message || 'Login failed';
      })
      // Setup 2FA
      .addCase(setup2FAThunk.fulfilled, (state, action) => {
        state.qrCode = action.payload.imageUrl;
        state.error = null;
      })
      .addCase(setup2FAThunk.rejected, (state, action) => {
        state.error = action.payload.message || '2FA setup failed';
      })
      // Verify 2FA setup
      .addCase(verify2FASetupThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.otpSetupStatus = 'complete';
        state.error = null;
      })
      .addCase(verify2FASetupThunk.rejected, (state, action) => {
        state.error = action.payload.message || 'OTP verification failed';
      })
      // User logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload.message || 'Logout failed';
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
//export { registerUser, loginUser, setup2FAThunk, verify2FASetupThunk, logoutUser };
