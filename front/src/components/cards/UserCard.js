import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { logoutUser, reset, getUserStatus } from '../../state/authSlice';

import { updateCurrentTap } from '../../state/userSlice';
import { IoSettings, IoLogOut } from 'react-icons/io5';

const UserCard = ({ userProfile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStatus = useSelector(getUserStatus);

  useEffect(() => {
    if (userProfile) dispatch(reset());
  }, [dispatch, userProfile]);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(reset());
    navigate('/');
  };

  if (userStatus === 'loading')
    return <ThreeDots color='rgb(32, 32, 32)' wrapperClass='spinner' />;

  return (
    <div className='user-panel-card-container'>
      <div className='user-card-header'>
        <h3 className='user-name' onClick={() => navigate('/profile')}>
          {userProfile.name}
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
        <span>{userProfile && userProfile.following.length} Following</span>
        <span>{userProfile && userProfile.followers.length} Followers</span>
      </div>
    </div>
  );
};

export default UserCard;
