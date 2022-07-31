import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './articlesSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    user: userReducer,
  },
});

export default store;
