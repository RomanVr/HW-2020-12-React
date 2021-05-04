import React from "react";
import { shallow } from "enzyme";
import { Field } from "..";

const size = 3;
const wrapper = shallow(<Field start={size}></Field>);

describe("Field render size = 3", () => {
  it("Render 3x3 field", () => {
    expect(wrapper.find("div").children("div").length).toBe(size);
  });
});
