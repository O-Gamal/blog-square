import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser, reset } from '../../state/authSlice';

import {
  updateCurrentTap,
  getUserFollowers,
  getUserFollowings,
} from '../../state/userSlice';
import { IoSettings, IoLogOut } from 'react-icons/io5';

const UserCard = ({ profile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const followingList = useSelector(getUserFollowings);
  const followersList = useSelector(getUserFollowers);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(reset());
    navigate('/');
  };

  return (
    <div className='user-panel-card-container'>
      <div className='user-card-header'>
        <h3 className='user-name' onClick={() => navigate('/profile')}>
          {profile.name}
        </h3>
        <div className='user-btns'>
          <IoSettings
            size='1.5rem'
            className='settings-icon icon'
            onClick={() => dispatch(updateCurrentTap('settings'))}
          />
          <IoLogOut
            size='1.8rem'
            className='settings-icon icon'
            onClick={handleLogout}
          />
        </div>
      </div>
      <div className='user-follow-info'>
        <span onClick={() => dispatch(updateCurrentTap('followings'))}>
          {profile.following && followingList && followingList.length} Following
        </span>
        <span onClick={() => dispatch(updateCurrentTap('followers'))}>
          {profile.followers && followersList && followersList.length} Followers
        </span>
      </div>
    </div>
  );
};

export default UserCard;
