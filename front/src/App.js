import { Routes, Route } from 'react-router-dom';
import HomePage from './layouts/HomePage';
import ArticlePage from './layouts/ArticlePage';
import AddArticle from './layouts/AddArticle';
import EditArticle from './layouts/EditArticle';
import ErrorPage from './layouts/ErrorPage';
import Layout from './components/Layout';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        {/* <Route path='article'>
          <Route index element={<AddArticle />} />
          <Route path=':articleId' element={<ArticlePage />} />
          <Route path='edit/:articleId' element={<EditArticle />} />
        </Route> */}
      </Route>
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
