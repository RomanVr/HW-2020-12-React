import React from "react";
import { shallow } from "enzyme";
import { Field } from "..";

describe("Field render", () => {
  it("Render Field without props", () => {
    const component = shallow(<Field />);
    expect(component).toMatchSnapshot();
  });

  describe("Render 3x3 Field contain Cell-component is matrix", () => {
    const size = 3;
    const component = shallow(<Field start={size}></Field>);
    const wrapperCellAll = component.find("Cell");

    it("Render Field contain Cell-component should be 9", () => {
      expect(wrapperCellAll.length).toBe(size * size);
    });

    it("Render Field contain last Cell-component should be key is 8", () => {
      const wrapperCellLast = wrapperCellAll.last();
      expect(wrapperCellLast.prop("dataKey")).toBe(size * size - 1);
    });
  });
});
