import React from "react";
import { Link } from "react-router-dom";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import { IconButton, Button, makeStyles } from "@material-ui/core";
import { auth } from "../firebase/firebase";
import "./header.css";
import Avatar from "@material-ui/core/Avatar";
import { useSelector } from "react-redux";

const Header = () => {
  const useStyles = makeStyles(() => ({
    buttonSignOut: {
      borderColor: "#028c6a",
      color: "white",
      backgroundColor: "#028c6a",
      "&:hover": {
        color: "#028c6a",
        backgroundColor: "#FFF",
      },
    },
    buttonSignIn: {
      borderColor: "#028c6a",
      color: "#028c6a",
    },
  }));
  const classes = useStyles();
  const currentUser = useSelector((state) => state.user.currentUser);
  const avatarSource =
    "https://img.favpng.com/1/15/9/scalable-vector-graphics-computer-icons-user-profile-portable-network-graphics-png-favpng-n05BjRqcBz9Ub9NtAbz8GXEaN.jpg";
  return (
    <div className="header">
      <div className="left_side">
        <Link className="logo-container" to={currentUser ? "/customers" : "/"}>
          <IconButton>
            <HomeWorkIcon className="logo" />
          </IconButton>
        </Link>
      </div>
      {currentUser ? (
        <div>
          <Avatar
            rel="noreferrer"
            className="avatar"
            src={`${
              currentUser.photoURL ? currentUser.photoURL : avatarSource
            }`}
          />
        </div>
      ) : (
        <div>
          <Avatar rel="noreferrer" className="avatar" src={avatarSource} />
        </div>
      )}
      {currentUser ? (
        <div className="name">
          {`WELCOME ${
            currentUser.displayName
              ? currentUser.displayName.toUpperCase()
              : null
          }!`}
        </div>
      ) : (
        <div className="name">WELCOME GUEST!</div>
      )}
      <div className="options">
        <Link className="option" to="/about">
          <h3>
            <p>ABOUT</p>
          </h3>
        </Link>
        <Link className="option" to="/contact">
          <h3>
            <p> CONTACT</p>
          </h3>
        </Link>
        {currentUser ? (
          <Link className="option" to="/">
            <div className="option" onClick={() => auth.signOut()}>
              <Button variant="outlined" className={classes.buttonSignOut}>
                SIGN OUT
              </Button>
            </div>
          </Link>
        ) : (
          <Link className="option" to="/signin">
            <Button variant="outlined" className={classes.buttonSignIn}>
              SIGN IN
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
