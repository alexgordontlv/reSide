import React from 'react'
import './Signin.css';
import FormInput from './FormInput';

const SignIn = () => {
    return (
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form>
            <FormInput
                name='email'
                type='email'

                label='email'
                required
            />
            <FormInput
                name='password'
                type='password'
                label='password'
                required
            />
            <div className='buttons'>

            </div>
        </form>
      </div>
    )
}

export default SignIn
