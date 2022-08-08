import moment from 'moment';
import { RiBookmarkLine } from 'react-icons/ri';
import parse from 'html-react-parser';
import MDEditor from '@uiw/react-md-editor';

const Article = ({ article }) => {
  return (
    <article className='article-container'>
      {article.image && <img className='article-img' src={article.image} />}
      <div className='article-page-top-area'>
        <div className='article-meta'>
          <h5 className='meta-elem'>
            Published <span>{moment(article.updatedAt).fromNow()}</span>
          </h5>
          <h5 className='meta-elem'>
            Read Time <span>11 Minutes</span>
          </h5>
        </div>
        <RiBookmarkLine className='bookmark-icon' size={'2.5rem'} />
      </div>
      <div className='article-title-container'>
        <h2>{article.title}</h2>
      </div>
      <div className='article-body-container'>
        {article.body && <MDEditor.Markdown source={article.body} />}
      </div>
    </article>
  );
};

export default Article;
