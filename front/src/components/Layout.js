import Nav from './Nav';
import { Outlet } from 'react-router-dom';
import FooterCard from './cards/FooterCard';

const Layout = () => {
  return (
    <div className='app'>
      {/* <Nav /> */}
      <Outlet />
      <FooterCard />
    </div>
  );
};

export default Layout;
