import { useNavigate } from 'react-router-dom';

const Logo = ({ size }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{ fontSize: size }}
      className={`logo h1`}
      onClick={() => navigate('/')}
    >
      BlogSquare
    </div>
  );
};

export default Logo;
