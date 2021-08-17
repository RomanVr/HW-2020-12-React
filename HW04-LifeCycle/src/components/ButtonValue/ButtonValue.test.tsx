import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { ButtonValue } from "./ButtonValue";

describe("ButtonValue", () => {
  it("Render button for empty value", () => {
    expect(
      renderer.create(<ButtonValue value="" handleClick={jest.fn()} />).toJSON()
    ).toMatchSnapshot();
  });

  it("Render button for filled with 'Show time'", () => {
    expect(
      renderer
        .create(<ButtonValue value="Show time" handleClick={jest.fn()} />)
        .toJSON()
    ).toMatchSnapshot();
  });

  it("calls handleClick callback on click by empty button", () => {
    const handleClick = jest.fn();
    const wrapper = mount(<ButtonValue value="" handleClick={handleClick} />);
    wrapper.simulate("click");
    expect(handleClick).toHaveBeenCalled();
  });
});
