import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import Nav from '../components/Nav';
import { RiBookmarkLine } from 'react-icons/ri';
import { IoArrowBackSharp } from 'react-icons/io5';

import Article from '../components/Article';
import moment from 'moment';
import AuthorCard from '../components/cards/AuthorCard';
import CommentsCard from '../components/cards/CommentsCard';
import ReadNextCard from '../components/cards/ReadNextCard';

const ArticlePage = () => {
  const { articleId } = useParams();
  // const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState({});

  useEffect(() => {
    //   const fechArticles = async () => {
    //     const { data } = await axios.get('/api/articles');
    //     setArticles(data);
    //   };
    const fechArticle = async () => {
      const { data } = await axios.get(`/api/articles/${articleId}`);
      setArticle(data);
    };

    fechArticle();
    //   fechArticles();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <header>
        <Nav />
      </header>
      <section className='article-page'>
        <div className='article-page-container'>
          <div className='card h4 go-back-btn' onClick={() => navigate('/')}>
            <IoArrowBackSharp />
            Go Back
          </div>
          <article className='article-container'>
            {article.image && (
              <img className='article-img' src={article.image} />
            )}
            <div className='article-page-top-area'>
              <div className='article-meta'>
                <h5 className='meta-elem'>
                  Published <span>{moment(article.updatedAt).fromNow()}</span>
                </h5>
                <h5 className='meta-elem'>
                  Read Time <span>11 Minutes</span>
                </h5>
              </div>
              <RiBookmarkLine className='bookmark-icon' size={'2.5rem'} />
            </div>
            <div className='article-title-container'>
              <h2>{article.title}</h2>
            </div>
            <div className='article-body-container'>
              {article.body && parse(article.body)}
            </div>
          </article>

          <div className='card author-card'>
            <AuthorCard />
          </div>
          <div className='card comments-card'>
            <CommentsCard />
          </div>
          <div className='card read-next'>
            <ReadNextCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default ArticlePage;
