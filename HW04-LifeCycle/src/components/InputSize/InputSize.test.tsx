import React from "react";
import renderer from "react-test-renderer";
import { InputSize } from "./InputSize";

describe("InputSize", () => {
  it("Render input for epmty value", () => {
    expect(
      renderer
        .create(<InputSize size="" handleChangeSize={jest.fn()} />)
        .toJSON()
    ).toMatchSnapshot();
  });
});
