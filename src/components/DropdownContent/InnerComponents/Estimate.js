import React from "react";

const Estimate = ({ estimateValue, typesValues }) => {
  console.log("typesValues", typesValues);
  return (
    <div>
      Your Estimate is:{" "}
      <span style={{ fontWeight: "bold" }}>${estimateValue}</span>
    </div>
  );
};

export default Estimate;
