import React, { useState } from "react";
import SelectionComponent from "../InnerComponents/SelectionComponent";
import "../InnerComponents/SelectionComponentContainer.css";
import Container from "./../../Container/Container";
import { FLOORING_PSF } from "./../../../utils/_DATA";

const SizeContent = ({
  data,
  type,
  clickEvent,
  multiple,
  setPriceEvent,
  updateSizing,
  size,
}) => {
  console.log("sizecontent data", data);
  let scValue;
  const calculateValue = (option) => {
    if (type === "Sizing") {
      return option.totalSquareFootage * Number(option.price_per_sf);
    } else {
      return option.price ? Number(option.price) : Number(option.price_per_sf);
    }
  };

  return (
    <Container classes="SelectionComponentContainer">
      {data.map((option) => {
        return (
          <SelectionComponent
            key={option.id}
            value={calculateValue(option)}
            clickEvent={() =>
              clickEvent(option.totalSquareFootage, FLOORING_PSF)
            }
            label={option.name}
            price={option.price_per_sf * option.totalSquareFootage}
            type={type}
            multiple={multiple}
            updateSizing={updateSizing}
            size={option.id}
          />
        );
      })}
    </Container>
  );
};

export default SizeContent;
