import React from "react";
import "./Button.css";

const Button = ({ buttonText, onClick, classes, value }) => {
  return (
    <a onClick={() => onClick()} value={value} className={classes}>
      {buttonText}
    </a>
  );
};

export default Button;
