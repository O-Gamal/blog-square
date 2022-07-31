import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './sass/style.scss';
import App from './App';
import { Provider } from 'react-redux';
import store from './state/Store';
import { fetchArticles } from './state/articlesSlice';
// import { loginUser } from './state/userSlice';

store.dispatch(fetchArticles());
// store.dispatch(loginUser());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/*' element={<App />} />
      </Routes>
    </Router>
  </Provider>
);
