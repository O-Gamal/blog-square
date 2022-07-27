import { RiBookmarkLine } from 'react-icons/ri';
import Tag from '../Tag';

const ArticleCard = ({ minimalCard }) => {
  return (
    <div
      className={!minimalCard ? 'card article-card' : 'minimal article-card'}
    >
      <div className='article-card-container'>
        {!minimalCard && (
          <div className='article-img-container'>
            <img
              className='article-img'
              src='https://images.unsplash.com/photo-1649859396073-13ff3244ec1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
            />
          </div>
        )}
        <div className='article-content'>
          <div className='top-area'>
            <div className='article-meta'>
              {!minimalCard && <span>by Omar Gamal</span>}
              <span>Published 17 days ago</span>
            </div>
            {!minimalCard && (
              <RiBookmarkLine className='bookmark-icon' size={'2rem'} />
            )}
          </div>
          <div className='article-title-container'>
            <h4 className='article-title'>
              Case Study: CloudSpot. Logo Redesign for Photographers Gallery.
            </h4>
          </div>
          {!minimalCard && (
            <div className='article-bottom-area'>
              <Tag tag='Art' size='sm' />
              <Tag tag='Engineering' size='sm' />
              <Tag tag='Health' size='sm' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
