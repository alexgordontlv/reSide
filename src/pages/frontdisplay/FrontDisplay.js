import React from 'react'
import './display.style.scss';
import { withRouter } from 'react-router-dom';
const FrontDisplay = ({history}) => {
    return (
        <div className='span'>
        <span>Welcome to Reside! A free and new platform to help you manage your customers and properties.<br/>
        Add events to your Google-Calendar with few simple clicks.<br/>
         To explore the demo, register, or use our test user: <br/>
         User: <strong>bradpitt@gmail.com</strong><br/>
         Password: <strong>123456</strong>
         </span>
        <div className={`menu-item`} onClick={()=>{ history.push("/signin");}}> 
       
        <div className='background-image' 
        style={{
        backgroundImage: `url(https://c0.wallpaperflare.com/preview/310/721/178/wallpaper-tel-aviv-rush-hour-light-trails.jpg)`
        }}
        
        />
     
        <div className='content'>
            <h1 className='title'>SIGN IN TO START</h1>
        </div>
    </div>
    </div>
    )
}

export default withRouter(FrontDisplay)
