import { shallow } from "enzyme";
import React from "react";
import { Cell } from "..";

const hanleClickMock = jest.fn();
const wrapper = shallow(<Cell dataKey={1} handleClick={hanleClickMock}></Cell>);

describe("Cell render check", () => {
  it("Default render with prop 'data-key'", () => {
    expect(wrapper.prop("data-key")).toEqual(1);
  });

  it("Click simulation", () => {
    wrapper.find("div").simulate("click");
    expect(hanleClickMock.mock.calls.length).toBe(1);
  });
});
