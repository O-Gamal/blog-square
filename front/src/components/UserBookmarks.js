import { motion } from 'framer-motion';

const UserBookmarks = ({ userProfile }) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className='latest-bookmarks-card-container'
    >
      <h5>Latest Bookmarks</h5>
      {userProfile.bookmarks.length ? (
        userProfile.bookmarks.map((singleArticle) => (
          <div key={singleArticle._id} className='article-title-only'>
            <h4>{singleArticle.title}</h4>
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
