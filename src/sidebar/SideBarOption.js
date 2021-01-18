import React from "react";
import "./SideBarOption.css";

const SideBarOption = ({ text, Icon }) => {
  return (
    <div className="sidebarOption">
      <Icon />
      <h2>{text}</h2>
    </div>
  );
};

export default SideBarOption;
