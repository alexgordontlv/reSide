import React, { useState } from 'react'
import './Signin.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {auth,createUserProfileDocument} from '../../firebase/firebase';



const useStyles2 = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));



const Register = () => {
    const classes = useStyles2();
    const [displayName,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmpassword,setConfirmPassword] = useState('');



    const handleSubmit = async(event)=> {
      event.preventDefault();
      if (password !== confirmpassword){
        alert("passwords don't match");
        return;
      }else{
        try {
         const {user} = await auth.createUserWithEmailAndPassword(email,password);
         await createUserProfileDocument(user,{displayName})
        }catch(err){
          console.log(err);
        }
        setName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
      }

    }

    return (
        <div className='sign-in'>
        <h3>Register</h3>
        <span>easy register with email and password</span>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField 
        id="standard-basic" 
        label="Name" 
        value={displayName}
        required
        onChange={(event)=>setName(event.target.value)}
        />
        <TextField
         id="standard-basic"
          label="Email"
          type='email'
          required
          value={email}
          onChange={(event)=>setEmail(event.target.value)}
           />
        <TextField 
        id="standard-basic"
         label="Password"
         value={password}
         type='password'
         required
         onChange={(event)=>setPassword(event.target.value)}
          />
          <TextField 
          id="standard-basic"
           label="Confirm Password"
           value={confirmpassword}
           type='password'
           required
           onChange={(event)=>setConfirmPassword(event.target.value)}
            />
        
      </form>
      <div className='center'>
          <Button 
          variant="outlined"
           className='button'
           type='submit'
           onClick={handleSubmit}
           >REGISTER</Button>
      </div>
      </div>
    )
}

export default Register;
