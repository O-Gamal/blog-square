import React from 'react';

const Input = ({
  className,
  placeholder,
  width,
  id,
  value,
  onChange,
  type,
}) => {
  return (
    <input
      style={width ? { width: width } : { width: '100%' }}
      className={`input ${className}`}
      placeholder={placeholder}
      id={id ? id : null}
      value={value}
      onChange={onChange}
      type={type ? type : 'text'}
    />
  );
};

export default Input;
