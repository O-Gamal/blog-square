import React from 'react';

const Input = ({ className, placeholder, width, id }) => {
  return (
    <input
      style={width ? { width: width } : { width: '100%' }}
      className={`input ${className}`}
      placeholder={placeholder}
      id={id ? id : null}
    />
  );
};

export default Input;
