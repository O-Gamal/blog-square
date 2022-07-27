import React from 'react';

const Tag = ({ tag, size }) => {
  return <div className={`tag ${size}`}>{tag}</div>;
};

export default Tag;
