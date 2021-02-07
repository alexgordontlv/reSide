import React from 'react';
import './SideBarOption.css';
import { useSelector } from 'react-redux';

const SideBarOption = ({ text, Icon }) => {
  const properties = useSelector((state) => state.user.currentUser.properties);
  const customers = useSelector((state) => state.user.currentUser.customers);
  console.log(customers);
  return (
    <div className="sidebarOption">
      <Icon fontSize="small" />
      <div className="sidebarOption__option">
        <div>{text}</div>
        {text === 'Customers' && <p>{customers?.length}</p>}
        {text === 'Properties' && <p>{properties?.length}</p>}
      </div>
    </div>
  );
};

export default SideBarOption;
