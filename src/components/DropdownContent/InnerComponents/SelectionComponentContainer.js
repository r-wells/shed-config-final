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
  if (type === undefined) {
    return null;
  }
  const data = getInitialData(type);

  const setPriceForSiding = (price, priceToZero) => {
    if (priceToZero) {
      setTotal(0);
      setPriceEvent(type, 0);
    } else {
      setTotal(price);
      setPriceEvent(type, price);
    }
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
    } else if (type === "Siding") {
      let sizeData;
      data.forEach((d) => {
        if (d.id === size) {
          sizeData = d;
          sizeData.price = Number(d.price);
        }
      });
      return (
        <Container
          classes="SelectionComponentContainer"
          style={{ width: "100%" }}
        >
          <SelectionComponent
            key={sizeData.id}
            value={sizeData.price}
            clickEvent={setPriceForSiding}
            label={sizeData.name}
            price={sizeData.price}
            type={type}
          />
        </Container>
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
