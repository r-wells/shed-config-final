import React, { Component } from "react";
import "./App.css";
import Container from "./components/Container/Container";
import Title from "./components/Title/Title";
import Display from "./components/Display/Display";
import Button from "./components/Button/Button";
import Dropdown from "./components/Dropdown/Dropdown";

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
    selectedConfigs: {
      front: null,
      back: null,
      left: null,
      right: null,
    },
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

  //Set initial sizing to 8x8
  componentDidMount() {
    const stateObj = this.state;
    stateObj.types.Sizing = 400;
    this.setState(
      {
        ...stateObj,
      },
      () => this.setEstimate()
    );
  }

  updateSizing = (sizing, value) => {
    if (this.state.sizing === sizing) {
      return;
    } else {
      const prevState = this.state;
      prevState.types.Sizing = value;
      prevState.sizing = sizing;
      this.setState({ ...prevState }, () => this.setEstimate());
    }
  };

  updateConfiguration = (label) => {
    console.log("label", label);
    if (this.state.configuration === label) {
      return;
    } else {
      const prevState = this.state;
      this.setState({ configuration: label }, () =>
        console.log("configuration", this.state.configuration)
      );
    }
  };

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

  setSquareFootageEvent = (totalSquareFootage, ppsf) => {
    const stateObj = this.state;
    stateObj.types["Sizing"] = totalSquareFootage * ppsf;
    stateObj[totalSquareFootage] = totalSquareFootage;
    this.setState({
      stateObj,
    });
    this.setEstimate();
  };

  checkoutOnClick = () => {
    console.log("Checkout");
  };

  render() {
    const { inputTypes, sizing } = this.state;
    return (
      <div className="App">
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
                onClick={this.checkoutOnClick}
                buttonText="Checkout"
                classes={"Button"}
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
                typesValues={this.state.types}
              />
            </Container>
          </Container>
        </Container>
      </div>
    );
  }
}

export default App;
