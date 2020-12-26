import React from 'react'
import './display.style.scss';
import { withRouter } from 'react-router-dom';
const FrontDisplay = ({history}) => {
    return (
        <div className='span'>
        <span>Welcome to Reside! A free and new platform to help you manage your customers and properties.<br/>Feel free to explore the demo version. To actually add customers/properties you need to sign in or register. </span>
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
