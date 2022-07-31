import { BiLike, BiComment } from 'react-icons/bi';
import Comments from '../Comments';
import Button from '../utils/Button';

const CommentsCard = ({ article }) => {
  return (
    <div className='comments-card-container'>
      <div className='article-likes-comments'>
        <h4>
          {article.likesCount}
          <BiLike className='icon' size={'2rem'} />
        </h4>
        <h4>
          {article.comments ? article.comments.length : 0}
          <BiComment className='icon' size={'1.8rem'} />
        </h4>
      </div>
      <div className='article-comments-container'>
        <div className='comments-form'>
          <textarea placeholder='What are your thoughts?' />
          <Button className='secondary cancel-btn'>cancel</Button>
          <Button className='primary publish-btn'>Publish</Button>
        </div>
        <div className='comments-container'>
          <Comments />
        </div>
      </div>
    </div>
  );
};

export default CommentsCard;
