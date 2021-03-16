import React from 'react';
import { Link } from 'react-router-dom';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import { IconButton, Button, makeStyles } from '@material-ui/core';
import { auth } from '../../firebase/firebase';
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
    homeIcon: {
      borderColor: '#028c6a',
      color: '#22c58b'
    },
    headline: {
      color: 'black'
    }
  }));
  const classes = useStyles();
  const currentUser = useSelector((state) => state.user.currentUser);
  const avatarSource =
    'https://img.favpng.com/1/15/9/scalable-vector-graphics-computer-icons-user-profile-portable-network-graphics-png-favpng-n05BjRqcBz9Ub9NtAbz8GXEaN.jpg';
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link to={currentUser ? '/customers' : '/'}>
            <IconButton className={classes.iconButton}>
              <HomeWorkIcon className={classes.homeIcon} />
              <p className={classes.headline}>Reside</p>
            </IconButton>
          </Link>
        </div>
        <div className="options">
          <Link to="/about">
            <p className="option">ABOUT</p>
          </Link>
          <Link to="/contact">
            <p className="option"> CONTACT</p>
          </Link>
          {currentUser ? (
            <Link to="/">
              <div onClick={() => auth.signOut()}>
                <p className="option">SIGN OUT</p>
              </div>
            </Link>
          ) : (
            <Link to="/signin">
              <p className="option">SIGN IN</p>
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
          <div className="header__avatar">
            <Avatar rel="noreferrer" className="avatar" src={avatarSource} />
            WELCOME GUEST!
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
