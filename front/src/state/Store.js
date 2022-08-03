import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './articlesSlice';
import authReducer from './authSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
