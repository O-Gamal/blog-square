import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const Users_URL = '/api/users/';

const initialState = {
  currentTap: 'bookmarks',
  user: null,
  bookmarks: null,
  followings: null,
  followers: null,
  message: null,
  status: 'idle',
  error: null,
};

export const getUserById = createAsyncThunk(
  'user/getUserById',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(Users_URL + id);
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

export const followUser = createAsyncThunk(
  'user/followUser',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.post(Users_URL + 'follow', { id }, config);
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

export const unfollowUser = createAsyncThunk(
  'user/unfollowUser',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.post(
          Users_URL + 'unfollow',
          { id },
          config
        );
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

export const bookmarkArticle = createAsyncThunk(
  'user/bookmarkArticle',
  async (article, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.post(
          Users_URL + 'bookmarks',
          article,
          config
        );
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

export const getBookmarks = createAsyncThunk(
  'user/getUserBookmarks',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(Users_URL + 'bookmarks', config);
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

export const getFollowings = createAsyncThunk(
  'user/getUserFollowings',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(Users_URL + 'followings', config);
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

export const getFollowers = createAsyncThunk(
  'user/getUserFollowers',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(Users_URL + 'followers', config);
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateCurrentTap: (state, action) => {
      state.currentTap = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //follow
      .addCase(followUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload;
        state.error = null;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      //unfollow
      .addCase(unfollowUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload;
        state.error = null;
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      //bookmark
      .addCase(bookmarkArticle.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(bookmarkArticle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload;
        state.error = null;
      })
      .addCase(bookmarkArticle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getBookmarks.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getBookmarks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookmarks = action.payload;
        state.error = null;
      })
      .addCase(getBookmarks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getFollowings.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getFollowings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.followings = action.payload;
        state.error = null;
      })
      .addCase(getFollowings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getFollowers.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getFollowers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.followers = action.payload;
        state.error = null;
      })
      .addCase(getFollowers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getUserById.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const getCurrentTap = (state) => state.user.currentTap;
export const getUser = (state) => state.user.user;
export const getMessage = (state) => state.user.message;
export const getError = (state) => state.user.error;
export const getStatus = (state) => state.user.status;
export const getUserBookmarks = (state) => state.user.bookmarks;
export const getUserFollowers = (state) => state.user.followers;
export const getUserFollowings = (state) => state.user.followings;

export const { updateCurrentTap } = userSlice.actions;
export default userSlice.reducer;
