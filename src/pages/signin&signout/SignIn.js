import React, { useState } from "react";
import "./Signin.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { auth, signInWithGoogle } from "../../firebase/firebase";
import Button from "@material-ui/core/Button";

const useStyles2 = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const SignIn = ({ useStyles }) => {
  const classes2 = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setPassword("");
      setEmail("");
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        alert("wrong username or password");
      }
      console.log(err);
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  const classes = useStyles2();
  return (
    <div className="sign-in">
      <h3>Sign In</h3>
      <span>sign in with email and password</span>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="Email"
          name="userEmail"
          onChange={(event) => onChangeHandler(event)}
          value={email}
          required
        />
        <TextField
          id="standard-basic"
          label="Password"
          name="userPassword"
          value={password}
          type="password"
          required
          onChange={(event) => onChangeHandler(event)}
        />
      </form>
      <div className="center">
        <Button
          className={classes2.buttonSignIn}
          variant="outlined"
          onClick={(event) => handleSubmit(event)}
        >
          Sign In
        </Button>
        <Button
          className="button"
          variant="outlined"
          color="primary"
          style={{ marginLeft: "10px" }}
          onClick={signInWithGoogle}
        >
          Sign In with google
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
