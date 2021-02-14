import React from "react";
import { render } from "react-dom";

import { ClickCounter } from "./components/ClickCounter";

console.log('Hello World!!!');

render(<ClickCounter start={ 1 }/>, document.getElementById("container"));
