import { useState, useEffect } from 'react';
import SearchCard from '../components/cards/SearchCard';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoAdd } from 'react-icons/io5';
import MultiFunCard from '../components/cards/MultiFunCard';
import RecommendedTopicsCard from '../components/cards/RecommendedTopicsCard';
import Articles from '../components/Articles';
import TrendingArticlesCard from '../components/cards/TrendingArticlesCard';
import Logo from '../components/Logo';
import UserCard from '../components/cards/UserCard';
import { motion } from 'framer-motion';

import { getUser, getUserProfile, getUserInfo } from '../state/authSlice';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  useEffect(() => {
    if (user) dispatch(getUserProfile());
  }, [user, dispatch]);

  const userProfile = useSelector(getUserInfo);

  return (
    <div className='home'>
      <div className={`home-container ${user ? 'logged-in' : ''}`}>
        <section className='home-header'>
          <Logo />
          <h3>The ultimate modern blog app for creators.</h3>
        </section>
        {user && userProfile && (
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
            <UserCard userProfile={userProfile} />
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
          {user && userProfile && (
            <section
              className='card h4 write-new-article-btn'
              onClick={() => navigate('/article')}
            >
              <IoAdd />
              Wrtie a new article
            </section>
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
            <MultiFunCard userProfile={userProfile} />
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
