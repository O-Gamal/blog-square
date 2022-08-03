import { useState } from 'react';
import TagsInput from './TagsInput';
import Button from './utils/Button';
import Input from './utils/Input';

const ArticleSetup = () => {
  const [headerImg, setHeaderImg] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);

  const handleInputImg = (e) => {
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      setHeaderImg(e.target.result);
    };
  };

  const handleReset = (e) => {
    e.preventDefault();
    setHeaderImg('');
    setTitle('');
    setTags([]);
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
            <Button className='primary publish-btn' width='16rem'>
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
