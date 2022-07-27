import React, { Children } from 'react';

const Button = ({ className, children, width }) => {
  return (
    <div style={{ width: '100%' }} className='btn-container'>
      <button
        style={width ? { width: width } : { width: '100%' }}
        className={`button ${className}`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
