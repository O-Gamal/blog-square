import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Login from './Login';
import Register from './Register';

const Auth = () => {
  const [activeTap, setActiveTap] = useState('signin');

  return (
    <motion.div layout='position' className='auth-card-container'>
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
          transition={{
            ease: 'easeOut',
            type: 'spring',
            duration: 0.5,
          }}
          className='selected-elem'
          style={activeTap === 'register' ? { left: 'unset', right: 0 } : {}}
        ></motion.div>
      </div>
      {/* <AnimatePresence exitBeforeEnter> */}
      <motion.div
        key={activeTap}
        initial={
          activeTap === 'register'
            ? { x: -100, opacity: 0 }
            : { x: 100, opacity: 0 }
        }
        animate={{ x: 0, opacity: 1 }}
        transition={{
          ease: 'easeOut',
          type: 'spring',
          duration: 0.3,
        }}
        exit={
          activeTap === 'register'
            ? { x: -100, opacity: 0 }
            : { x: 100, opacity: 0 }
        }
        className='auth-card-container'
      >
        {activeTap === 'register' ? <Register /> : <Login />}
      </motion.div>
      {/* </AnimatePresence> */}
    </motion.div>
  );
};

export default Auth;
