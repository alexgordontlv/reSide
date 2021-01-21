import React from "react";
import "./singinandsignout.css";
import SignIn from "./SignIn";
import Register from "./Register";
import { makeStyles } from "@material-ui/core";

const SignInAndSignOut = () => {
  const useStyles = makeStyles(() => ({
    buttonSignOut: {
      borderColor: "#028c6a",
      fontFamily: "sans-serif",

      color: "white",
      backgroundColor: "#028c6a",
      "&:hover": {
        color: "#028c6a",
        backgroundColor: "#FFF",
      },
    },
    buttonSignIn: {
      fontFamily: "sans-serif",

      borderColor: "#028c6a",
      color: "#028c6a",
    },
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
