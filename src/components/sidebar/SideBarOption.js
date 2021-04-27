import React from 'react';
import './SideBarOption.css';
import { useSelector } from 'react-redux';

const SideBarOption = ({ text, Icon }) => {
  const propertiesCount = useSelector((state) => state.user.propertyCount);
  const customersCount = useSelector((state) => state.user.customerCount);
  console.log(propertiesCount, customersCount);
  return (
    <div className="sidebarOption">
      <Icon fontSize="small" />
      <div className="sidebarOption__option">
        <div>{text}</div>
        {text === 'Customers' && <p>{customersCount}</p>}
        {text === 'Properties' && <p>{propertiesCount}</p>}
      </div>
    </div>
  );
};

export default SideBarOption;
