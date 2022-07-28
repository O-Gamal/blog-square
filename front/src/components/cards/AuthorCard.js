import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../Button';
import ArticleCard from './ArticleCard';

const AuthorCard = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fechArticles = async () => {
      const { data } = await axios.get(`/api/articles/`);
      setArticles(data);
    };

    fechArticles();
  }, []);

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
        <h5>More from Omar</h5>
        {articles.length ? (
          <>
            <ArticleCard minimalCard article={articles[0]} />
            <ArticleCard minimalCard article={articles[1]} />
            <ArticleCard minimalCard article={articles[2]} />
            <ArticleCard minimalCard article={articles[3]} />
          </>
        ) : (
          <div>Loading ...</div>
        )}
      </div>
    </div>
  );
};

export default AuthorCard;
