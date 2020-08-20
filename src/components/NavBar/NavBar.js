import React from "react";
import "./NavBar.css";
import Logo from "../../assets/logo.png";

const NavBar = () => {
  return (
    <div className="NavBar">
      <a href="https://www.mod-shed.com/" className="NavItem">
        <img className="Logo" src={Logo} />
      </a>
      {/* <a className="NavItem">Head To Main Site</a> */}
    </div>
  );
};

export default NavBar;
