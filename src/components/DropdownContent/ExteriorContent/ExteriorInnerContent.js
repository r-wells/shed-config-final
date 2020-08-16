import React from "react";
import Container from "../../Container/Container";
import ExteriorSelectionComponent from "./ExteriorSelectionComponent";
import "./ExteriorContent.css";
import Button from "./../../Button/Button";

const ExteriorInnerContent = ({
  displayedSide,
  clickEvent,
  data,
  type,
  updateConfiguration,
  size,
  setDisplayedDataForSide,
}) => {
  return (
    <Container>
      <Container classes="SelectionComponentContainer">
        {data.map((option) => {
          return (
            <ExteriorSelectionComponent
              key={option.image}
              value={400}
              clickEvent={clickEvent}
              label={option.image}
              type={type}
              multiple={false}
              updateConfiguration={updateConfiguration}
              size={size}
            />
          );
        })}
      </Container>
      <Container classes="ExteriorInnerContentPaginationContainer">
        <Button
          onClick={() => setDisplayedDataForSide("prev")}
          value="prev"
          classes="ExteriorInnerContentPaginationButton"
          buttonText={"<"}
        />
        <Button
          onClick={() => setDisplayedDataForSide("next")}
          value="next"
          classes="ExteriorInnerContentPaginationButton"
          buttonText={">"}
        />
      </Container>
    </Container>
  );
};

export default ExteriorInnerContent;
