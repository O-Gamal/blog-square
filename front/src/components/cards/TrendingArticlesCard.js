import ArticleCard from './ArticleCard';
import Marquee from 'react-fast-marquee';

const TrendingArticlesCard = () => {
  return (
    <div className='trending-articles-card-container'>
      <h4>Trending Articles</h4>
      <Marquee pauseOnHover pauseOnClick speed={60} gradient={false}>
        <div className='minimal-cards-container'>
          <ArticleCard minimalCard />
          <ArticleCard minimalCard />
          <ArticleCard minimalCard />
          <ArticleCard minimalCard />
          <ArticleCard minimalCard />
        </div>
      </Marquee>
    </div>
  );
};

export default TrendingArticlesCard;
