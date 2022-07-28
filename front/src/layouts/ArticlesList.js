import { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from '../components/cards/ArticleCard';

const ArticlesList = () => {
  const [articles, setArticles] = useState({});

  useEffect(() => {
    const fechArticles = async () => {
      const { data } = await axios.get(`/api/articles/`);
      setArticles(data);
    };

    fechArticles();
  }, []);

  return (
    <div className='articles-list-container'>
      {articles.length ? (
        articles.map((singleArticle) => (
          <ArticleCard key={singleArticle._id} article={singleArticle} />
        ))
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  );
};

export default ArticlesList;
