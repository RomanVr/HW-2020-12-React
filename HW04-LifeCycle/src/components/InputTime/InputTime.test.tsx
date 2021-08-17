import React from "react";
import renderer from "react-test-renderer";
import { InputTime } from "./InputTime";

describe("InputTime", () => {
  it("Render input for with value Time", () => {
    expect(
      renderer.create(<InputTime timeValue="Time" />).toJSON()
    ).toMatchSnapshot();
  });
});
