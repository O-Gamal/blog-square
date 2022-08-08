import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import AddArticlePage from './pages/AddArticlePage';
import UserPage from './pages/UserPage';
import ErrorPage from './pages/ErrorPage';
import Layout from './components/Layout';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='article'>
            <Route index element={<AddArticlePage />} />
            <Route path=':articleId' element={<ArticlePage />} />
          </Route>
          <Route path='profile' element={<UserPage />} />
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
