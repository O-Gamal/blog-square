import Input from './Input';
import Button from './Button';
import { Link } from 'react-router-dom';

import appleLogo from '../assets/icons/apple.svg';
import facebookLogo from '../assets/icons/facebook.svg';
import googleLogo from '../assets/icons/google.svg';

const Signin = () => {
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
        />
        <Input placeholder='Password' className='password-input' />
      </div>
      <Link to='/'>
        <u>Forgot your password?</u>
      </Link>
      <div className='signin-btns'>
        <Button className='primary'>Sign In</Button>
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

export default Signin;
