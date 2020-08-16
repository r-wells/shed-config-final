import React, { useState } from "react";
import Container from "../../Container/Container";
import "./ExteriorContent.css";
import Button from "../../Button/Button";
import ExteriorInnerContent from "./ExteriorInnerContent";
import { getPriceOfSize } from "../../../utils/api";

const postsPerPage = 6;

const ExteriorContent = ({
  clickEvent,
  data,
  size,
  type,
  updateConfiguration,
}) => {
  const [displayedSide, setDisplayedSide] = useState("front");
  const [prevIndex, setPrevIndex] = useState(0);
  const sizeData = getPriceOfSize(size)[0].data;

  const sides = ["front", "back", "left", "right"];

  const changeDisplayedSide = (side) => {
    setDisplayedSide(side);
  };

  return (
    <Container>
      <Container classes="ExteriorButtonContainer">
        {sides.map((side) => {
          return (
            <Button
              onClick={() => changeDisplayedSide(side)}
              classes="ExteriorButton"
              buttonText={side}
            />
          );
        })}
      </Container>
      <Container classes="ExteriorInnerContentContainer">
        <ExteriorInnerContent
          data={sizeData[displayedSide]}
          displayedSide={displayedSide}
          type={type}
          size={size}
          clickEvent={clickEvent}
          updateConfiguration={updateConfiguration}
        />
      </Container>
    </Container>
  );
};

export default ExteriorContent;
