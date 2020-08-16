import React from "react";
import "./SelectionComponent.css";
import Image from "../../../images/selection-component-square.png";

const SelectionComponent = ({
  type,
  label,
  price,
  clickEvent,
  value,
  multiple,
  perSquareFoot,
  updateSizing,
  size,
  color,
}) => {
  const setSizing = (size, value) => {
    updateSizing(size, value);
  };

  const colorDivStyles = {
    width: "65px",
    height: "65px",
    border: "1px solid black",
    backgroundColor: color,
    margin: "0 auto",
  };

  const priceValue = "$" + price;

  return (
    <div className="SelectionComponent">
      {type === "Colors" ? <div style={colorDivStyles} /> : <img src={Image} />}
      <label className="SelectionComponentLabel">{label}</label>
      {multiple ? (
        <input
          type="checkbox"
          name={type}
          value={value}
          onClick={(e) => clickEvent(e, perSquareFoot)}
        />
      ) : (
        <input
          type="radio"
          name={type}
          value={value}
          onClick={
            type === "Sizing"
              ? () => setSizing(size, value)
              : (e) => clickEvent(e, perSquareFoot, color)
          }
        />
      )}
      <p className="SelectionComponentPrice">
        {type !== "Colors" && priceValue}
      </p>
    </div>
  );
};

export default SelectionComponent;
