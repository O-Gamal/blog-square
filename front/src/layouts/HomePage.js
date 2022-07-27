import SearchCard from '../components/cards/SearchCard';
import AuthCard from '../components/cards/AuthCard';
import RecommendedTopicsCard from '../components/cards/RecommendedTopicsCard';
import ArticlesList from './ArticlesList';
import TrendingArticlesCard from '../components/cards/TrendingArticlesCard';
import Logo from '../components/Logo';

const HomePage = () => {
  return (
    <div className='home'>
      <div className='home-container'>
        <div className='home-header'>
          <Logo />
          <h3>The ultimate modern blog app for creators.</h3>
        </div>
        <div className='card auth-card'>
          <AuthCard />
        </div>
        <div className='card trending-articles-card'>
          <TrendingArticlesCard />
        </div>
        <div></div>
        <div className='card search-card'>
          <SearchCard />
        </div>
        <div className='card recommended-topics-card'>
          <RecommendedTopicsCard />
        </div>
        <div className='articles-list'>
          <ArticlesList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
