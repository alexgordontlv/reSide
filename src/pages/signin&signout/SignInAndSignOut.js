import React from 'react';
import './singinandsignout.css';
import SignIn from './SignIn';
import Register from './Register';
import { makeStyles } from '@material-ui/core';

const SignInAndSignOut = () => {
  const useStyles = makeStyles(() => ({
    buttonSignOut: {
      borderColor: '#22c58b',
      fontFamily: 'sans-serif',

      color: 'white',
      backgroundColor: '#22c58b',
      '&:hover': {
        color: '#22c58b',
        backgroundColor: '#FFF'
      }
    },
    buttonSignIn: {
      fontFamily: 'sans-serif',

      borderColor: '#22c58b',
      color: '#22c58b'
    }
  }));
  return (
    <div className="singinandsignout">
      <SignIn useStyles={useStyles} />
      <div className="verticalLine" />
      <Register useStyles={useStyles} />
    </div>
  );
};

export default SignInAndSignOut;
