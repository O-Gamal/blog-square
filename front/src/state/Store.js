import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import articlesReducer from './articlesSlice';
import authReducer from './authSlice';
import userReducer from './userSlice';
import { api } from './api/api';

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    auth: authReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
