const Button = ({ className, children, width, onClick }) => {
  return (
    <button
      style={width ? { width: width } : { width: '100%' }}
      className={`button ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
