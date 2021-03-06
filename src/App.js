import React, { Component } from "react";
import "./App.css";
import Container from "./components/Container/Container";
import Title from "./components/Title/Title";
import Display from "./components/Display/Display";
import Button from "./components/Button/Button";
import Dropdown from "./components/Dropdown/Dropdown";
import NavBar from "./components/NavBar/NavBar";
import {
  selectedConfigs,
  getColorByHexCode,
  getShedSizeByName,
  windowsPricing,
} from "./utils/_DATA";

const LARGE_WINDOW = "44w";
const SMALL_WINDOW = "22w";

class App extends Component {
  state = {
    inputTypes: ["Sizing", "Interior", "Exterior", "Siding", "Colors"],
    totalSquareFootage: 0,
    types: {
      Sizing: 0,
      Interior: 0,
      Exterior: 0,
      Siding: 0,
      Colors: 0,
    },
    estimate: 0,
    sizing: "ten",
    configuration: false,
    selectedConfigs: selectedConfigs.tenSelectedConfigs,
    selectedColorHexCode: "#c8e4c5",
  };

  setSelectedColor = (color) => {
    const stateObj = this.state;
    stateObj.selectedColorHexCode = color;
    this.setState({
      stateObj,
    });
  };

  setEstimate = () => {
    const types = this.state.types;
    let estimate = 0;
    for (let type in types) {
      estimate += types[type];
    }
    this.setState({
      estimate,
    });
  };

  async componentDidMount() {
    const stateObj = this.state;
    stateObj.types.Sizing = 6799;
    this.setState(
      {
        ...stateObj,
      },
      () => this.setEstimate()
    );
  }

  updateSizing = (sizing, value) => {
    console.log("selectedConfigs", this.state.selectedConfigs);
    // console.log("sizing", sizing);
    // console.log("value", value);
    if (this.state.sizing === sizing) {
      return;
    } else {
      const prevState = this.state;
      prevState.types.Sizing = value;
      prevState.sizing = sizing;
      if (sizing === "eight") {
        prevState.selectedConfigs = selectedConfigs.eightSelectedConfigs;
      } else if (sizing === "ten") {
        prevState.selectedConfigs = selectedConfigs.tenSelectedConfigs;
      } else {
        prevState.selectedConfigs = selectedConfigs.twelveSelectedConfigs;
      }
      this.setState({ ...prevState }, () => this.setEstimate());
    }
  };

  updateConfiguration = (label) => {
    console.log("label", label);
    let windowsPricing = 0;
    if (this.state.configuration === label) {
      return;
    } else {
      const sideLetter = label.slice(0, 1);
      const prevState = this.state;
      prevState.selectedConfigs[sideLetter] = label;
      prevState.configuration = label;
      this.setState({ ...prevState });
    }
  };

  getWindowPricingForSideConfig(label) {
    let price = 0;
    if (label.includes(SMALL_WINDOW)) {
      let continueLoop = true;
      let remainingLabel = label;
      while (continueLoop) {
        if (
          !remainingLabel.includes(SMALL_WINDOW) &&
          !remainingLabel.includes("w")
        ) {
          continueLoop = false;
          continue;
        } else {
          if (remainingLabel.includes(SMALL_WINDOW)) {
            price += 50;
            remainingLabel.replace(SMALL_WINDOW, "");
          }
          if (remainingLabel.includes("w")) {
            price += 50;
            remainingLabel.replace("w", "");
          }
        }
      }
    } else if (label.includes(LARGE_WINDOW)) {
      let continueLoop = true;
      let remainingLabel = label;
      while (continueLoop) {
        if (
          !remainingLabel.includes(LARGE_WINDOW) &&
          !remainingLabel.includes("w")
        ) {
          continueLoop = false;
          continue;
        } else {
          if (remainingLabel.includes(LARGE_WINDOW)) {
            price += 100;
            remainingLabel.replace(LARGE_WINDOW, "");
          }
          if (remainingLabel.includes("w")) {
            price += 100;
            remainingLabel.replace("w", "");
          }
        }
      }
    }
    return 0;
  }

