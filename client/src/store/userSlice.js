// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { register, login, setup2FA, verify2FASetup } from '../services/api';

// const initialState = {
//   user: null,
//   status: 'idle',
//   error: null,
//   qrCode: '',
//   otpSetupStatus: 'idle',
// };

// // User registration
// export const registerUser = createAsyncThunk('user/register', async (userData) => {
//   const response = await register(userData);
//   return response;
// });

// // User login
// export const loginUser = createAsyncThunk('user/login', async (userData) => {
//   const response = await login(userData);
//   return response;
// });

// // Setup 2FA
// export const setup2FAThunk = createAsyncThunk('user/setup2FA', async (email) => {
//   const response = await setup2FA(email);
//   return response;
// });

// // Verify 2FA setup
// export const verify2FASetupThunk = createAsyncThunk('user/verify2FASetup', async ({ email, token }) => {
//   const response = await verify2FASetup(email, token);
//   return response;
// });

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // User registration
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.qrCode = '';
//         state.otpSetupStatus = 'idle';
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.error = action.error.message;
//       })
//       // User login
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.error = action.error.message;
//       })
//       // Setup 2FA
//       .addCase(setup2FAThunk.fulfilled, (state, action) => {
//         state.qrCode = action.payload.imageUrl;
//       })
//       .addCase(setup2FAThunk.rejected, (state, action) => {
//         state.error = action.error.message;
//       })
//       // Verify 2FA setup
//       .addCase(verify2FASetupThunk.fulfilled, (state, action) => {
//         state.otpSetupStatus = 'complete';
//       })
//       .addCase(verify2FASetupThunk.rejected, (state, action) => {
//         state.error = action.error.message;
//       });
//   },
// });

// export default userSlice.reducer;
// //export { registerUser, loginUser, setup2FAThunk, verify2FASetupThunk };


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register, login, setup2FA, verify2FASetup } from '../services/api';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
  qrCode: '',
  otpSetupStatus: 'idle',
};

// User registration
export const registerUser = createAsyncThunk('user/register', async (userData) => {
  const response = await register(userData);
  return response;
});

// User login
export const loginUser = createAsyncThunk('user/login', async (userData) => {
  const response = await login(userData);
  return response;
});

// Setup 2FA
export const setup2FAThunk = createAsyncThunk('user/setup2FA', async (email) => {
  const response = await setup2FA(email);
  return response;
});

// Verify 2FA setup
export const verify2FASetupThunk = createAsyncThunk('user/verify2FASetup', async ({ email, token }) => {
  const response = await verify2FASetup(email, token);
  return response;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // User registration
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.qrCode = '';
        state.otpSetupStatus = 'idle';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // User login
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // Setup 2FA
      .addCase(setup2FAThunk.fulfilled, (state, action) => {
        state.qrCode = action.payload.imageUrl;
      })
      .addCase(setup2FAThunk.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // Verify 2FA setup
      .addCase(verify2FASetupThunk.fulfilled, (state, action) => {
        state.otpSetupStatus = 'complete';
      })
      .addCase(verify2FASetupThunk.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
//export { registerUser, loginUser, setup2FAThunk, verify2FASetupThunk };
