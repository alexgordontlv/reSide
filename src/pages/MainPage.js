import React from 'react'
import SideBar from '../sidebar/Sidebar';
import Display from '../display/Display';
import './mainpage.css';
const MainPage = () => {
    return (
        <div className='mainbody'>
        <div className='sidebar_component'>
          <SideBar/>
        </div>
        <div className='body'>
          <Display/>
        </div>
        </div>
    )
}

export default MainPage;
