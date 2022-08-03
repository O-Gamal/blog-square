import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const Users_URL = '/api/users/';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  userProfile: null,
  status: 'idle',
  error: null,
};

export const getUserProfile = createAsyncThunk(
  'user/getProfile',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(Users_URL + 'profile', config);
        return data;
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (user, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.put(Users_URL + 'profile', user, config);
        return data;
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const regUser = createAsyncThunk(
  'user/register',
  async (user, thunkAPI) => {
    try {
      const { data } = await axios.post(Users_URL, user);

      if (data) localStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (user, thunkAPI) => {
    try {
      const { data } = await axios.post(Users_URL + 'login', user);

      if (data) localStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await localStorage.removeItem('user');
});

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(regUser.pending, (state, action) => {
        state.status = 'loading';
      })

      .addCase(regUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.user = action.payload;
      })

      .addCase(regUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.status = 'loading';
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.user = action.payload;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null;
        state.userProfile = null;
      })
      .addCase(getUserProfile.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userProfile = action.payload;
      })
      .addCase(updateUserProfile.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userProfile = action.payload;
      });
  },
});

export const getUser = (state) => state.auth.user;
export const getUserStatus = (state) => state.auth.status;
export const getUserError = (state) => state.auth.error;
export const getUserInfo = (state) => state.auth.userProfile;

export const { reset } = authSlice.actions;
export default authSlice.reducer;
