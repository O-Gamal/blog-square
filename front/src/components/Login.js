import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from './utils/Input';
import Button from './utils/Button';
import { Link, useNavigate } from 'react-router-dom';
import appleLogo from '../assets/icons/apple.svg';
import facebookLogo from '../assets/icons/facebook.svg';
import googleLogo from '../assets/icons/google.svg';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import {
  loginUser,
  reset,
  getUser,
  getUserError,
  getUserStatus,
  getUserProfile,
} from '../state/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(getUser);
  const userStatus = useSelector(getUserStatus);
  const userError = useSelector(getUserError);

  useEffect(() => {
    if (userStatus === 'failed') toast.error(userError);
    if (userStatus === 'succeeded' || user) {
      navigate('/');
    }
    dispatch(reset());
  }, [userStatus, dispatch, user]);

  const handleLogin = (e) => {
    e.preventDefault();

    const userData = { email, password };
    dispatch(loginUser(userData));
  };

  if (userStatus === 'loading')
    return <ThreeDots color='rgb(32, 32, 32)' wrapperClass='spinner' />;

  return (
    <>
      <label className='h5' htmlFor='email'>
        Enter Your Email Address and Password:
      </label>
      <div className='input-fields'>
        <Input
          id='email'
          placeholder='Enter your email address'
          className='email-input'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          id='password'
          placeholder='Password'
          className='password-input'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Link className='link' to='/'>
        <u>Forgot your password?</u>
      </Link>
      <div className='signin-btns'>
        <Button className='primary' onClick={handleLogin}>
          Sign In
        </Button>
        <hr />
        <Button className='secondary'>
          <img className='icon' src={googleLogo} /> Sign In with Google
        </Button>
        <Button className='secondary'>
          <img className='icon' src={appleLogo} />
          Sign In with Apple
        </Button>
        <Button className='secondary'>
          <img className='icon' src={facebookLogo} />
          Sign In with Facebook
        </Button>
      </div>
    </>
  );
};

export default Login;
