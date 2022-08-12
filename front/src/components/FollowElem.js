import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../state/authSlice';
import { followUser, unfollowUser } from '../state/userSlice';
import Button from './utils/Button';

const FollowElem = ({ user, followings, setFollowings, followers }) => {
  const dispatch = useDispatch();
  const profile = useSelector(getUserProfile);
  const [button, setButton] = useState(
    profile.following.includes(user._id) ? 'Unfollow' : 'Follow'
  );

  const handleFollow = () => {
    if (button === 'Unfollow') {
      dispatch(unfollowUser(user._id));
      setButton('Follow');
      setFollowings(followings.filter((u) => u._id !== user._id));
    } else {
      dispatch(followUser(user._id));
      setButton('Unfollow');
      setFollowings([...followings, user]);
    }
  };

  return (
    <>
      <div className='user-container' key={user._id}>
        <h4>{user.name}</h4>
        <Button
          width='40%'
          className={button === 'Unfollow' ? 'secondary' : 'primary'}
          onClick={handleFollow}
        >
          {button}
        </Button>
      </div>
      <hr />
    </>
  );
};

export default FollowElem;
