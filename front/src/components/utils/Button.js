const Button = ({ className, children, width, onClick }) => {
  return (
    <div style={{ width: '100%' }} className='btn-container'>
      <button
        style={width ? { width: width } : { width: '100%' }}
        className={`button ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
