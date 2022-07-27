import { useState } from 'react';
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

const TagsInput = () => {
  const [tags, setTags] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    if (tags.length < 5) {
      setTags([...tags, tag.toLowerCase()]);
      setErrorMessage('');
    } else {
      setErrorMessage('you have reached to the max number of tags');
    }

    console.log(tags);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
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
        handleDrag={handleDrag}
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
