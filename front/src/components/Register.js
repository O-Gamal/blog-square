import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from './utils/Input';
import Button from './utils/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import {
  regUser,
  reset,
  getUser,
  getUserError,
  getUserStatus,
} from '../state/authSlice';
import appleLogo from '../assets/icons/apple.svg';
import facebookLogo from '../assets/icons/facebook.svg';
import googleLogo from '../assets/icons/google.svg';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(getUser);
  const userStatus = useSelector(getUserStatus);
  const userError = useSelector(getUserError);

  useEffect(() => {
    if (userStatus === 'failed') toast.error(userError);
    if (userStatus === 'succeeded' || user) {
      navigate('/');
    }
    dispatch(reset());
  }, []);
  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('passwords do not match!');
    } else {
      const userData = { name, email, password };
      dispatch(regUser(userData));
    }
  };

  if (userStatus === 'loading')
    return <ThreeDots color='rgb(32, 32, 32)' wrapperClass='spinner' />;

  return (
    <>
      <label className='h5' htmlFor='email'>
        Enter Your Info Bellow:
      </label>
      <div className='input-fields'>
        <Input
          id='name'
          placeholder='Enter your name'
          className='name-input'
          value={name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input
          id='email'
          placeholder='Enter your email address'
          className='email-input'
          value={email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          id='password'
          placeholder='Enter your password'
          className='password-input'
          type='password'
          value={password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <Input
          id='password2'
          placeholder='Enter your password agin'
          className='password-input'
          type='password'
          value={password2}
          onChange={(e) =>
            setFormData({ ...formData, password2: e.target.value })
          }
        />
      </div>
      <div className='signin-btns'>
        <Button className='primary' onClick={handleRegister}>
          Register
        </Button>
        <hr />
        <Button className='secondary'>
          <img className='icon' src={googleLogo} /> Register with Google
        </Button>
        <Button className='secondary'>
          <img className='icon' src={appleLogo} />
          Register with Apple
        </Button>
        <Button className='secondary'>
          <img className='icon' src={facebookLogo} />
          Register with Facebook
        </Button>
      </div>
    </>
  );
};

export default Register;
