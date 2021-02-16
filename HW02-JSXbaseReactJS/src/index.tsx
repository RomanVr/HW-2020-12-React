import React from "react";
import { render } from "react-dom";

import { Board } from "./components/board/board";

console.log("Hello World!!!");

render(<Board start={100} />, document.getElementById("container"));
