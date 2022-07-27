import { useState } from 'react';
import { motion } from 'framer-motion';
import Signin from '../Signin';
import Register from '../Register';

const AuthCard = () => {
  const [activeTap, setActiveTap] = useState('signin');
  return (
    <div className='auth-card-container'>
      <div className='auth-nav'>
        <div
          className={`sign-in nav-elem ${
            activeTap === 'signin' ? 'selected' : ''
          }`}
          onClick={() => setActiveTap('signin')}
        >
          Sign in
        </div>
        <div
          className={`regiser nav-elem ${
            activeTap === 'register' ? 'selected' : ''
          }`}
          onClick={() => setActiveTap('register')}
        >
          Register
        </div>
        <motion.div
          layout
          className='selected-elem'
          style={activeTap === 'register' ? { left: 'unset', right: 0 } : {}}
        ></motion.div>
      </div>
      {activeTap === 'register' ? <Register /> : <Signin />}
    </div>
  );
};

export default AuthCard;
