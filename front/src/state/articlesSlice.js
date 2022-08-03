import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const ARTICLES_URL = '/api/articles';

const initialState = {
  articles: [],
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

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state, action) => {
        state.status = 'loading';
      })

      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = state.articles.concat(action.payload);
      })

      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const getArticles = (state) => state.articles.articles;
export const getArticlesStatus = (state) => state.articles.status;
export const getArticlesError = (state) => state.articles.error;

export const selectArticleById = (state, articleId) =>
  state.articles.articles.find(
    (singleArticle) => singleArticle._id === articleId
  );

// export const { addArticle, likeArticle } = articlesSlice.actions;
export default articlesSlice.reducer;
