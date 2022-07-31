import { useSelector } from 'react-redux';
import ArticleCard from './cards/ArticleCard';
import { ThreeDots } from 'react-loader-spinner';
import {
  getArticles,
  getArticlesStatus,
  getArticlesError,
} from '../state/articlesSlice';

const Articles = () => {
  const articles = useSelector(getArticles);
  const articlesStatus = useSelector(getArticlesStatus);
  const articlesError = useSelector(getArticlesError);

  let content;
  if (articlesStatus === 'loading') {
    content = (
      <div>
        <ThreeDots color='rgb(32, 32, 32)' wrapperClass='spinner' />
      </div>
    );
  } else if (articlesStatus === 'failed') {
    content = <div>Error {articlesError}</div>;
  } else if (articlesStatus === 'succeeded') {
    content = articles.map((singleArticle) => (
      <ArticleCard key={singleArticle._id} article={singleArticle} />
    ));
  }

  return <div className='articles-list-container'>{content}</div>;
};

export default Articles;
