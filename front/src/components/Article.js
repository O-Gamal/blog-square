import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Article = ({ articleId, size }) => {
  const [article, setArticle] = useState({});
  const [readTime, setReadTime] = useState();

  useEffect(() => {
    const calcReadTime = async (text) => {
      const wpm = 225;
      const words = await text.trim().split(' ').length;
      const time = Math.ceil(words / wpm);
      setReadTime(time);
    };
    const fechArticle = async () => {
      const { data } = await axios.get(`/api/articles/${articleId}`);
      setArticle(data);
      calcReadTime(article.body);
    };

    fechArticle();
  }, []);

  const bodySnippet =
    typeof article.body === 'string' ? article.body.substring(0, 200) : '';

  return (
    <div
      className={
        size === 'sm' || size === 'xsm'
          ? 'container card flex horizontal article'
          : 'container card flex column article'
      }
    >
      {article.image && (
        <Link to={`/article/${article._id}`} className='link'>
          <img src={article.image} alt={article.title} />
        </Link>
      )}
      {size === 'lg' && (
        <div className='flex meta-container'>
          <div className='flex column'>
            <div className='flex meta'>
              <span className='meta-elem'>{readTime}</span>
              <div className='meta-elem'>
                <span className='material-symbols-outlined'>comment</span>
                {article.comments && (
                  <span>{article.comments.length} comments</span>
                )}
              </div>
            </div>
            <div className='flex tags-container'>
              {article.tags &&
                article.tags.map((tag) => (
                  <span key={tag} className='tag'>
                    {tag}
                  </span>
                ))}
            </div>
          </div>
          <span className='bookmark material-symbols-outlined'>bookmark</span>
        </div>
      )}
      <Link to={`/article/${article._id}`} className='link'>
        <div className='content-container'>
          <h3 className='title'>{article.title}</h3>
          {size !== 'xsm' && <p>{bodySnippet} ...</p>}
        </div>
      </Link>
      {size === 'lg' && (
        <div className='footer-container flex'>
          <span className='author'>by {article.authorId}</span>
          <div className='meta-elem'>
            <span className='material-symbols-outlined'>schedule</span>
            <span>{article.updatedAt}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Article;
