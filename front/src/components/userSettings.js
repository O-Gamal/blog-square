import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ThreeDots } from 'react-loader-spinner';
import Button from './utils/Button';
import Input from './utils/Input';
import { updateUserProfile, getUserStatus } from '../state/authSlice';
import { updateCurrentTap } from '../state/userSlice';

const UserSettings = ({ userProfile }) => {
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const userStatus = useSelector(getUserStatus);

  const handleUpdateProfileSettings = (e) => {
    e.preventDefault();

    if (password !== password2) {
      setMessage('Passwords do not match!');
    } else {
      dispatch(updateUserProfile({ ...userProfile, name, email, password }));
      dispatch(updateCurrentTap('bookmarks'));
    }
  };

  if (userStatus === 'loading')
    return <ThreeDots color='rgb(32, 32, 32)' wrapperClass='spinner' />;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className='user-settings-card-container'
    >
      <h5>Profile Setting</h5>
      {/* {userProfile.bookmarks.length ? (
        userProfile.bookmarks.map((singleArticle) => (
          <div key={singleArticle._id} className='article-title-only'>
            <h4>{singleArticle.title}</h4>
            <hr />
          </div>
        ))
      ) : (
        <p>Your did not save any articles yet</p>
      )} */}
      <div className='inputs-container'>
        <label htmlFor='name'>update your name:</label>
        <Input
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor='email'>update your email:</label>
        <Input
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='password'>update your password:</label>
        <Input
          id='password'
          placeholder='Enter Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor='password2'>update your password agin:</label>
        <Input
          id='password2'
          placeholder='Confirm Password'
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
      </div>
      {message && <span className='error'>{message}</span>}
      <div className='btns-container'>
        <Button
          className='primary update-settings-btn'
          onClick={handleUpdateProfileSettings}
        >
          Save
        </Button>
        <Button
          className='secondary cancel-settings-btn'
          onClick={() => dispatch(updateCurrentTap('bookmarks'))}
        >
          Cancel
        </Button>
      </div>
    </motion.div>
  );
};

export default UserSettings;
