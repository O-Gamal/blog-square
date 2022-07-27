import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className='nav flex bg-primary'>
      <div className='logo'>BlogSquare.</div>
      <Link to={'register'} className='link h4'>
        Register Now
      </Link>
    </nav>
  );
};

export default Nav;
