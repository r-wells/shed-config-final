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

  const setDisplayedDataForSide = (toggle) => {
    if (toggle === "prev") {
      if (prevIndex === 0) {
        return;
      }
      setPrevIndex(prevIndex - postsPerPage);
    } else {
      if (prevIndex + postsPerPage >= sizeData[displayedSide].length) {
        return;
      }
      setPrevIndex(prevIndex + postsPerPage);
    }
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
              key={side}
            />
          );
        })}
      </Container>
      <Container classes="ExteriorInnerContentContainer">
        <ExteriorInnerContent
          data={sizeData[displayedSide].slice(
            prevIndex,
            prevIndex + postsPerPage
          )}
          displayedSide={displayedSide}
          type={type}
          size={size}
          setDisplayedDataForSide={setDisplayedDataForSide}
          clickEvent={clickEvent}
          updateConfiguration={updateConfiguration}
        />
      </Container>
    </Container>
  );
};

export default ExteriorContent;
