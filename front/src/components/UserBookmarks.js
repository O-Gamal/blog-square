import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThreeDots } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { getStatus, getUserBookmarks } from '../state/userSlice';
import { getUserProfile } from '../state/authSlice';

import { useNavigate } from 'react-router-dom';

const UserBookmarks = () => {
  const navigate = useNavigate();

  const profile = useSelector(getUserProfile);
  const status = useSelector(getStatus);
  const bookmarks = useSelector(getUserBookmarks);

  if (status === 'loading')
    return <ThreeDots color='rgb(32, 32, 32)' wrapperClass='spinner' />;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className='latest-bookmarks-card-container'
    >
      <h5>Latest Bookmarks</h5>
      {profile.bookmarks.length && bookmarks ? (
        bookmarks.map((singleArticle) => (
          <div key={singleArticle._id} className='article-title-only'>
            <h4 onClick={() => navigate('article/' + singleArticle._id)}>
              {singleArticle.title}
            </h4>
            <hr />
          </div>
        ))
      ) : (
        <p>Your did not save any articles yet</p>
      )}
    </motion.div>
  );
};

export default UserBookmarks;
