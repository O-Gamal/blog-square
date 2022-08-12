import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../state/authSlice';
import { ThreeDots } from 'react-loader-spinner';
import {
  followUser,
  unfollowUser,
  getUserFollowings,
  getUserFollowers,
  getStatus,
} from '../state/userSlice';
import FollowElem from './FollowElem';

const UserFollowingInfo = ({ follower }) => {
  const dispatch = useDispatch();
  const profile = useSelector(getUserProfile);
  // const status = useSelector(getStatus);

  const followingList = useSelector(getUserFollowings);
  const followersList = useSelector(getUserFollowers);

  const [followings, setFollowings] = useState(followingList);
  const [followers, setFollowers] = useState(followersList);

  return (
    <div className='following-list'>
      {follower ? (
        <>
          <h5>Followers List</h5>
          {followers &&
            followers.map((user) => (
              <FollowElem user={user} key={user._id} followers={followers} />
            ))}
        </>
      ) : (
        <>
          <h5>Following List</h5>
          {followings &&
            followings.map((user) => (
              <FollowElem
                user={user}
                followings={followings}
                setFollowings={setFollowings}
                key={user._id}
              />
            ))}
        </>
      )}
    </div>
  );
};

export default UserFollowingInfo;
