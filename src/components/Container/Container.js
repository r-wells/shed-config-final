import React from "react";
import "./Container.css";

const Container = ({ children, style, classes, id }) => {
  return (
    <div id={id} style={style} className={classes}>
      {children}
    </div>
  );
};

export default Container;
