import React from 'react';
import { Link } from 'react-router-dom';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import { IconButton, Button, makeStyles } from '@material-ui/core';
import { auth } from '../firebase/firebase';
import './header.css';
import Avatar from '@material-ui/core/Avatar';
import { useSelector } from 'react-redux';

const Header = () => {
  const useStyles = makeStyles(() => ({
    iconButton: {
      padding: 0,
      '&:hover': {
        backgroundColor: '#FFF',
        color: '#089048'
      }
    },
    buttonSignOut: {
      marginTop: 0,
      borderColor: '#028c6a',
      color: 'white',
      backgroundColor: '#028c6a',
      '&:hover': {
        color: '#028c6a',
        background: 'none',
        backgroundColor: '#FFF'
      }
    },
    buttonSignIn: {
      borderColor: '#028c6a',
      color: '#028c6a'
    }
  }));
  const classes = useStyles();
  const currentUser = useSelector((state) => state.user.currentUser);
  const avatarSource =
    'https://img.favpng.com/1/15/9/scalable-vector-graphics-computer-icons-user-profile-portable-network-graphics-png-favpng-n05BjRqcBz9Ub9NtAbz8GXEaN.jpg';
  return (
    <div className="header">
      <div className="header__container">
        <div className="options">
          <Link to={currentUser ? '/customers' : '/'}>
            <IconButton className={classes.iconButton}>
              <HomeWorkIcon className="logo" />
              <p>Reside</p>
            </IconButton>
          </Link>

          <Link className="option" to="/about">
            <p>ABOUT</p>
          </Link>
          <Link className="option" to="/contact">
            <p> CONTACT</p>
          </Link>
          {currentUser ? (
            <Link className="option" to="/">
              <div className="option" onClick={() => auth.signOut()}>
                <p variant="outlined">SIGN OUT</p>
              </div>
            </Link>
          ) : (
            <Link className="option" to="/signin">
              <p variant="outlined">SIGN IN</p>
            </Link>
          )}
        </div>
        {currentUser ? (
          <div className="header__avatar">
            <Avatar
              rel="noreferrer"
              className="avatar"
              src={`${
                currentUser.photoURL ? currentUser.photoURL : avatarSource
              }`}
            />

            {`WELCOME ${
              currentUser.displayName
                ? currentUser.displayName.split(' ')[0].toUpperCase()
                : null
            }!`}
          </div>
        ) : (
          <div>
            <Avatar rel="noreferrer" className="avatar" src={avatarSource} />
            WELCOME GUEST!
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
