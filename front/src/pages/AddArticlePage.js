import { useState, useEffect } from 'react';

import RichTextEditor from '../components/RichTextEditor.js';
import ArticleSetup from '../components/ArticleSetup';
import Nav from '../components/Nav';

const AddArticlePage = () => {
  useEffect(() => {
    document.title = 'Write a new article...';
  }, []);

  const [articleBody, setArticleBody] = useState('');

  return (
    <section className='add-article-page'>
      <Nav />
      <div className='add-article-card-container'>
        <div className=' card text-editor-container'>
          <RichTextEditor
            setArticleBody={setArticleBody}
            articleBody={articleBody}
          />
        </div>
        <ArticleSetup
          setArticleBody={setArticleBody}
          articleBody={articleBody}
        />
      </div>
    </section>
  );
};

export default AddArticlePage;
