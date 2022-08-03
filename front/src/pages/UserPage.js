import UserHeaderCards from '../components/cards/UserHeaderCards';
import Nav from '../components/Nav';
import Articles from '../components/Articles';

const UserPage = () => {
  return (
    <div className='user-page-container'>
      <Nav />
      <UserHeaderCards />
      <Articles />
    </div>
  );
};

export default UserPage;
