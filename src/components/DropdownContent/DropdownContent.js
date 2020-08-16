import React from "react";
import "./DropdownContent.css";

const DropdownContent = ({ display, children }) => {
  const classes = display ? "dropdownContainerShow" : "dropdownContainerHide";

  return <div className={classes}>{children}</div>;
};

export default DropdownContent;
