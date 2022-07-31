import SearchCard from '../components/cards/SearchCard';
import { useSelector } from 'react-redux';
import AuthCard from '../components/cards/AuthCard';
import RecommendedTopicsCard from '../components/cards/RecommendedTopicsCard';
import Articles from '../components/Articles';
import TrendingArticlesCard from '../components/cards/TrendingArticlesCard';
import Logo from '../components/Logo';
import UserCard from '../components/cards/UserCard';
import { AnimatePresence, motion } from 'framer-motion';

import { getUser } from '../state/userSlice';

const HomePage = () => {
  const user = useSelector(getUser);

  return (
    <div className='home'>
      <div className={`home-container ${user ? 'logged-in' : ''}`}>
        <section className='home-header'>
          <Logo />
          <h3>The ultimate modern blog app for creators.</h3>
        </section>
        {user && (
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
            <UserCard user={user} />
          </motion.section>
        )}
        <section className='card trending-articles-card'>
          <TrendingArticlesCard />
        </section>
        <div></div>
        <section className='card search-card'>
          <SearchCard />
        </section>

        <motion.section
          transition={{
            ease: 'easeOut',
            type: 'spring',
            duration: 0.5,
          }}
          layout='position'
          className='card auth-card'
        >
          <AuthCard />
        </motion.section>
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
