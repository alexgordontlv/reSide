import React, { useState } from 'react';
import '../signin&signout/Signin.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { contactFormFireBase } from '../../firebase/firebase';
import Button from '@material-ui/core/Button';

const Contact = () => {
  const useStyles2 = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '20ch'
      }
    },
    Input: {
      width: '42ch',
      lineHeight: 50
    },
    button: {
      width: '30ch',
      color: 'primary'
    }
  }));

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(email, name, message);
      await contactFormFireBase(name, email, message);
      alert('message sent');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === 'userEmail') {
      setEmail(value);
    } else if (name === 'name') {
      setName(value);
    } else {
      setMessage(value);
    }
  };

  const classes = useStyles2();
  return (
    <div className="contact" style={{ marginTop: '60px' }}>
      <h3>Contact</h3>
      <span></span>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={() => handleSubmit}
      >
        <TextField
          id="standard-basic"
          label="Name"
          name="name"
          value={name}
          type="text"
          onChange={(event) => onChangeHandler(event)}
        />
        <TextField
          id="standard-basic"
          label="Email"
          name="userEmail"
          onChange={(event) => onChangeHandler(event)}
          value={email}
          required
        />
        <TextField
          id="standard-multiline-flexible"
          className={classes.Input}
          label="Message"
          placeholder="Enter Message"
          variant="outlined"
          multiline
          rowsMax={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          type="text"
        />
      </form>
      <div className="center">
        <Button
          className={classes.button}
          variant="outlined"
          onClick={(event) => handleSubmit(event)}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Contact;
