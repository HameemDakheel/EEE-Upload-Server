import React from "react";
import ReactDOM from "react-dom";
import App  from "./App"
import { positions, transitions, Provider } from "react-alert";
import AlertTemplate from "./components/alertTemplate";

const options = {
  timeout: 5000,
  position: positions.TOP_CENTER,
  transition: transitions.FADE,
  containerStyle: {
    zIndex: 1070,
  },
};

ReactDOM.render(
  <Provider template={AlertTemplate} {...options}>
    <App />
  </Provider>,
  document.getElementById("root")
);
