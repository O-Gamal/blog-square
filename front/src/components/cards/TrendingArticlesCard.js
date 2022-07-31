import { useSelector } from 'react-redux';
import ArticleCard from './ArticleCard';
import Marquee from 'react-fast-marquee';
import { ThreeDots } from 'react-loader-spinner';

import {
  getArticles,
  getArticlesError,
  getArticlesStatus,
} from '../../state/articlesSlice';

const TrendingArticlesCard = () => {
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
    content = (
      <Marquee pauseOnHover pauseOnClick speed={60} gradient={false}>
        <div className='minimal-cards-container'>
          {articles.map((singleArticle) => (
            <ArticleCard
              minimalCard
              key={singleArticle._id}
              article={singleArticle}
            />
          ))}
        </div>
      </Marquee>
    );
  }

  return (
    <div className='trending-articles-card-container'>
      <h5>Trending Articles</h5>
      {content}
    </div>
  );
};

export default TrendingArticlesCard;
