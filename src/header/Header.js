import React from 'react'
import { Link } from 'react-router-dom';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import {IconButton} from '@material-ui/core';
import {auth} from '../firebase/firebase';
import './header.css';
import Avatar from '@material-ui/core/Avatar';
import {connect} from 'react-redux';


const Header = ({currentUser}) => {
  const avatarSource = 'https://img.favpng.com/1/15/9/scalable-vector-graphics-computer-icons-user-profile-portable-network-graphics-png-favpng-n05BjRqcBz9Ub9NtAbz8GXEaN.jpg'
    return (
        <div className='header'>
          <div className='left_side'>
          
          <Link className='logo-container' to={currentUser ? '/customers' : '/'}>
              <IconButton>
                  <HomeWorkIcon className='logo'/>
              </IconButton>
          </Link>

          </div>
        {
          
            currentUser ?
            <div>
            <Avatar  rel="noreferrer"
            className='avatar' src={`${currentUser.photoURL ? currentUser.photoURL : avatarSource}`} />
            </div>
            : 
            <div>
            <Avatar  rel="noreferrer"
            className='avatar' src={avatarSource} />
            </div>
        }{
          currentUser ? <div className='name'>{`WELCOME ${
            currentUser.displayName ? currentUser.displayName.toUpperCase(): null
          }!`}
          </div> : <div className='name'>WELCOME GUEST!</div>
          
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
            <Link className='option' to='/'>
            <div className='option' onClick={()=>auth.signOut()}>
            <h3><p>SIGN OUT</p></h3>
            </div>
            </Link>
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
