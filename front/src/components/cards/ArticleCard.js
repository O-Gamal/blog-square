import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RiBookmarkLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Tag from '../Tag';
import { getUser, getUserById } from '../../state/userSlice';

const ArticleCard = ({ minimalCard, article }) => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getUserById(article.authorId));
  // }, [dispatch]);

  // const author = useSelector(getUser);

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
              {!minimalCard && <span>by Test Name</span>}
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
                <Tag key={singleTag._id} tag={singleTag.text} size='sm' />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
