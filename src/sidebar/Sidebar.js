import React from 'react'
import SideBarOption from './SideBarOption';
import './Sidebar.css';
import HomeIcon from "@material-ui/icons/Home";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import EventIcon from '@material-ui/icons/Event';
import Search from './Search';
const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className='search_box'>
                <Search/>
            </div>
            <div className='sidebar_options'>
                <SideBarOption Icon={SupervisorAccountIcon} text="Customers" />
                <SideBarOption Icon={HomeIcon} text="Properties" />
                <SideBarOption Icon={EventIcon} text="Calendar" />
            </div>
        </div>
    )
}

export default Sidebar;
