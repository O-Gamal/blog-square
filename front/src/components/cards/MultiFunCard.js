import { useSelector } from 'react-redux';
import {
  getCurrentTap,
  getUserFollowers,
  getUserFollowings,
} from '../../state/userSlice';
import UserBookmarks from '../UserBookmarks';
import UserSettings from '../userSettings';
import Auth from '../Auth';
import { getUserProfile } from '../../state/authSlice';
import UserFollowingInfo from '../UserFollowingInfo';

const MultiFunCard = () => {
  const currentTap = useSelector(getCurrentTap);
  const profile = useSelector(getUserProfile);

  if (profile) {
    if (currentTap === 'bookmarks') return <UserBookmarks profile={profile} />;
    else if (currentTap === 'settings') {
      return <UserSettings profile={profile} />;
    } else if (currentTap === 'followings') {
      return <UserFollowingInfo />;
    } else if (currentTap === 'followers') {
      return <UserFollowingInfo follower />;
    }
  }
  return <Auth />;
};

export default MultiFunCard;
