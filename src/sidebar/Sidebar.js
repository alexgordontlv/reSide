import React from 'react'
import SideBarOption from './SideBarOption';
import './Sidebar.css';
import HomeIcon from "@material-ui/icons/Home";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import EventIcon from '@material-ui/icons/Event';
import Search from './Search';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
    return (
        <div className='sidebar'>
            <div className='search_box'>
                <Search onChange={(value)=>props.onChange(value)}/>
            </div>
            <div className=''>
            <Link to={'/customers'}>
                <SideBarOption Icon={SupervisorAccountIcon} text="Customers"/>
            </Link>
            <Link to={'/properties'}>
                <SideBarOption Icon={HomeIcon} text="Properties" />
            </Link>
            <Link to='/calendar'>
                <SideBarOption Icon={EventIcon} text="Calendar" />
            </Link>
            </div>
        </div>
    )
}

export default Sidebar;
