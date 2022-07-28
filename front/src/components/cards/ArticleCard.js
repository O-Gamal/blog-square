import { RiBookmarkLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Tag from '../Tag';

const ArticleCard = ({ minimalCard, article }) => {
  return (
    <div
      className={!minimalCard ? 'card article-card' : 'minimal article-card'}
    >
      <div
        className={`article-card-container ${article.image ? '' : 'no-img'}`}
      >
        {!minimalCard && article.image && (
          <Link className='link' to={`/article/${article._id}`}>
            <div className='article-img-container'>
              <img className='article-img' src={article.image} />
            </div>
          </Link>
        )}
        <div className='article-content'>
          <div className='top-area'>
            <div className='article-meta'>
              {!minimalCard && <span>by {article.authorId}</span>}
              <span>Published {moment(article.updatedAt).fromNow()}</span>
            </div>
            {!minimalCard && (
              <RiBookmarkLine className='bookmark-icon' size={'2rem'} />
            )}
          </div>
          <Link className='link' to={`/article/${article._id}`}>
            <div className='article-title-container'>
              <h4 className='article-title'>{article.title}</h4>
            </div>
          </Link>
          {!minimalCard && (
            <div className='article-bottom-area'>
              {article.tags.map((singleTag) => (
                <Tag key={singleTag} tag={singleTag} size='sm' />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
