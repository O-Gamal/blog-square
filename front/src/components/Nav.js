import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from './Logo';
import { getUserInfo } from '../state/authSlice';

const Nav = () => {
  const navigate = useNavigate();
  const userProfile = useSelector(getUserInfo);

  return (
    <nav className='nav'>
      <Logo size={40} />
      {userProfile ? (
        <h4
          className='user-name'
          onClick={() => navigate('/profile', { replace: true })}
        >
          {userProfile.name}
        </h4>
      ) : (
        <Link to={'register'} className='link'>
          <div className='nav-register'>Register</div>
        </Link>
      )}
    </nav>
  );
};

export default Nav;
