import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

import Article from '../components/Article';

const ArticlePage = () => {
  const { articleId } = useParams();
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState({});
  const [readTime, setReadTime] = useState();

  useEffect(() => {
    const calcReadTime = async (text) => {
      const wpm = 225;
      const words = await text.trim().split(' ').length;
      const time = Math.ceil(words / wpm);
      setReadTime(time);
    };
    const fechArticles = async () => {
      const { data } = await axios.get('/api/articles');
      setArticles(data);
    };
    const fechArticle = async () => {
      const { data } = await axios.get(`/api/articles/${articleId}`);
      setArticle(data);
      calcReadTime(article.body);
    };

    fechArticle();
    fechArticles();
  }, []);

  const navigate = useNavigate();

  return (
    <section className='container grid article-page-container'>
      <div>
        <div className='button-container'>
          <button className='' onClick={() => navigate('/')}>
            <span className='material-symbols-outlined'>west</span>
          </button>
        </div>
      </div>
      <div>
        <article className='article-container'>
          {article.image && <img src={article.image} alt={article.title} />}
          <div className='container flex space-between above-article'>
            <div className='meta-container flex column'>
              <span>{article.updatedAt}</span>
              <span>{readTime} read</span>
            </div>
            <span className='bookmark-article-page material-symbols-outlined'>
              bookmark
            </span>
          </div>
          <h2>{article.title}</h2>
          {article.body ? parse(article.body) : null}
          <div className='flex article-footer'>
            <div className='flex footer-elem'>
              <span className='material-symbols-outlined'>thumb_up</span>
              <span>{article.likesCount}</span>
            </div>
            <div className='flex footer-elem'>
              <span className='material-symbols-outlined'>comment</span>
              {article.comments && <span>{article.comments.length}</span>}
            </div>
          </div>
          <div>comments section</div>
          <h3>Read More</h3>
          <div className='container flex read-more'>
            {articles.map(
              (ar) =>
                ar._id !== articleId && (
                  <Article key={ar._id} articleId={ar._id} size='sm' />
                )
            )}
          </div>
        </article>
      </div>
      <aside className='aside-container'>
        <h4 className='author-name'>{article.authorId}</h4>
        <p> 85 followers</p>
        <button>Follow</button>
        <p>More from {article.authorId}</p>
        <div className='flex column author-articles'>
          {articles.map(
            (ar) =>
              ar._id !== articleId &&
              ar.author === article.author && (
                <Article key={ar._id} articleId={article._id} size='xsm' />
              )
          )}
        </div>
      </aside>
    </section>
  );
};

export default ArticlePage;
