import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { AppRoute } from "./App/AppRoute";
import { store } from "./rdx/store";

ReactDOM.render(
  <Provider store={store}>
    <AppRoute />
  </Provider>,
  document.getElementById("container")
);
