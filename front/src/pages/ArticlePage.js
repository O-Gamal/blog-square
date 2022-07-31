import { useParams, useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import { IoArrowBackSharp } from 'react-icons/io5';

import AuthorCard from '../components/cards/AuthorCard';
import CommentsCard from '../components/cards/CommentsCard';
import ReadNextCard from '../components/cards/ReadNextCard';

import { useSelector } from 'react-redux';
import { selectArticleById } from '../state/articlesSlice';
import Article from '../components/Article';
import { ThreeDots } from 'react-loader-spinner';

const ArticlePage = () => {
  const { articleId } = useParams();
  const article = useSelector((state) => selectArticleById(state, articleId));
  let articleState = (
    <ThreeDots color='rgb(32, 32, 32)' wrapperClass='spinner' />
  );

  const navigate = useNavigate();

  return (
    <>
      <header>
        <Nav />
      </header>
      <section className='article-page'>
        <div className='article-page-container'>
          <div className='card h4 go-back-btn' onClick={() => navigate('/')}>
            <IoArrowBackSharp />
            Home
          </div>
          {article ? (
            <>
              <div className='article'>
                <Article article={article} />
              </div>

              <div className='card author-card'>
                <AuthorCard />
              </div>
              <div className='card comments-card'>
                <CommentsCard article={article} />
              </div>
              <div className='card read-next'>
                <ReadNextCard article={article} />
              </div>
            </>
          ) : (
            <div>{articleState}</div>
          )}
        </div>
      </section>
    </>
  );
};

export default ArticlePage;
