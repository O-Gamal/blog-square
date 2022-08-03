import RichTextEditor from '../components/RichTextEditor.js';
import ArticleSetup from '../components/ArticleSetup';
import Nav from '../components/Nav';

const AddArticlePage = () => {
  return (
    <section className='add-article-page'>
      <Nav />
      <div className='add-article-card-container'>
        <div className=' card text-editor-container'>
          <RichTextEditor />
        </div>
        <ArticleSetup />
      </div>
    </section>
  );
};

export default AddArticlePage;
