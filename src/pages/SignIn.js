import React from 'react'
import './Signin.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CustomButton from './CustomButton';

const useStyles2 = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));



const SignIn = () => {
    const classes = useStyles2();
    return (
        <div className='sign-in'>
        <h3>Sign In</h3>
        <span>sign in with email and password</span>
        <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Email" />
        <TextField id="standard-basic" label="Password" />
      </form>
      <div className='button_section'>
          <CustomButton text='Submit'/>
      </div>
      </div>
    )
}

export default SignIn
