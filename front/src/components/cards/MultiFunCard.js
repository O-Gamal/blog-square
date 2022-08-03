import { useSelector } from 'react-redux';
import { getCurrentTap } from '../../state/userSlice';
import UserBookmarks from '../UserBookmarks';
import UserSettings from '../userSettings';
import Auth from '../Auth';

const MultiFunCard = ({ userProfile }) => {
  const currentTap = useSelector(getCurrentTap);

  if (userProfile) {
    if (currentTap === 'bookmarks')
      return <UserBookmarks userProfile={userProfile} />;
    else if (currentTap === 'settings') {
      return <UserSettings userProfile={userProfile} />;
    }
  }
  return <Auth />;
};

export default MultiFunCard;
