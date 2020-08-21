import React, { useState } from "react";
import "./Estimate.css";
import Container from "./../../Container/Container";
import Button from "./../../Button/Button";
import "./../../Button/Button.css";

const Estimate = ({
  estimateValue,
  typesValues,
  colorChoice,
  exteriorOptions,
  sizeOptions,
  size,
  selectedColorHexCode,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  window.addEventListener("resize", () => {
    window.innerWidth < 600 ? setIsMobile(true) : setIsMobile(false);
  });

  const frontImage = `assets/${size}/${exteriorOptions.F}.png`;
  const backImage = `assets/${size}/${exteriorOptions.B}.png`;
  const leftImage = `assets/${size}/${exteriorOptions.L}.png`;
  const rightImage = `assets/${size}/${exteriorOptions.R}.png`;
  return (
    <table className="table">
      <thead>
        <tr className="tableRow">
          <th>Item</th>
          <th>Price/Selection</th>
        </tr>
      </thead>
      <tbody>
        <tr id="total" className="tableRow nonHeader">
          <td>Sizing:</td>
          <td>
            <span style={{ fontWeight: "bold" }}>
              ${`${typesValues.Sizing}.00`}
            </span>
          </td>
        </tr>
        <tr id="total" className="tableRow nonHeader">
          <td>Interior:</td>
          <td>
            <span style={{ fontWeight: "bold" }}>
              ${`${typesValues.Interior}.00`}
            </span>
          </td>
        </tr>
        <tr id="total" className="tableRow nonHeader">
          <td>Siding:</td>
          <td>
            <span style={{ fontWeight: "bold" }}>
              ${`${typesValues.Siding}.00`}
            </span>
          </td>
        </tr>
        <tr id="total" className="tableRow nonHeader">
          <td>Exterior:</td>
          <td>
            <div className="estimateRow">
              <span style={{ fontWeight: "bold", marginRight: "20px" }}>
                Front:{" "}
              </span>
              <p>{exteriorOptions.F}</p>
              <img className="estimateImage" src={frontImage} />
            </div>
            <div className="estimateRow">
              <span style={{ fontWeight: "bold", marginRight: "20px" }}>
                Back:{" "}
              </span>
              <p>{exteriorOptions.B}</p>
              <img className="estimateImage" src={backImage} />
            </div>
            <div className="estimateRow">
              <span style={{ fontWeight: "bold", marginRight: "20px" }}>
                Left:{" "}
              </span>
              <p>{exteriorOptions.L}</p>
              <img className="estimateImage" src={leftImage} />
            </div>
            <div className="estimateRow">
              <span style={{ fontWeight: "bold", marginRight: "20px" }}>
                Right:{" "}
              </span>
              <p>{exteriorOptions.R}</p>
              <img className="estimateImage" src={rightImage} />
            </div>
          </td>
        </tr>
        <tr id="total" className="tableRow nonHeader">
          <td>Color:</td>
          <td
            style={{
              height: "50px",
              width: "50px",
              backgroundColor: selectedColorHexCode,
            }}
          ></td>
        </tr>
        <tr id="total" className="tableRow nonHeader">
          <td>Your Estimate is:</td>
          <td>
            <span style={{ fontWeight: "bold" }}>
              ${`${estimateValue.toString()}.00`}
            </span>
          </td>
        </tr>
      </tbody>
      {isMobile && (
        <Container key="4" classes="buttonContainer">
          <Button
            href="tel:+6788418240"
            buttonText="Call To Order"
            classes={"Button"}
          />
        </Container>
      )}
    </table>
  );
};

export default Estimate;
