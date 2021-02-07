import React from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { IconButton, Button, makeStyles } from '@material-ui/core';
import dataLogo from '../../datalogo2.svg';
import './frontdisplay.css';

const FrontDisplay = ({ history }) => {
  const useStyles = makeStyles(() => ({
    buttonSignOut: {
      marginTop: '20px',
      fontFamily: 'sans-serif',
      borderColor: '#028c6a',
      color: 'white',
      backgroundColor: '#028c6a',
      alignItems: 'center',
      '&:hover': {
        color: '#028c6a',
        backgroundColor: '#FFF'
      }
    }
  }));
  const classes = useStyles();

  return (
    <div className="frontdisplay">
      <img src={dataLogo} className="logo" alt="Logo" />
      <div className="span">
        <span>
          Welcome to Reside! A free and new platform to help you manage your
          customers and properties.
          <br />
          Add events to your Google-Calendar with few simple clicks.
          <br />
          To explore the demo, register, or use our test user: <br />
          User: <strong>bradpitt@gmail.com</strong>
          <br />
          Password: <strong>123456</strong>
        </span>
        <div
          className={`menu-item`}
          onClick={() => {
            auth.signInWithEmailAndPassword('bradpitt@gmail.com', '123456');
          }}
        >
          <div>
            <Button variant="outlined" className={classes.buttonSignOut}>
              DEMO SIGN IN
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(FrontDisplay);
