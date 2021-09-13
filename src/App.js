import React from "react";
import "./App.scss";
import Products from "./components/products/products";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Products p="seloco" />
      </div>
    );
  }
}
