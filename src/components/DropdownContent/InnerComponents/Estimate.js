import React from "react";
import "./Estimate.css";

const Estimate = ({
  estimateValue,
  typesValues,
  colorChoice,
  exteriorOptions,
  sizeOptions,
}) => {
  return (
    <table className="table">
      <thead>
        <tr className="tableRow">
          <th>Item</th>
          <th>Charge</th>
        </tr>
      </thead>
      <tbody>
        <tr id="total" className="tableRow nonHeader">
          <td>Sizing:</td>
          <td>
            <span style={{ fontWeight: "bold" }}>${typesValues.Sizing}</span>
          </td>
        </tr>
        <tr id="total" className="tableRow nonHeader">
          <td>Interior:</td>
          <td>
            <span style={{ fontWeight: "bold" }}>${typesValues.Interior}</span>
          </td>
        </tr>
        <tr id="total" className="tableRow nonHeader">
          <td>Exterior:</td>
          <td>
            <span style={{ fontWeight: "bold" }}>${typesValues.Exterior}</span>
          </td>
        </tr>
        <tr id="total" className="tableRow nonHeader">
          <td>Color:</td>
          <td>
            <span style={{ fontWeight: "bold" }}>${typesValues.Colors}</span>
          </td>
        </tr>
        <tr id="total" className="tableRow nonHeader">
          <td>Your Estimate is:</td>
          <td>
            <span style={{ fontWeight: "bold" }}>${estimateValue}</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Estimate;
