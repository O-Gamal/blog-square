import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  addNewArticle,
  getArticlesStatus,
  getArticleId,
  reset,
} from '../state/articlesSlice';
import TagsInput from './TagsInput';
import Button from './utils/Button';
import Input from './utils/Input';

const ArticleSetup = ({ articleBody, setArticleBody }) => {
  const dispatch = useDispatch();
  const [headerImg, setHeaderImg] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);

  const handleInputImg = (e) => {
    let files = e.target.files[0];
    setHeaderImg(URL.createObjectURL(files));
    // let reader = new FileReader();
    // reader.readAsDataURL(files[0]);
    // reader.onload = (e) => {
    //   setHeaderImg(e.target.result);
    // };
  };

  const handleReset = (e) => {
    e.preventDefault();
    setHeaderImg('');
    setTitle('');
    setTags([]);
  };

  const handlePublish = (e) => {
    e.preventDefault();

    const article = { title, body: articleBody, tags, image: headerImg };
    dispatch(addNewArticle(article));
    // setArticleBody('');
    // setTags([]);
    // setTitle('');
    // setHeaderImg('');
  };

  return (
    <div className='card article-setup-card'>
      <h3>Article Setup</h3>
      <hr />
      <form className='article-setup-form'>
        <div className='left-col-setup'>
          <div className='full-width inputs-container'>
            <label className='h5'>
              Enter Your article title and related tags bellow:
            </label>
            <Input
              type='text'
              className='title-input'
              placeholder='Write a preview title...'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TagsInput tags={tags} setTags={setTags} />
          </div>
          <div className='buttons-container'>
            <Button
              className='primary publish-btn'
              width='16rem'
              onClick={handlePublish}
            >
              Publish
            </Button>
            <Button
              className='secondary delete-img-btn'
              width='fit-content'
              onClick={handleReset}
            >
              reset
            </Button>
          </div>
        </div>
        <div className='right-col-setup'>
          <h5>Header Image</h5>

          <label htmlFor='img-input' className='upload-img-area'>
            {headerImg ? (
              <img src={headerImg} alt='header img' />
            ) : (
              <span className='img-input-span'>
                Include a high-quality image in your story to make it more
                inviting to readers
              </span>
            )}
          </label>
          <input
            id='img-input'
            type='file'
            name='photo'
            onChange={handleInputImg}
            style={{ display: 'none' }}
          />
        </div>
      </form>
    </div>
  );
};

export default ArticleSetup;
