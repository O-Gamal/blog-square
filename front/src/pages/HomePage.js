import { useEffect, useState } from 'react';
import SearchCard from '../components/cards/SearchCard';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoAdd } from 'react-icons/io5';
import { ThreeDots } from 'react-loader-spinner';
import MultiFunCard from '../components/cards/MultiFunCard';
import RecommendedTopicsCard from '../components/cards/RecommendedTopicsCard';
import Articles from '../components/Articles';
import TrendingArticlesCard from '../components/cards/TrendingArticlesCard';
import Logo from '../components/Logo';
import UserCard from '../components/cards/UserCard';
import { motion } from 'framer-motion';
import {
  getProfile,
  getUser,
  getUserProfile,
  getUserStatus,
  loginUser,
} from '../state/authSlice';
import {
  getBookmarks,
  getFollowings,
  getFollowers,
  getUserFollowers,
  getUserFollowings,
  getStatus,
} from '../state/userSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);

  useEffect(() => {
    document.title = 'BlogSquare';
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(getProfile());
      dispatch(getBookmarks());
      dispatch(getFollowings());
      dispatch(getFollowers());
    }
  }, [user, dispatch]);

  const profile = useSelector(getUserProfile);
  const userStatus = useSelector(getUserStatus);
  const status = useSelector(getStatus);

  if (userStatus === 'loading')
    return <ThreeDots color='rgb(32, 32, 32)' wrapperClass='spinner' />;

  return (
    <div className='home'>
      <div className={`home-container ${user ? 'logged-in' : ''}`}>
        <header className='home-header'>
          <Logo />
          <h3>The ultimate modern blog app for creators.</h3>
        </header>
        {user && profile && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              ease: 'easeOut',
              type: 'spring',
              duration: 0.5,
              delay: 0.25,
            }}
            className='card user-panel-card'
          >
            <UserCard profile={profile} />
          </motion.section>
        )}

        <section className='card trending-articles-card'>
          <TrendingArticlesCard />
        </section>
        <div></div>
        <section className='card search-card'>
          <SearchCard />
        </section>
        <section className='user-updated-home-container'>
          {user && profile && (
            <div
              className='card h4 write-new-article-btn'
              onClick={() => navigate('/article')}
            >
              <IoAdd />
              Wrtie a new article
            </div>
          )}

          <motion.section
            transition={{
              ease: 'easeOut',
              type: 'spring',
              duration: 0.5,
            }}
            layout='position'
            className='card multi-func-card'
          >
            <MultiFunCard />
          </motion.section>
        </section>

        <section className='card recommended-topics-card'>
          <RecommendedTopicsCard />
        </section>
        <section className='articles-list'>
          <Articles />
        </section>
      </div>
    </div>
  );
};

export default HomePage;
