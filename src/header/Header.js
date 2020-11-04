import React from 'react'
import { Link } from 'react-router-dom';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import {IconButton} from '@material-ui/core';
import './header.css'
const Header = () => {
    return (
        <div className='header'>
          <div className='left_side'>
          <Link className='logo-container' to='/'>
              <IconButton>
                  <HomeWorkIcon className='logo'/>
              </IconButton>
          </Link>
          </div>
          <div className='name'>
          <h3><a>WELCOME ALEX!</a></h3>
      </div>
        <div className='options'>
        {/*
          currentUser ? <div className='name'>{`WELCOME ${
            currentUser.displayName ? currentUser.displayName.toUpperCase(): null
          }!`}
          </div> : null
          */
        }
          <Link className='option' to=''>
          <h3><a>ABOUT</a></h3>
          </Link>
          <Link className='option' to=''>
          <h3><a> CONTACT</a></h3>
          </Link>
        

            <Link className='option' to=''>
            <h3><a>SIGN IN</a></h3>
            </Link>
        </div>
      </div>
    )
}

export default Header;
