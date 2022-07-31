import Button from '../utils/Button';
import ArticleCard from './ArticleCard';
import { ThreeDots } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import {
  getArticles,
  getArticlesStatus,
  getArticlesError,
} from '../../state/articlesSlice';

const AuthorCard = () => {
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
      <ArticleCard
        minimalCard
        key={singleArticle._id}
        article={singleArticle}
      />
    ));
  }

  return (
    <div className='author-card-container'>
      <div className='author-info'>
        <h4 className='author-name'>Omar Gamal abdulzaher</h4>
        <p className='author-followers-number'>135 followers</p>
        <Button width={'50%'} className='primary follow-btn'>
          Follow
        </Button>
      </div>
      <div>
        <h5 className='more-articles-title'>More from Omar</h5>
        {content}
      </div>
    </div>
  );
};

export default AuthorCard;
