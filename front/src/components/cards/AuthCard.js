import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Login from '../Login';
import Register from '../Register';
import { useSelector } from 'react-redux';
import { getUser } from '../../state/userSlice';

const AuthCard = () => {
  const [activeTap, setActiveTap] = useState('signin');
  const user = useSelector(getUser);

  if (user) {
    return (
      <motion.div layout='position' className='latest-bookmarks-card-container'>
        <h5>Latest Bookmarks</h5>
        {user.bookmarks ? (
          user.bookmarks.map((singleArticle) => (
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
  }
  return (
    <motion.div layout='position' className='auth-card-container'>
      <div className='auth-nav'>
        <div
          className={`sign-in nav-elem ${
            activeTap === 'signin' ? 'selected' : ''
          }`}
          onClick={() => setActiveTap('signin')}
        >
          Sign in
        </div>
        <div
          className={`regiser nav-elem ${
            activeTap === 'register' ? 'selected' : ''
          }`}
          onClick={() => setActiveTap('register')}
        >
          Register
        </div>
        <motion.div
          layout
          transition={{
            ease: 'easeOut',
            type: 'spring',
            duration: 0.5,
          }}
          className='selected-elem'
          style={activeTap === 'register' ? { left: 'unset', right: 0 } : {}}
        ></motion.div>
      </div>
      {/* <AnimatePresence exitBeforeEnter> */}
      <motion.div
        key={activeTap}
        initial={
          activeTap === 'register'
            ? { x: -100, opacity: 0 }
            : { x: 100, opacity: 0 }
        }
        animate={{ x: 0, opacity: 1 }}
        transition={{
          ease: 'easeOut',
          type: 'spring',
          duration: 0.3,
        }}
        exit={
          activeTap === 'register'
            ? { x: -100, opacity: 0 }
            : { x: 100, opacity: 0 }
        }
        className='auth-card-container'
      >
        {activeTap === 'register' ? <Register /> : <Login />}
      </motion.div>
      {/* </AnimatePresence> */}
    </motion.div>
  );
};

export default AuthCard;
