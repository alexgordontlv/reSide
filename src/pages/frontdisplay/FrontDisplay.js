import React from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { Button } from '@material-ui/core';
import dataLogo from '../../datalogo2.svg';
import './frontdisplay.css';
import { useHistory } from 'react-router-dom';
import { useStyles } from '../../utilities/global.styles';

const FrontDisplay = () => {
  const history = useHistory();
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
          <ul />
          <li>Manage your properties on the map.</li>
          <li>Full back-up for your data.</li>
          <li>Add events to your Google-Calendar with few simple clicks.</li>
          <ul />
          To explore the demo, register, or use our Demo Sign-In: <br />
          <br />
        </span>
        <div className={`menu-item`} onClick={handleClick}>
          <div>
            <Button variant="outlined" className={classes.button}>
              DEMO SIGN IN
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(FrontDisplay);
