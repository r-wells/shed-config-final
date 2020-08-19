import React, { useState, setState } from "react";
import SelectionComponent from "./SelectionComponent";
import "./SelectionComponentContainer.css";
import Container from "./../../Container/Container";
import SizeContent from "../SizeContent/SizeContent";
import { getInitialData } from "../../../utils/api";
import InteriorContent from "../InteriorContent/InteriorContent";
import ExteriorContent from "../ExteriorContent/ExteriorContent";

const SelectionComponentContainer = ({
  type,
  setPriceEvent,
  setSquareFootageEvent,
  interiorClickEvent,
  updateSizing,
  updateConfiguration,
  size,
  setSelectedColor,
  exteriorOptions,
}) => {
  const [multiple, setMultiple] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [totalSquareFootage, setTotalSquareFootage] = React.useState(8 * 8);
  const [color, setColor] = React.useState("#c8e4c5");
  const data = getInitialData(type);

  const setSquareFootageHandler = (option) => {
    setTotalSquareFootage(option.length * option.width);
    setTotal(option.price);
    setSquareFootageEvent(option.length * option.width);
  };

  const setValueHandler = (e, perSquareFoot, color) => {
    if (color !== null) {
      setColor(color);
      setSelectedColor(color);
    }
    const price = Number(e.target.value);
    if (perSquareFoot) {
      setTotal(price * totalSquareFootage);
    } else {
      setTotal(Number(e.target.value));
    }
    setPriceEvent(type, 20);
  };
  function getContent(type) {
    if (type === "Sizing") {
      return (
        <SizeContent
          data={data}
          multiple={false}
          type={type}
          setPriceEvent={setPriceEvent}
          clickEvent={setSquareFootageEvent}
          updateSizing={updateSizing}
          size={size}
        />
      );
    } else if (type === "Interior") {
      return <InteriorContent clickEvent={interiorClickEvent} />;
    } else if (type === "Exterior") {
      return (
        <ExteriorContent
          clickEvent={setPriceEvent}
          type={type}
          size={size}
          data={data}
          updateConfiguration={updateConfiguration}
          exteriorOptions={exteriorOptions}
        />
      );
    } else {
      return (
        <Container classes="SelectionComponentContainer">
          {data.map((option) => {
            return (
              <SelectionComponent
                key={option.id}
                value={
                  option.price
                    ? Number(option.price)
                    : Number(option.price_per_sf)
                }
                clickEvent={setValueHandler}
                label={option.name}
                price={option.price ? option.price : option.price_per_sf}
                type={type}
                multiple={multiple}
                perSquareFoot={option.price_per_sf !== undefined}
                color={type === "Colors" ? option.hexcode : null}
              />
            );
          })}
        </Container>
      );
    }
  }

  return getContent(type);
};

export default SelectionComponentContainer;
