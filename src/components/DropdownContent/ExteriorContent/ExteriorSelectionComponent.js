import React from "react";
import Image from "../../../images/selection-component-square.png";
import "../InnerComponents//SelectionComponentContainer.css";
// import images from "../../../assets/eight";

const ExteriorSelectionComponent = ({
  type,
  label,
  price,
  clickEvent,
  value,
  multiple,
  perSquareFoot,
  updateSizing,
  updateConfiguration,
  size,
}) => {
  const setSizing = (size) => {
    updateSizing(size);
  };

  const setConfiguration = (label) => {
    updateConfiguration(label);
  };

  const Image = `assets/${size}${label}.png`;

  var label = label.slice(1);


  return (
    <div className="SelectionComponent">
      <img
        src={Image}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "assets/missing_model.png";
        }}
      />
      <label className="SelectionComponentLabel">{label}</label>

      <input
 key={Image}
        type="radio"
        name={type}
        value={value}
        onClick={() => {
          clickEvent(type, 400);
          setConfiguration(label);
        }}
      />
      {/* <p className="SelectionComponentPrice">${price}</p> */}
    </div>
  );
};

export default ExteriorSelectionComponent;
