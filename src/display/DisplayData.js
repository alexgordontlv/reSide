import React from 'react'
import './display.style.scss';
import { withRouter } from 'react-router-dom';
const DisplayData = ({history}) => {
    return (
        <div className='span'>
        <span>Welcome to Reside! a free platform for managing your customers and properties!
        The most convenient user experience in the real estate world, easy and reliable interface.</span>
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

export default withRouter(DisplayData)
