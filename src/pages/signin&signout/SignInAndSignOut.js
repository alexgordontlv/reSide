import React from 'react'
import './singinandsignout.css';
import SignIn from './SignIn';
import Register from './Register'

const SignInAndSignOut = () => {
    return (
        <div className='singinandsignout'>
            <SignIn/>
            <div className='verticalLine'/>
            <Register/>
        </div>
    )
}

export default SignInAndSignOut;
