import React from 'react'
import { Link } from 'react-router-dom';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import {IconButton} from '@material-ui/core';
import {auth} from '../firebase/firebase';
import './header.css';
import Avatar from '@material-ui/core/Avatar';
import {connect} from 'react-redux';


const Header = ({currentUser}) => {
    return (
        <div className='header'>
          <div className='left_side'>
          <Link className='logo-container' to='/'>
              <IconButton>
                  <HomeWorkIcon className='logo'/>
              </IconButton>
          </Link>

          </div>
        {
          
            currentUser ?
            <div>
            <Avatar  rel="noreferrer"
            className='avatar' src={`${currentUser.photoURL ? currentUser.photoURL : ''}`} />
            </div>
            : 
            null
        }{
          currentUser ? <div className='name'>{`WELCOME ${
            currentUser.displayName ? currentUser.displayName.toUpperCase(): null
          }!`}
          </div> : null
          
        }
        <div className='options'>

          <Link className='option' to='/about'>
          <h3><p>ABOUT</p></h3>
          </Link>
          <Link className='option' to='/contact'>
          <h3><p> CONTACT</p></h3>
          </Link>
          {
            currentUser ?
            <div className='option' onClick={()=>auth.signOut()}>
            <h3><p>SIGN OUT</p></h3>
            </div>
            :
            <Link className='option' to='/signin'>
            <h3><p>SIGN IN</p></h3>
            </Link>
          }

        </div>
      </div>
    )
}


const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Header);
