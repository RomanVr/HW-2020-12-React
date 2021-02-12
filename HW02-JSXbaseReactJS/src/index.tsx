import React from "react";
import ReactDOM from "react-dom";

import { App } from "./components/App";

export const sum = (a: number, b: number): number => a + b;

console.log('Hello World');

ReactDOM.render(<App />, document.getElementById("container"));
