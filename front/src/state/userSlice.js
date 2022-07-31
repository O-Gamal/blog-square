import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const Users_URL = '/api/users/';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  status: 'idle',
  error: null,
};

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

const userSlice = createSlice({
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
      });
  },
});

export const getUser = (state) => state.user.user;
export const getUserStatus = (state) => state.user.status;
export const getUserError = (state) => state.user.error;

// export const selectArticleById = (state, articleId) =>
//   state.articles.articles.find(
//     (singleArticle) => singleArticle._id === articleId
//   );

export const { reset } = userSlice.actions;
export default userSlice.reducer;
