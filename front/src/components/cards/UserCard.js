import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../utils/Button';
import { logoutUser, reset } from '../../state/userSlice';
import { IoSettings, IoLogOut } from 'react-icons/io5';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(reset());
    navigate('/');
  };

  console.log(user);
  return (
    <div className='user-panel-card-container'>
      <div className='user-card-header'>
        <h3>Hello {user.name}</h3>
        <div className='user-btns'>
          <IoSettings size='1.8rem' className='settings-icon icon' />
          <IoLogOut
            size='2rem'
            className='settings-icon icon'
            onClick={handleLogout}
          />
        </div>
      </div>
      <div className='profile-info'>
        <p>
          Following <span>{user.following && user.following.length}</span>{' '}
        </p>
        <p>
          Followers <span>{user.followers && user.followers.length}</span>{' '}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
