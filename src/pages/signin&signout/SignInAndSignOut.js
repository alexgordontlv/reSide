import React from 'react'
import './singinandsignout.css';
import SignIn from '../SignIn';


const SignInAndSignOut = () => {
    return (
        <div className='singinandsignout'>
            <SignIn/>
            <SignIn/>
        </div>
    )
}

export default SignInAndSignOut;
