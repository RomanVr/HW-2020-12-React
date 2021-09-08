import React from "react";
import { Field } from "..";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// describe("Field render", () => {
//   it("Render Field without props", () => {
//     const component = shallow(<Field />);
//     expect(component).toMatchSnapshot();
//   });

//   describe("Render 3x3 Field contain Cell-component is matrix", () => {
//     const size = 3;
//     const component = shallow(<Field start={size}></Field>);
//     const wrapperCellAll = component.find("Cell");

//     it("Render Field contain Cell-component should be 9", () => {
//       expect(wrapperCellAll.length).toBe(size * size);
//     });

//     it("Render Field contain last Cell-component should be key is 8", () => {
//       const wrapperCellLast = wrapperCellAll.last();
//       expect(wrapperCellLast.prop("dataKey")).toBe(size * size - 1);
//     });
//   });
// });
describe("Field render", () => {
  it("Render Field without props", () => {
    render(<Field />);
    expect(screen.queryAllByTestId("items-field-item").length).toBe(100);
  });
  it("Click to Cell", () => {
    render(<Field start={3} />);
    expect(screen.queryAllByTestId("items-field-item").length).toBe(9);

    const elemCell: HTMLElement = screen.getAllByTestId("items-field-item")[0];
    userEvent.click(elemCell);
  });
});
