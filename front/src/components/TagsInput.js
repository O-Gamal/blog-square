import { useState, useEffect } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

// const suggestions = COUNTRIES.map(country => {
//     return {
//       id: country,
//       text: country
//     };
//   });

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const TagsInput = ({ tags, setTags }) => {
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
  }, [tags]);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    if (tags.length < 5) {
      const tagLowerCase = tag.text.toLowerCase();
      setTags([...tags, { ...tag, id: tagLowerCase, text: tagLowerCase }]);
      setErrorMessage('');
    } else {
      setErrorMessage('you have reached to the max number of tags');
    }
  };

  const handleTagClick = (index) => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  return (
    <>
      <ReactTags
        tags={tags}
        //   suggestions={suggestions}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleTagClick={handleTagClick}
        inputFieldPosition='top'
        placeholder='Add (up to 5 tags) so readers find you easily'
        autocomplete
      />
      <div className='error'>{errorMessage}</div>
    </>
  );
};

export default TagsInput;
