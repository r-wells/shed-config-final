import React from "react";
import Container from "./../../Container/Container";
import SelectionComponent from "./SelectionComponent";

const Interior = () => {
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

export default Interior;
