import React from 'react';
import './sidebarheader.css';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import { useLocation } from 'react-router-dom';

const SideBarHeader = () => {
  const location = useLocation();
  let route;
  if (location.pathname === '/customers') route = 'Customers';
  if (location.pathname === '/properties') route = 'Properties';
  return (
    <div className="sidebarheader">
      <h1 className="sidebarheader__name">{route}</h1>
    </div>
  );
};

export default SideBarHeader;
