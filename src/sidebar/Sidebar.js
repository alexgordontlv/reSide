import React from 'react';
import SideBarOption from './SideBarOption';
import './Sidebar.css';
import HomeIcon from '@material-ui/icons/Home';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import EventIcon from '@material-ui/icons/Event';
import Search from './Search';
import { Link } from 'react-router-dom';
import FormDialog from '../components/formdialog/FormDialog';
const Sidebar = (props) => {
  return (
    <div className="sidebar">
      <div className="search_box">
        <Search onChange={(value) => props.onChange(value)} />
      </div>
      <div className="sidebar_options">
        <Link to={'/customers'}>
          <SideBarOption Icon={SupervisorAccountIcon} text="Customers" />
        </Link>
        <Link to={'/properties'}>
          <SideBarOption Icon={HomeIcon} text="Properties" />
        </Link>
        <Link to="/calendar">
          <SideBarOption Icon={EventIcon} text="Calendar" />
        </Link>
      </div>
      <FormDialog dataToShow={'customers'} rowData={null} />
    </div>
  );
};

export default Sidebar;
