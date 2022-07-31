import { useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';
import {
  getArticles,
  getArticlesError,
  getArticlesStatus,
} from '../../state/articlesSlice';

const ReadNextCard = ({ article }) => {
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
  } else {
    content = articles.map((singleArticle) => (
      <div key={singleArticle._id} className='article-title-only'>
        <h4>{singleArticle.title}</h4>
        <hr />
      </div>
    ));
  }

  return (
    <div className='read-next-container'>
      <h5>Read Next:</h5>
      {content}
    </div>
  );
};

export default ReadNextCard;
