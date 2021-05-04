import { shallow } from "enzyme";
import React from "react";
import { Cell } from "..";

const handleClickMock = jest.fn();
const wrapper = shallow(
  <Cell dataKey={1} handleClick={handleClickMock}></Cell>
);

describe("Cell render check", () => {
  it("Default render with prop 'data-key'", () => {
    expect(wrapper.prop("data-key")).toEqual(1);
  });

  it("Click simulation", () => {
    wrapper.find("div").simulate("click");
    expect(handleClickMock.mock.calls.length).toBe(1);
  });
});
