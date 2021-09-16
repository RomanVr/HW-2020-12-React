import React from "react";
import { Field } from "..";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Test Field", () => {
  const itemCellCount = 9;
  beforeEach(() => {
    const fieldTest = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const handleClickOnCell = jest.fn();
    render(
      <Field fieldData={fieldTest} handleClickOnCell={handleClickOnCell} />
    );
  });

  it("Render Field", () => {
    expect(screen.queryAllByTestId("items-field-item").length).toBe(
      itemCellCount
    );
  });
  it("Click to Cell", () => {
    const elemCell: HTMLElement = screen.getAllByTestId("items-field-item")[0];
    userEvent.click(elemCell);
    expect(screen.queryAllByTestId("items-field-item").length).toBe(9);
  });
});
