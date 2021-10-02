import React, { useState } from "react";
import { withOnChangeValue } from "../HOC/withOnChangeValue";

const InputWithOnChangeValue = withOnChangeValue("input");

export default function App() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  return (
    <div className="App">
      <fieldset>
        <input onChange={(ev) => setValue1(ev.target.value)} />
        <br />
        {value1}
      </fieldset>
      <fieldset>
        <InputWithOnChangeValue onChangeValue={setValue2} />
        <br />
        {value2}
      </fieldset>
    </div>
  );
}
