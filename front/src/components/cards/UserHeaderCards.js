import { useSelector } from 'react-redux';
import { getUserInfo } from '../../state/authSlice';
import Button from '../utils/Button';

const UserHeaderCards = () => {
  const userProfile = useSelector(getUserInfo);

  return (
    <>
      <section className='card user-header-card'>
        <div className='user-header-card-container'>
          <h2>{userProfile.name}</h2>
          <div className='user-follow-info'>
            <span>{userProfile.following.length} Following</span>
            <span>{userProfile.followers.length} followers</span>
          </div>
        </div>
      </section>
      <section className='card user-connection-card'>
        <div className='user-follow-btns'>
          <Button className='primary follow-btn' width='10rem'>
            Follow
          </Button>
          <Button className='secondary email-btn' width='fit-content'>
            {userProfile.email}
          </Button>
        </div>
      </section>
    </>
  );
};

export default UserHeaderCards;
