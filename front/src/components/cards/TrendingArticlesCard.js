import { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard';
import Marquee from 'react-fast-marquee';

const TrendingArticlesCard = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fechArticles = async () => {
      const { data } = await axios.get(`/api/articles/`);
      setArticles(data);
    };

    fechArticles();
  }, []);

  return (
    <div className='trending-articles-card-container'>
      <h4>Trending Articles</h4>
      {articles.length ? (
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
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  );
};

export default TrendingArticlesCard;
