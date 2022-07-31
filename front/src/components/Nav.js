import { Link } from 'react-router-dom';
import Logo from './Logo';
import Button from './utils/Button';

const Nav = () => {
  return (
    <nav className='nav'>
      <Logo size={40} />
      <Link to={'register'} className='link'>
        <div className='nav-register'>Register</div>
      </Link>
    </nav>
  );
};

export default Nav;
