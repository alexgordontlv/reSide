import React from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { IconButton, Button, makeStyles } from '@material-ui/core';
import dataLogo from '../../datalogo2.svg';
import './frontdisplay.css';
import { useHistory } from 'react-router-dom';

const FrontDisplay = () => {
  const history = useHistory();

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

  function handleClick() {
    auth.signInWithEmailAndPassword('bradpitt@gmail.com', '123456');
    history.push('/customers');
  }

  return (
    <div className="frontdisplay">
      <img src={dataLogo} className="logo" alt="Logo" />
      <div className="span">
        <span>
          Welcome to Reside! A free and new platform to help you manage your
          customers and properties.
          <br />
          - Manage your properties on the map.
          <br />
          <br />
          - Add events to your Google-Calendar with few simple clicks.
          <br />
          <br />
          - Add events to your Google-Calendar with few simple clicks.
          <br />
          To explore the demo, register, or use our Demo Sign-In: <br />
        </span>
        <div className={`menu-item`} onClick={handleClick}>
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
