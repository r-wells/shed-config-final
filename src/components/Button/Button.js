import React from "react";
import "./Button.css";

const Button = ({ buttonText, onClick, classes, value, href }) => {
  return (
    <a
      onClick={onClick ? () => onClick() : null}
      value={value}
      href={href}
      className={classes}
    >
      {buttonText}
    </a>
  );
};

export default Button;
