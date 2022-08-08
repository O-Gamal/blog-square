import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const ARTICLES_URL = '/api/articles/';

const initialState = {
  articles: [],
  article: null,
  status: 'idle',
  error: null,
};

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async () => {
    try {
      const { data } = await axios.get(ARTICLES_URL);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const getArticleById = createAsyncThunk(
  'articles/getArticleById',
  async (id) => {
    try {
      const { data } = await axios.get(ARTICLES_URL + id);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const addNewArticle = createAsyncThunk(
  'articles/addNewArticle',
  async (article, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.post(ARTICLES_URL, article, config);
        console.log(data);
        return data;
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue('async thunk error:' + message);
    }
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    reset: (state) => {
      state.status = 'idle';
      state.error = null;
      state.article = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state, action) => {
        state.status = 'loading';
      })

      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })

      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewArticle.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(addNewArticle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.article = action.payload;
        state.articles.push(action.payload);
      })
      .addCase(addNewArticle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getArticleById.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getArticleById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.article = action.payload;
        state.articles.push(action.payload);
      })
      .addCase(getArticleById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const getArticles = (state) => state.articles.articles;
export const getArticlesStatus = (state) => state.articles.status;
export const getArticlesError = (state) => state.articles.error;
export const getArticle = (state) => state.articles.article;

export const selectArticleById = (state, articleId) =>
  state.articles.articles.find(
    (singleArticle) => singleArticle._id === articleId
  );

export const { reset } = articlesSlice.actions;
export default articlesSlice.reducer;
