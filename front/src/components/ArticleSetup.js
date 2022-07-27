import { useState } from 'react';
import Modal from 'react-modal';
import TagsInput from './TagsInput';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.90)',
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    background: '#fff',
    border: 'none',
    width: '75%',
    minHeight: '50vh',
    transform: 'translate(-50%, -50%)',
    padding: '3rem',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  },
};

Modal.setAppElement('#root');

const ArticleSetup = ({ doneWriting, setDoneWriting }) => {
  const [headerImg, setHeaderImg] = useState('');

  //   const getBase64 = (file)  {
  //     let document = "";
  //     let reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = function () {
  //         document = reader.result;
  //     };
  //     reader.onerror = function (error) {
  //         console.log('Error: ', error);
  //     };

  //     return document;
  // }

  const handleInputImg = (e) => {
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      setHeaderImg(e.target.result);
    };
  };

  return (
    <Modal
      isOpen={doneWriting}
      closeTimeoutMS={100}
      onRequestClose={() => setDoneWriting(!doneWriting)}
      style={customStyles}
      contentLabel='Article Setup'
    >
      <div className={'ReactModal'}>
        <h3>Article Setup</h3>
        <form className='grid article-setup-form'>
          <div className='flex column left-col-setup'>
            <div className='full-width'>
              <input
                type='text'
                className='title-input'
                placeholder='Write a preview title...'
              />
              <TagsInput />
            </div>
            <button className='publish-btn'>Publish</button>
          </div>
          <div>
            <h4>Header Image</h4>
            <label htmlFor='img-input' className='flex upload-img-area'>
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
    </Modal>
  );
};

export default ArticleSetup;
