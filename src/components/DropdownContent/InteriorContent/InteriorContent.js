import React from "react";
import Container from "./../../Container/Container";
import "./InteriorContent.css";

const InteriorContent = ({ clickEvent }) => {
  const listOfFeatures = (
    <ul>
      <li>Electrical Package</li>
      <li>Seamless Interior Wall Cladding (installed units only)</li>
      <li>Door, casing, baseboard, and interior paint</li>
      <li>Flooring</li>
    </ul>
  );

  return (
    <div>
      <Container classes="InteriorContent">
        <input onClick={() => clickEvent(2160)} type="checkbox" />
        <label>Add Lifestyle Interior Package</label>
        <span className={"PriceTag"}>$2160</span>
      </Container>
      {listOfFeatures}
    </div>
  );
};

export default InteriorContent;