  setPricing = (type, price) => {
    const stateObj = this.state;
    stateObj.types[type] = price;
    this.setState({
      ...stateObj,
    });
    this.setEstimate();
  };

  setInteriorPricing = (price) => {
    if (this.state.types.Interior === 0) {
      this.setPricing("Interior", price);
    } else {
      this.setPricing("Interior", 0);
    }
  };

  setSquareFootageEvent = (price) => {
    console.log("price in setsqfootageevent", price);
    const stateObj = this.state;
    stateObj.types["Sizing"] = price;
    // stateObj[totalSquareFootage] = totalSquareFootage;
    this.setState(
      {
        ...stateObj,
      },
      () => console.log("this.state", this.state)
    );
    this.setEstimate();
  };

  checkoutOnClick = () => {
    console.log("Checkout");
    const color = getColorByHexCode(this.state.selectedColorHexCode)
      ? getColorByHexCode(this.state.selectedColorHexCode)
      : "Green";
    const size = getShedSizeByName(this.state.sizing);
    const interiorOptions =
      this.state.types.Interior > 0 ? "Lifestyle" : "None";
    const selectedSiding =
      this.state.types.Siding > 0 ? "Lapsiding" : "Default";
    const carturl =
      "https://www.mod-shed.com/cart/?add-to-cart=465&total_price=" +
      this.state.estimate +
      "&shed_color=" +
      color +
      "&shed_size=" +
      size +
      "&interior_options=" +
      interiorOptions +
      "&front_config=" +
      this.state.selectedConfigs.F +
      "&back_config=" +
      this.state.selectedConfigs.B +
      "&left_config=" +
      this.state.selectedConfigs.L +
      "&right_config=" +
      this.state.selectedConfigs.R +
      "&siding_option=" +
      selectedSiding;
    window.open(carturl);
  };

  render() {
    const {
      inputTypes,
      sizing,
      selectedConfigs,
      selectedColorHexCode,
    } = this.state;
    return (
      <div className="App">
        <NavBar />
        <Container key="1" classes="AppContainer">
          <Container key="2" classes="LeftContainer">
            <Title titleText="ModShed Series Configurator" />
            <Display
              sizing={this.state.sizing}
              configuration={this.state.configuration}
              color={this.state.selectedColorHexCode}
            />
          </Container>
          <Container key="3" classes="RightContainer">
            <Container key="4" classes="buttonContainer">
              <Button
                href="tel:+6788418240"
                buttonText="Call To Order"
                classes={"Button"}
              />
              <Button
                classes={"Button"}
                buttonText="Add To Cart"
                onClick={() => this.checkoutOnClick()}
              />
            </Container>
            <Container key="5" classes="DropdownContainer">
              {inputTypes.map((input) => {
                return (
                  <Dropdown
                    setPriceEvent={this.setPricing}
                    setSquareFootageEvent={this.setSquareFootageEvent}
                    innerText={`Choose Your ${input}`}
                    type={input}
                    key={input}
                    interiorClickEvent={this.setInteriorPricing}
                    updateSizing={this.updateSizing}
                    updateConfiguration={this.updateConfiguration}
                    size={sizing}
                    setSelectedColor={this.setSelectedColor}
                  />
                );
              })}
              <Dropdown
                key="Estimate"
                estimateValue={this.state.estimate}
                clickEvent={this.dropdownClickHandler}
                innerText="Your Estimate"
                type="Estimate"
                size={sizing}
                typesValues={this.state.types}
                exteriorOptions={selectedConfigs}
                selectedColorHexCode={selectedColorHexCode}
              />
            </Container>
          </Container>
        </Container>
      </div>
    );
  }
}

export default App;
