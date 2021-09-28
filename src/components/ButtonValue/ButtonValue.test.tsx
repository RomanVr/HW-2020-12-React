import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import { ButtonValue } from "./ButtonValue";

describe("ButtonValue", () => {
  it("Render button", () => {
    const onClick = jest.fn();
    render(<ButtonValue value="Show" handleClick={onClick} />);

    const button = screen.getByTestId("buttonValue");

    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onClick).toBeCalled();
  });
});
