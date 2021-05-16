import { shallow } from "enzyme";
import React from "react";
import { Cell } from "..";

describe("Cell render check", () => {
  const handleClickMock = jest.fn();
  const component = shallow(
    <Cell dataKey={1} handleClick={handleClickMock}></Cell>
  );

  it("Default render with prop 'data-key'", () => {
    expect(component.prop("data-key")).toEqual(1);
  });

  it("Click simulation", () => {
    component.find("div").simulate("click");
    expect(handleClickMock.mock.calls.length).toBe(1);
  });
});
