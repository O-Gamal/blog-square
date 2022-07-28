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
        <section className='home-header'>
          <Logo />
          <h3>The ultimate modern blog app for creators.</h3>
        </section>
        <section className='card auth-card'>
          <AuthCard />
        </section>
        <section className='card trending-articles-card'>
          <TrendingArticlesCard />
        </section>
        <div></div>
        <section className='card search-card'>
          <SearchCard />
        </section>
        <section className='card recommended-topics-card'>
          <RecommendedTopicsCard />
        </section>
        <section className='articles-list'>
          <ArticlesList />
        </section>
      </div>
    </div>
  );
};

export default HomePage;
