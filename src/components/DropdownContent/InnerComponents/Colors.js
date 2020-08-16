import React from "react";
import SelectionComponent from "./SelectionComponent";
import Container from "./../../Container/Container";

const Colors = () => {
  return (
    <Container
      style={{
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "space-between",
        marginLeft: "10px",
        marginRight: "10px",
      }}
    >
      <SelectionComponent label="Label" price="$1,000" />
      <SelectionComponent label="Label" price="$1,000" />
      <SelectionComponent label="Label" price="$1,000" />
      <SelectionComponent label="Label" price="$1,000" />
      <SelectionComponent label="Label" price="$1,000" />
      <SelectionComponent label="Label" price="$1,000" />
    </Container>
  );
};

export default Colors;
